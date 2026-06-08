/**
 * Initialise la BD au premier démarrage :
 * 1. Crée les tables si elles n'existent pas
 * 2. Génère les mots de passe bcrypt
 * Appelé automatiquement par server.js au démarrage
 */
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
if (!process.env.DB_HOST) require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
if (!process.env.DB_HOST) require('dotenv').config();

const mysql  = require('mysql2/promise');
const bcrypt = require('bcrypt');
const fs     = require('fs');
const path   = require('path');

async function initDB() {
  let conn;
  try {
    conn = await mysql.createConnection({
      host:     process.env.DB_HOST     || 'localhost',
      port:     parseInt(process.env.DB_PORT) || 3306,
      user:     process.env.DB_USER     || 'root',
      password: process.env.DB_PASSWORD || 'oumartom',
      database: process.env.DB_NAME     || 'positive_distribution',
      multipleStatements: true
    });

    // Lire et exécuter le SQL d'initialisation
    const sqlPath = path.join(__dirname, '..', 'database_railway.sql');
    if (fs.existsSync(sqlPath)) {
      const sql = fs.readFileSync(sqlPath, 'utf8');
      // Exécuter statement par statement pour éviter les erreurs
      const statements = sql.split(';').map(s=>s.trim()).filter(s=>s.length>0 && !s.startsWith('--'));
      for (const stmt of statements) {
        try { await conn.query(stmt); } catch(e) { /* ignorer les erreurs de table existante */ }
      }
      console.log('✅ Tables vérifiées/créées');
    }

    // Générer les mots de passe si encore TEMP
    const users = [
      { email: 'oumar@positive.gn',     pwd: 'Positive2026!' },
      { email: 'abdoulaye@positive.gn', pwd: 'Positive2026!' },
      { email: 'brahim@positive.gn',    pwd: 'Positive2026!' },
      { email: 'zenab@positive.gn',     pwd: 'Positive2026!' },
      { email: 'bechir@positive.gn',    pwd: 'Positive2026!' },
      { email: 'moussa@positive.gn',    pwd: 'Positive2026!' },
    ];

    for (const u of users) {
      const [rows] = await conn.query('SELECT mot_de_passe FROM utilisateurs WHERE email=?', [u.email]);
      if (rows.length && (rows[0].mot_de_passe === 'TEMP_WILL_BE_HASHED' || rows[0].mot_de_passe.length < 30)) {
        const hash = await bcrypt.hash(u.pwd, 10);
        await conn.query('UPDATE utilisateurs SET mot_de_passe=? WHERE email=?', [hash, u.email]);
        console.log(`✅ Mot de passe généré : ${u.email}`);
      }
    }

    console.log('✅ Initialisation BD terminée');
  } catch(e) {
    console.error('⚠️  Init BD:', e.message);
  } finally {
    if (conn) await conn.end();
  }
}

module.exports = initDB;
