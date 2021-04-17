//install express nodemon ejs express-session uuid body-parser
const express = require('express');
const app = express();
//path variable for making paths
const path = require('path');
//body-parser
const bodyparser = require('body-parser');
//the sessions var
const session = require('express-session');
//uuid for secret var of session
const { v4: uuidv4 } = require('uuid');
//export the router file
const router = require('./router')

app.set('view engine', 'ejs');

//use the BP
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));


//LOAD THE CSS FILES DEMAND A sTATIC lOAD
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/assests', express.static(path.join(__dirname, 'public/assests')))

//session variables
app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}))

app.use('/route', router);

app.get('/', function (req, res) {
    console.log('Server is working');
    res.render('index', { title: 'Login System', logout: router.logout });
})

app.listen('3000');