const express = require ('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT;
require('./config/connect');
app.use(express.json());
app.use(cors());
const routeFournisseur = require('./routes/fournisseur');
const routeFacture = require ('./routes/facture');


app.use('/fournisseur',routeFournisseur)
app.use('/facture',routeFacture);









app.listen(PORT,()=>console.log('Server is active *_*'));