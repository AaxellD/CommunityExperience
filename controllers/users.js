const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

// database
const Users = require('../models/users');
//  -------------------------------------
// -------  Routes ----------------------

router.get('/new',(req,res)=>{
    res.render('users/new.ejs')
});

router.post('/',(req,res)=>{
    req.body.password = bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10))

    Users.create(req.body,(err,data)=>{
        res.redirect('/');
    })
})

// Export
module.exports = router;