require('dotenv').config();  // Charger les variables d'environnement

const mysql = require('mysql');

// Créer la connexion à la base de données en utilisant les variables d'environnement
const db = mysql.createConnection({
    host: process.env.DB_HOST,     // Utiliser la variable d'environnement
    user: process.env.DB_USER,     // Utiliser la variable d'environnement
    password: process.env.DB_PASSWORD,  // Utiliser la variable d'environnement
    database: process.env.DB_NAME  // Utiliser la variable d'environnement
});

// Connexion à la base de données
db.connect(err => {
    if (err) {
        console.error('Erreur de connexion à MySQL:', err);
    } else {
        console.log('✅ Connecté à la base de données MySQL');
    }
});

module.exports = db;
