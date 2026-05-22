const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const port = process.env.PORT || 3000;

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

app.get("/", async (req, res) => {
  const connection = await mysql.createConnection(dbConfig);
  const [rows] = await connection.execute("SELECT NOW() AS now");
  await connection.end();

  res.json({
    message: "Node.js connected to MySQL successfully",
    databaseTime: rows[0].now,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
