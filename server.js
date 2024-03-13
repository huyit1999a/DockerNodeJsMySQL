const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 3000;

// Create a MySQL connection
const connection = mysql.createConnection({
  host: "db",
  user: "dbuser",
  password: "dbuser",
  database: "test",
});

function handleDisconnect() {
  // Connect to MySQL
  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      setTimeout(handleDisconnect, 5000);
      return;
    }
    console.log("Connected to MySQL");
  });

  connection.on('error', (err) => {
    console.error('Error connecting to MySQL: ', err);
    console.error('Error code: ', err.code);
    if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNREFUSED') {
      handleDisconnect();
    } else {
      throw err;
    }
  })
}

// Start the connection
handleDisconnect();

// Define a route to get a list of users
app.get("/", (req, res) => {
  // Perform a query to retrieve users
  connection.query("SELECT id, name FROM user", (error, results) => {
    if (error) {
      console.error("Error fetching users:", error);
      res.status(500).send("Error fetching users");
      return;
    }

    // Send the retrieved users as JSON
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
