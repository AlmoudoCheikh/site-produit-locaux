const express = require('express');
const router = express.Router();
const db = require('../database');

// 📌 Récupérer toutes les dépenses
router.get('/', (req, res) => {
    db.query('SELECT * FROM depense', (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// 📌 Ajouter une dépense

const { updateSolde } = require('./solde'); // Importer updateSolde

router.post('/', (req, res) => {
    const { titre, montant } = req.body;

    if (!titre || !montant) {
        return res.status(400).json({ message: "❌ Le titre et le montant sont obligatoires." });
    }

    db.query('INSERT INTO depense (titre, montant) VALUES (?, ?)', [titre, montant], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        } 

        // Mise à jour du solde après ajout de la dépense
        updateSolde(() => {
            res.json({ message: '✅ Dépense ajoutée et solde mis à jour !' });
        });
    });
});




// router.put('/:idDepense', (req, res) => {
//     const depenseId = req.params.idDepense;
//     const { titre, montant } = req.body;

//     if (!titre || !montant) {
//         return res.status(400).json({ message: "❌ Le titre et le montant sont obligatoires." });
//     }

//     const query = 'UPDATE depense SET titre = ?, montant = ? WHERE idDepense = ?';
//     db.query(query, [titre, montant, depenseId], (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }

//         if (result.affectedRows === 0) {
//             return res.status(404).json({ message: "❌ Dépense non trouvée." });
//         }

//         res.json({ message: '✅ Dépense modifiée avec succès !' });
//     });
// });






router.put('/:idDepense', (req, res) => {
    const depenseId = req.params.idDepense;  // L'ID de la dépense à modifier
    const { titre, montant } = req.body;

    console.log("ID reçu pour modification :", depenseId);  // Log de l'ID reçu
    console.log("Données envoyées :", { titre, montant });  // Log des données envoyées

    // Vérification des données
    if (!titre || !montant) {
        return res.status(400).json({ message: "❌ Le titre et le montant sont obligatoires." });
    }

    // Logique de mise à jour de la dépense
    const query = 'UPDATE depense SET titre = ?, montant = ? WHERE idDepense = ?';
    db.query(query, [titre, montant, depenseId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        console.log("Resultat de la mise à jour : ", result);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "❌ Dépense non trouvée." });
        }

        updateSolde(() => {
            res.json({ message: '✅ Dépense modifiée et solde mis à jour !' });
        });
    });
});


// 
// // 📌 Modifier une dépense
// router.put('/:idDepense', (req, res) => {
//     const depenseId = req.params.idDepense;  // L'ID de la dépense à modifier
//     const { titre, montant } = req.body;

//     console.log("ID reçu pour modification :", depenseId);  // Log de l'ID reçu
//     console.log("Données envoyées :", { titre, montant });  // Log des données envoyées

//     // Vérification des données
//     if (!titre || !montant) {
//         return res.status(400).json({ message: "❌ Le titre et le montant sont obligatoires." });
//     }

//     // Logique de mise à jour de la dépense
//     const query = 'UPDATE depense SET titre = ?, montant = ? WHERE idDepense = ?';
//     db.query(query, [titre, montant, depenseId], (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }

//         if (result.affectedRows === 0) {
//             return res.status(404).json({ message: "❌ Dépense non trouvée." });
//         }

//         updateSolde(() => {
//             res.json({ message: '✅ Dépense modifiée et solde mis à jour !' });
//         });
//     });
// });

// 📌 Supprimer une dépense

router.delete('/:idDepense', (req, res) => {
    const depenseId = req.params.idDepense;

    // Récupérer le montant de la dépense à supprimer
    db.query('SELECT montant FROM depense WHERE idDepense = ?', [depenseId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "❌ Dépense non trouvée." });
        }

        const montantDepense = result[0].montant;

        // Supprimer la dépense de la base de données
        db.query('DELETE FROM depense WHERE idDepense = ?', [depenseId], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            // Mise à jour du solde après suppression de la dépense
            updateSolde(() => {
                res.json({ message: '✅ Dépense supprimée et solde mis à jour !' });
            });
        });
    });
});

module.exports = router;