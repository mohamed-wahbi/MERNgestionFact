const mongoose = require('mongoose');
const factureSchema = new mongoose.Schema({
    fournisseur:String,
    client:String,
    tot_price:Number,
    payed_price:Number,
    not_payed_price:Number,
    isPayed:Boolean,
    createdAt: { type: Date, default: Date.now }
})



const Facture = mongoose.model('Facture',factureSchema);

module.exports = Facture;