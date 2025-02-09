const express = require('express');
const router = express.Router();
const db = require('../database');

// // 📌 Récupérer le solde
// router.get('/', (req, res) => {
//     db.query('SELECT * FROM solde LIMIT 1', (err, result) => {
//         if (err) throw err;
//         res.json(result[0]);
//     });
// });

// // 📌 Fonction pour mettre à jour le solde

// function updateSolde(callback) {
//     console.log("🔄 Mise à jour automatique du solde...");

//     const query = `
//         UPDATE solde 
//         SET depenseTotal = (SELECT COALESCE(SUM(montant), 0) FROM depense),
//             revenuTotal = (SELECT COALESCE(SUM(montant), 0) FROM revenu),
//             solde = (SELECT COALESCE(SUM(montant), 0) FROM revenu) - 
//                     (SELECT COALESCE(SUM(montant), 0) FROM depense)
//         WHERE idSolde = 1;
//     `;

//     db.query(query, (err, result) => {
//         if (err) {
//             console.error("❌ Erreur lors de la mise à jour du solde :", err);
//         } else {
//             console.log("✅ Solde mis à jour avec succès !");
//         }
//         if (callback) callback(); // Exécuter le callback si fourni
//     });
// }







// module.exports = { updateSolde }; // Exporter la fonction

// module.exports = { router, updateSolde };

// 📌 Récupérer le solde
router.get('/', (req, res) => {
    db.query('SELECT * FROM solde LIMIT 1', (err, result) => {
        if (err) throw err;
        res.json(result[0]);
    });
});

// 📌 Fonction pour mettre à jour le solde
function updateSolde(callback) {
    console.log("🔄 Mise à jour automatique du solde...");

    const query = `
        UPDATE solde 
        SET depenseTotal = (SELECT COALESCE(SUM(montant), 0) FROM depense),
            revenuTotal = (SELECT COALESCE(SUM(montant), 0) FROM revenu),
            solde = (SELECT COALESCE(SUM(montant), 0) FROM revenu) - 
                    (SELECT COALESCE(SUM(montant), 0) FROM depense)
        WHERE idSolde = 1;
    `;

    db.query(query, (err, result) => {
        if (err) {
            console.error("❌ Erreur lors de la mise à jour du solde :", err);
        } else {
            console.log("✅ Solde mis à jour avec succès !");
        }
        if (callback) callback(); // Exécuter le callback si fourni
    });
}

module.exports = { updateSolde }; // Exporter seulement la fonction updateSolde
module.exports = { router, updateSolde };