const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');

const Users = require('../models/users');
const Exp = require('../models/experience')

// Routes
//  Home
router.get('/',(req,res)=>{
    Exp.find({},(err,allExp)=>{
        res.render(
            'session/index.ejs',
            {
                exp:allExp
            }
        )
    })
})

// Login Page
router.get('/new',(req,res)=>{
    res.render('session/new.ejs')
});
// login redirect to session home page
router.post('/',(req,res)=>{
    Users.findOne({username:req.body.username},(err,data)=>{
        if (data == null) {
            res.send('Username Error');
        } else {
            const pwMatch = bcrypt.compareSync(req.body.password,data.password);
            if(pwMatch){
                res.redirect('/session')
            }
        }
    })
})

//  Go to New Entry
router.get('/add',(req,res)=>{
    res.render('session/add.ejs')
})

//  Post New Entry and redirect to home page
router.post('/add',(req,res)=>{
    Exp.create(req.body,(err, data)=>{
        res.redirect('/session')
    })
})


module.exports = router;