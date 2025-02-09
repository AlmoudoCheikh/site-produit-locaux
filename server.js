require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./database');



// const cors = require('cors');
//const cors = require('cors');

// app.use(cors());

// 📌 Importer les routes
const depensesRoutes = require('./routes/depenses');
const revenusRoutes = require('./routes/revenus');
const soldeRoutes = require('./routes/solde').router;
const updateSolde = require('./routes/solde').updateSolde;

const app = express();
app.use(cors());
app.use(express.json()); // Middleware pour gérer les requêtes JSON



// 📌 Utilisation des routes
app.use('/depenses', depensesRoutes);
app.use('/revenus', revenusRoutes);
app.use('/solde', soldeRoutes);

// 📌 Mise à jour automatique du solde après modification des dépenses/revenus
app.post('/depenses', (req, res, next) => {
    next();
    updateSolde();
});
app.post('/revenus', (req, res, next) => {
    next();
    updateSolde();
});

app.put('/depense/:id', (req, res, next) => {
    next();
    updateSolde();
});


app.put('/revenus/:id', (req, res, next) => {
    next();
    updateSolde();
});




app.delete('/depenses/:id', (req, res, next) => {
    next();
    updateSolde();
});

app.delete('/revenus/:id', (req, res, next) => {
    next();
    updateSolde();
});

// 📌 Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur API démarré sur http://localhost:${PORT}`);
});
