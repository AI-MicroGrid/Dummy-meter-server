const express = require('express');
const cors = require('cors');
const cron = require('node-cron');

const app = express();
const PORT = 3000;

app.use(cors());

// In-memory storage of customer readings
let meterReadings = {};

// Generate 100 customers with initial readings
for (let i = 1; i <= 100; i++) {
  meterReadings[i] = {
    userId: i,
    energyUsage: 0,  // in kWh
    lastUpdated: new Date().toISOString()
  };
}

// Update meter readings every minute
cron.schedule('* * * * *', () => {
  const now = new Date().toISOString();
  for (let id in meterReadings) {
    meterReadings[id].energyUsage += Math.random() * 0.5;  // simulate 0–0.5 kWh/min
    meterReadings[id].lastUpdated = now;
  }
  console.log(`Updated readings at ${now}`);
});

// Route to get all readings
app.get('/readings', (req, res) => {
  res.json(Object.values(meterReadings));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
