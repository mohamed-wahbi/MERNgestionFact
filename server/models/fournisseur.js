const mongoose = require('mongoose');

const fournisseurSchema = new mongoose.Schema({
    name:{
        type:String,
        require : true
    },
    email:{
        type:String,
        require : true
    },
    password:{
        type:String,
        require : true
    }
})

const Fournisseur = mongoose.model('Fournisseur',fournisseurSchema);

module.exports = Fournisseur;