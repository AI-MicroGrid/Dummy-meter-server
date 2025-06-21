const express = require('express');
const cors = require('cors');
const { createObjectCsvWriter } = require('csv-writer');
const path = require('path');
const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Array to store meter data (in-memory storage)
let meterData = [];

// CSV writer configuration
const csvWriter = createObjectCsvWriter({
  path: path.join(__dirname, 'meter_data.csv'),
  header: [
    { id: 'customerId', title: 'CUSTOMER_ID' },
    { id: 'timestamp', title: 'TIMESTAMP' },
    { id: 'energyUsage_kWh', title: 'ENERGY_USAGE_KWH' },
    { id: 'voltage', title: 'VOLTAGE_V' },
    { id: 'powerFactor', title: 'POWER_FACTOR' },
  ],
  append: true, // Append to file instead of overwriting
});

// Function to generate random number between min and max
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// Function to generate timestamp for a given time offset (in minutes)
function getTimestamp(offsetMinutes = 0) {
  const date = new Date();
  date.setMinutes(date.getMinutes() - offsetMinutes);
  return date.toISOString();
}

// Function to generate dummy meter data for 100 customers
function generateMeterData(offsetMinutes = 0) {
  const data = [];
  const timestamp = getTimestamp(offsetMinutes);

  for (let i = 1; i <= 100; i++) {
    const customerId = `CUST${String(i).padStart(3, '0')}`; // e.g., CUST001
    const energyUsage = getRandomNumber(0.1, 2.0).toFixed(4); // kWh between 0.1 and 2.0
    const voltage = getRandomNumber(230, 240).toFixed(1); // Voltage between 230 and 240V
    const powerFactor = getRandomNumber(0.5, 1.0).toFixed(2); // Power factor between 0.5 and 1.0

    data.push({
      customerId,
      timestamp,
      energyUsage_kWh: parseFloat(energyUsage),
      voltage: parseFloat(voltage),
      powerFactor: parseFloat(powerFactor),
    });
  }

  return data;
}

// Generate historical data for the past 24 hours (96 intervals of 15 minutes)
function generateHistoricalData() {
  for (let i = 0; i < 96; i++) {
    const offset = i * 15; // 15-minute intervals
    const historicalData = generateMeterData(offset);
    meterData.push(...historicalData);
    // Write historical data to CSV
    csvWriter.writeRecords(historicalData).catch(err => {
      console.error('Error writing historical data to CSV:', err);
    });
  }
  console.log(`Generated historical data for ${meterData.length} records`);
}

// Generate initial data (current and historical)
generateHistoricalData();
meterData.push(...generateMeterData()); // Current data
csvWriter.writeRecords(meterData.slice(-100)).catch(err => {
  console.error('Error writing initial data to CSV:', err);
});

// Update current data every minute
setInterval(() => {
  const newData = generateMeterData();
  meterData.push(...newData);
  // Keep only the last 24 hours (96 * 100 customers = 9600 records) to manage memory
  if (meterData.length > 9600) {
    meterData = meterData.slice(-9600);
  }
  // Write new data to CSV
  csvWriter.writeRecords(newData).catch(err => {
    console.error('Error writing to CSV:', err);
  });
  console.log(`Generated data at ${newData[0].timestamp} for ${newData.length} customers`);
}, 60000);

// API endpoint to get current meter data
app.get('/api/meter-data', (req, res) => {
  const latestData = meterData.slice(-100); // Last 100 records (current minute)
  res.json(latestData);
});

// API endpoint to get historical data for a specific customer
app.get('/api/meter-data/:customerId', (req, res) => {
  const customerId = req.params.customerId;
  const customerData = meterData.filter(data => data.customerId === customerId);
  res.json(customerData);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});