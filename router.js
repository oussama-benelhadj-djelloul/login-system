var express = require('express');
var router = express.Router();

//var from database
const users = {
    email: 'oussama@gmail.com',
    password: 'ad123'
};
var logout = 'you are out';

//create a route
router.post('/login', function (req, res) {
    console.log(req.session.user)
    if (req.body.email == users.email && req.body.password == users.password) {
        req.session.user = req.body.email;
        console.log('success');
        res.redirect('/route/dashboard');
        //res.render('dashboard', { title: 'your dashboard', email: req.body.email });
        //res.end('LOGIC DONE!!')
    } else {
        console.log('Wrong Passowrd');
        res.end('invalid');
    }
});

router.get('/dashboard', function (req, res) {
    if (req.session.user) {
        res.render('dashboard', { title: 'your dashboard', email: req.session.user });
    } else {
        res.end('invalide')
    }
})

router.get('/logout', function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            res.send('error');
        } else {
            res.render('index', { title: 'your dashboard', logout: 'Thank You for your time'})
        }
    });
})

module.exports = router;