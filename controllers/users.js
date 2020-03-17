// Dependencies
const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');

// database
const Users = require('../models/users');
//  -------------------------------------
// -------  Routes ----------------------

// New User
router.get('/new',(req,res)=>{
    res.render('users/new.ejs')
});

router.get('/deleteAll',(req,res)=>{
    Users.remove({},(err,data)=>{
        res.redirect('/')
    })
})
// Create User - Redirect to Home
router.post('/',(req,res)=>{
    req.body.password = bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10))

    Users.create(req.body,(err,data)=>{
        res.redirect('/');
    })
})

// Export
module.exports = router;