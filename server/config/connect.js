const mongoose = require('mongoose');
require('dotenv').config();
const DBURL =process.env.DB_URL
mongoose.connect(DBURL)
.then(()=>console.log('Connect with DB is active *_*'))
.catch((err)=>console.log(err))

module.exports=mongoose;