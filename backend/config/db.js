const mysql = require('mysql2/promise');

// Lire toutes les variables possibles
const host     = process.env.MYSQLHOST     || process.env.DB_HOST     || 'localhost';
const port     = parseInt(process.env.MYSQLPORT     || process.env.DB_PORT     || '3306');
const user     = process.env.MYSQLUSER     || process.env.DB_USER     || 'root';
const password = process.env.MYSQLPASSWORD || process.env.DB_PASSWORD || '';
const database = process.env.MYSQLDATABASE || process.env.DB_NAME     || 'railway';

// Log pour déboguer sur Railway
console.log('═══════════════════════════════════════');
console.log('DB CONFIG:');
console.log('  host    :', host);
console.log('  port    :', port);
console.log('  user    :', user);
console.log('  database:', database);
console.log('  password:', password ? '***défini***' : '⚠️ VIDE');
console.log('═══════════════════════════════════════');

const pool = mysql.createPool({
  host, port, user, password, database,
  waitForConnections: true,
  connectionLimit:    10,
  queueLimit:         0,
  connectTimeout:     30000,
  ssl: { rejectUnauthorized: false }
});

pool.getConnection()
  .then(conn => {
    console.log('✅ MySQL connecté —', database);
    conn.release();
  })
  .catch(err => {
    console.error('❌ Erreur MySQL complète :', err.message);
    console.error('   Code      :', err.code);
    console.error('   errno     :', err.errno);
    console.error('   sqlState  :', err.sqlState);
    process.exit(1);
  });

module.exports = pool;