// Charger .env depuis la racine OU depuis backend/
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
if (!process.env.DB_HOST) require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host:             process.env.DB_HOST     || 'localhost',
  port:     parseInt(process.env.DB_PORT)   || 3306,
  user:             process.env.DB_USER     || 'root',
  password:         process.env.DB_PASSWORD || 'oumartom',
  database:         process.env.DB_NAME     || 'positive_distribution',
  waitForConnections: true,
  connectionLimit:  10,
  queueLimit:       0,
  timezone:         '+00:00',
  charset:          'utf8mb4'
});

pool.getConnection()
  .then(conn => {
    console.log(`✅ MySQL connecté — ${process.env.DB_NAME || 'positive_distribution'}`);
    conn.release();
  })
  .catch(err => {
    console.error('❌ Erreur MySQL :', err.message);
    process.exit(1);
  });

module.exports = pool;
