// Config
require('dotenv').config();

// Start Express
const express=require('express');
const app = express();

// Load Dependencies
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session')

// Middle Ware Applied
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret:'wisdom',
    resave:false,
    saveUninitialized:false
}));

// CONTROLLERS
const userController = require('./controllers/users')
app.use()

// ROUTES
app.get('/',(req,res)=>{
    res.render('home.ejs')
})

// Listen Servers --
app.listen(process.env.PORT,(req,res)=>{
    console.log(`Goliath Online - listening on port ${process.env.PORT}`)
})


const db = mongoose.connection;
const dbupdateobject = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};
// Connect to Mongo
mongoose.connect(process.env.DATABASE_URL, dbupdateobject);
// Connection Error/Success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', process.env.DATABASE_URL));
db.on('disconnected', () => console.log('mongo disconnected'));
db.on('open', () => {
    console.log('Connection made!');
});
