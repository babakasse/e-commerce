// set up ======================================================================
var express = require('express');
var mongoose = require('mongoose');
var User = require('./app/models/users');
var port = process.env.PORT || 8080;
var database = require('./config/database');
var logger = require('morgan');
var cookieParser = require("cookie-parser");
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var flash = require('connect-flash');

// configuration ===============================================================
mongoose.connect(database.localUrl);

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cookieParser());
app.use(flash());

app.use(session({
    secret: 'baba_johan',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Nom invalide.' });
            }
            if (user.password !== password) {
                return done(null, false, { message: 'Mot de passe invalide.' });
            }
            console.log("connexion reussi");
            return done(null, user);
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

// set up view for admin
app.set("views", './app/views');
app.set("view engine", "hbs");

// routes ======================================================================
require('./routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
