const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');

const Users = require('../models/users');
const Exp = require('../models/experience')

// Routes
//home
router.get('/',(req,res)=>{
    Exp.find({},(err,data)=>{
        res.render(
            'session/index.ejs',
            {
                experience:Exp
            }
        )
    })
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

router.get('/add',(req,res)=>{
    res.render('session/add.ejs')
})

router.post('/add',(req,res)=>{
    Exp.create(req.body,(err, data)=>{
        res.redirect('/')
    })
})
module.exports = router;