require('dotenv').config();
const app = require('./src/app');
const sequelize = require('./src/configs/db.config');
const mysql = require('mysql2/promise');

const PORT = process.env.PORT || 8085;

const ensureDatabase = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``);
  await connection.end();
};

const startServer = async () => {
  let retries = 10;

  while (retries) {
    try {
      console.log('Connecting to MariaDB...');

      await ensureDatabase();
      await sequelize.authenticate();
      console.log('Connected to MariaDB');

      await sequelize.sync({ alter: true });
      console.log('Cart DB synced');

      app.listen(PORT, '0.0.0.0', () => {
        console.log(`Cart Service running at port ${PORT}`);
      });

      break;
    } catch (err) {
      console.error('DB chưa sẵn sàng:', err.message);
      retries -= 1;

      if (retries === 0) {
        console.error('Hết retry, thoát...');
        process.exit(1);
      }

      await new Promise((res) => setTimeout(res, 3000));
    }
  }
};

startServer();
