// Start Express
const express=require('express');
const app = express();

// MongoDB
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(process.env.DATABASE_URL, { useNewUrlParser: true });

// Load Dependencies
require('dotenv').config();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session')

// Middle Ware Applied
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(session({
    secret:'wisdom',
    resave:false,
    saveUninitialized:false
}));

// Controllers


// Listen Servers --
app.listen(process.env.PORT,(req,res)=>{
    console.log(`Goliath Online - listening on port ${process.env.PORT}`)
})

client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
