const express = require ('express');
const route = express.Router();
const Fournisseur = require('../models/fournisseur');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = "wahbidevmern";
app.use(express.json());
app.use(cors());

route.post('/loginF', async (req, res) => {
    try {
        const { email, password } = req.body;
        const findF = await Fournisseur.findOne({ email: email });

        if (findF) { 
            const validPassword = await bcrypt.compare(password,findF.password);
            if(validPassword){
                const token = jwt.sign({ email: findF.email }, secretKey, { expiresIn: '1h' });
                res.status(200).json({ token: token, message: 'Login success.' });
            } else {
                res.status(401).json({ message: 'Invalid login .' });
            }
            }}
    catch (error) {
        res.status(404).send(error);
}
})


route.post ('/registerF',async (req,res)=>{
    try {
        const {name,email,password} = req.body;
        const hashedPassword = await bcrypt.hash(password , 10);
        findEmail = await Fournisseur.findOne({email:email});
        if(!findEmail){
            newF = new Fournisseur({name:name,email:email,password:hashedPassword});
            savedF =await newF.save();
            res.status(200).send(newF);
        }
        else{
            res.status(500)
        }
    } catch (error) {
        res.status(404).send(error);
    }
})

module.exports=route;
