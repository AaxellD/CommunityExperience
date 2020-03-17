const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');

const Users = require('../models/users');
const Exp = require('../models/experience')
// ----------------------------------------
// SEED
router.get('/seed', (req, res) => {
    Exp.create(
        [
            {
                title: 'Bowling and Dancing',
                location: ['Bowl Stars'],
                people: ['JC', 'Tim', 'Paul', 'Kat'],
                important: ['Bowling'],
                story: 'We did someting Exciting!'
            },
            {
                title: 'Tennis Courts in Rome were Great!',
                location: ['City Park Courts'],
                people: ['Randy', 'Al', 'Jack', 'Kat'],
                important: ['Tennis',"walking","dogs"],
                story: 'We played tennis at the park and walked along the lake that was there. It was a really fun time. There was some great bistros in this area to eat at also!!'
            },
            {
                title: 'Running by the River',
                location: ['Levy'],
                people: ['JC', 'Tim'],
                important: ['Running'],
                story: 'We loved the walking trail that goes along the city past the Levy. It follows the river and has some great scenes.'
            },
            {
                title: 'Dance Party!!!',
                location: ['MoonShinerz'],
                people: ['Justin', 'Mika', 'Mercedes', 'Kate'],
                important: ['dancing','Drinking','Singing'],
                story: 'We did someting Exciting! Yay for us.... '
            },
            {
                title: 'Wisdom in the Towers',
                location: ['Clock Tower'],
                people: ['none'],
                important: ['Philosophy'],
                story: 'This was the place where you can see over the entire city and grasp just a glimpse of the true meaning of life.'
            }
        ], (err, data) => {
            res.redirect('/session')
        }
    )
})

// Delete All
router.get('/deleteAll', (req, res) => {
    Exp.remove({}, (err, data) => {
        console.log('collection deleted');
        res.redirect('/session');
    })
})

// // ====== Routes======== // //

//  Home
router.get('/', (req, res) => {
    Exp.find({}, (err, allExp) => {
        res.render(
            'session/index.ejs',
            {
                exp: allExp
            }
        )
    })
})

// Login Page
router.get('/new', (req, res) => {
    res.render('session/new.ejs')
});

// login redirect to session home page
router.post('/', (req, res) => {
    Users.findOne({ username: req.body.username }, (err, data) => {
        if (data == null) {
            res.send('Username Error');
        } else {
            const pwMatch = bcrypt.compareSync(req.body.password, data.password);
            if (pwMatch) {
                res.redirect('/session')
            }
        }
    })
})

//  Go to New Entry
router.get('/add', (req, res) => {
    res.render('session/add.ejs')
})

//  Post New Entry and redirect to home page
router.post('/add', (req, res) => {
    req.body.location = req.body.location.split(',')
    req.body.people = req.body.people.split(',')
    req.body.important = req.body.important.split(',')

    Exp.create(req.body, (err, data) => {
        res.redirect('/session');
    })
})



// search -------------------!!!!!!!!!!!!!!!!!!!!
router.get('/showDb', (req, res) => {
    Exp.find({}, (err, data) => {
        res.send(data)
    })
})

// Edit Story
router.get('/:id/edit', (req, res) => {
    Exp.findOneAndUpdate({ _id: req.params.id }, req.body, (err, data) => {
        res.render('session/edit.ejs', {
            exp: data
        })
    })
})

// Show Router
router.get('/:id', (req, res) => {
    Exp.findOne({ _id: req.params.id }, (err, data) => {
        res.render(
            'session/show.ejs',
            {
                exp: data
            }
        )
        // res.send(data)
    })
})

// Export to Server
module.exports = router;
