const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');

const Users = require('../models/users');

// Routes
//home
router.get('/',(req,res)=>{
    res.render('session/index.ejs')
})

// Login Page
router.get('/new',(req,res)=>{
    res.render('session/new.ejs')
});

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

module.exports = router;