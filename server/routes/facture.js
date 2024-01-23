const express =require('express');
const Facture = require('../models/facture');

const route = express.Router();

route.post ('/addFact',async (req,res)=>{
    try {
        dataFact = req.body ;
        const newFact = new Facture(dataFact);
        const savedFact = await newFact.save();
        res.status(200).send(newFact);
    } catch (error) {
        res.status(404).send(error);
    }
})

route.get ('/getFact',async (req,res)=>{
    try {
        getedFact = await Facture.find({});
        res.status(200).send(getedFact);
    } catch (error) {
        res.status(404).send(error);
    }
})

route.put ('/updateFact/:id' , async (req,res)=>{
    try {
        id =req.params.id;
        const {fournisseur,client,tot_price,payed_price,not_payed_price,isPayed}=req.body;
        const updatedFact = await Facture.findByIdAndUpdate({_id:id},{fournisseur,client,tot_price,payed_price,not_payed_price,isPayed},{new:true,runValidators:true});
        res.status(200).send(updatedFact);
    } catch (error) {
        res.status(404).send(error);
    }
})

route.delete('/deleteFact/:id',async (req,res)=>{
    try {
        id =req.params.id;
        const deletedFact = await Facture.findByIdAndDelete({_id:id});
        res.status(200).send(deletedFact);
    } catch (error) {
        res.status(404).send(error);
    }
})


route.get('/totalPayedPrice', async (req, res) => {
    try {
      const result = await Facture.aggregate([
        {
          $group: {
            _id: null,
            totalPayedPrice: { $sum: '$payed_price' }
          }
        }
      ]);
  
      const totalPayedPrice = result.length > 0 ? result[0].totalPayedPrice : 0;
  
      res.json({ totalPayedPrice });
    } catch (error) {
      console.error('Error calculating total payed price:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  route.get('/totalNotPayedPrice' , async (req,res)=>{
    try {
        const result = await Facture.aggregate([
            {
                $group: {
                _id:null,
                totalNotPayedPrice : {$sum :'$not_payed_price'}
                    }
            }
        ]);
        const totalNotPayedPrice = result.length>0?result[0].totalNotPayedPrice : 0 ;
        res.json({totalNotPayedPrice})
    } catch (error) {
        res.status(500).send(error)
    }
  })

  route.get('/expense' , async (req,res)=>{
    try {
        const result = await Facture.aggregate([
            {
                $group: {
                _id:null,
                expense : {$sum :'$tot_price'}
                    }
            }
        ]);
        const expense = result.length>0?result[0].expense : 0 ;
        res.json({expense})
    } catch (error) {
        res.status(500).send(error)
    }
  })

  route.get('/expense', async (req,res)=>{
    try {
        const result = await Facture.aggregate([{
            $group:{
                _id:null,
                expenses:{$sum :'$tot_price'}
            }
        }])
        const expenses = result.length>0?result[0].tot_price:0;
        res.json({expenses});
    } catch (error) {
        res.status(500).send(error)
    }
  })

module.exports=route;