// set up ======================================================================
// get all the tools we need
var express = require('express')
var app = express()
var port = process.env.PORT || 5000
var mongoose = require('mongoose')
var passport = require('passport')
var flash = require('connect-flash')

var morgan = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var session = require('express-session')

var configDB = require('./config/database.js')

// test =============================================



// test =============================================

// configuration ===============================================================
mongoose.connect(configDB.url) // connect to our database

require('./config/passport')(passport) // pass passport for configuration

// set up express application
// app.use(morgan('dev')) // log every request to the console
app.use(cookieParser()) // read cookies (needed for auth)
app.use(bodyParser()) // get information from html forms

app.set('view engine', 'pug') // set up pug for templating

// required for passport
app.use(session({ secret: 'areyouhappynow'})) // session secret
app.use(passport.initialize())
app.use(passport.session()) // persistent login sessions
app.use(flash()) // use connect-flash for flash messages stored in session
app.use(express.static('public'))

// routes ======================================================================
require('./app/routes.js')(app, passport) // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port, () => console.log(`Listening on ${ port }`))