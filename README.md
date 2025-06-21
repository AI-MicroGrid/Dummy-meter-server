# dummy-meter-server

## Dummy Meter Data Server
This is a Node.js application that generates and serves dummy smart meter data for 100 customers, updated every minute. The data mimics real-world smart meter readings, including customer ID, timestamp, energy usage (kWh), voltage, and power factor. It also generates 24 hours of historical data (at 15-minute intervals) on startup and stores all data in a CSV file for persistence. The project includes a web interface to view current and historical data.
Features

Generates dummy meter data for 100 customers every minute.
Includes fields: customerId, timestamp, energyUsage_kWh, voltage, powerFactor.
Stores data in meter_data.csv for persistence.
Provides API endpoints:
GET /api/meter-data: Latest data for all customers.
GET /api/meter-data/:customerId: Historical data for a specific customer (e.g., /api/meter-data/CUST001).


Web interface (index.html) with a dropdown to view all customers or individual customer history.
Historical data for the past 24 hours (96 intervals of 15 minutes).

## Prerequisites

Node.js: Install the LTS version from nodejs.org.
VS Code: Recommended for editing and running the project.
Git: For version control and pushing to GitHub.

## Project Structure
dummy-meter-server/
├── server.js          # Node.js server generating and serving data
├── index.html        # Web interface to view data
├── meter_data.csv    # Generated data (created on first run)
├── package.json      # Project configuration
├── package-lock.json # Dependency versions
└── node_modules/     # Installed dependencies

## Setup Instructions

## Clone the Repository:
git clone https://github.com/your-username/dummy-meter-server.git
cd dummy-meter-server


## Install Dependencies:
npm install

This installs express, cors, and csv-writer.

Install HTTP Server (for serving index.html):
npm install -g http-server


## Run the Node.js Server:
node server.js


The server runs on http://localhost:3000.
It generates historical data (9600 records) and new data every minute.
Data is saved to meter_data.csv.


## Run the HTTP Server:

In a new terminal, navigate to the project folder and run:http-server .


Access the web interface at http://localhost:8080.
If port 8080 is in use, try:http-server -p 8081





## Viewing the Data

Web Interface: Open http://localhost:8080 (or http://localhost:8081) in a browser to view the data in a table. Use the dropdown to select a customer for historical data.
API Endpoints:
http://localhost:3000/api/meter-data: Latest data for all 100 customers.
http://localhost:3000/api/meter-data/CUST001: Historical data for customer CUST001.


CSV File: Check meter_data.csv in the project folder for all generated data.

## Troubleshooting

PowerShell Script Error:
If you see running scripts is disabled, open PowerShell as Administrator and run:Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned


Port Conflicts:
For Node.js server: Edit server.js to change const port = 3000 to const port = 3001.
For HTTP server: Use http-server -p 8081.


No Data in Browser:
Ensure node server.js is running.
Check browser Console (F12 > Console) for errors.
Verify API at http://localhost:3000/api/meter-data.


## Future Improvements

Add more fields (e.g., current in amps) to the data.
Replace CSV with a database like SQLite.
Add charts using Chart.js for data visualization.
Deploy to a platform like Render or Heroku.


![WhatsApp Image 2025-06-21 at 21 08 30_ff61aadb](https://github.com/user-attachments/assets/88ec17ff-c9e6-48df-8c60-8a1008d20a51)
![WhatsApp Image 2025-06-21 at 21 09 40_d2317353](https://github.com/user-attachments/assets/a2950ade-3bfa-45d1-9d36-65db274bd664)
![WhatsApp Image 2025-06-21 at 21 06 23_5926dfae](https://github.com/user-attachments/assets/4c00c960-1194-4d94-9a04-5684668ce4f2)






dummy-meter-server1 
# Dummy Meter Server

This is a simple Node.js + Express server that simulates energy meter readings for 100 customers. It updates data every minute and exposes an API endpoint to get all readings.

## Features

- Generates 100 dummy customers
- Updates energy usage every minute
- Simple REST API (`/readings`)

## How to Run

npm install
node index.js

![WhatsApp Image 2025-06-21 at 20 15 17_657b147f](https://github.com/user-attachments/assets/481171c5-e855-43b6-9ef0-34603ba87e22)
