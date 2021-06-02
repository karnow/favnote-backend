const express = require('express');
const app = express();
const session = require('express-session');
const { port } = require('./config');
const apiRouter = require('./routes/api');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./db/models/User');

//db wczytanie ppliku i utworzenie polaczenia z baza
require('./db/mongoose');

//parsery
//Content-type: aplication/json
app.use(bodyParser.json());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// app.use(
//   session({
//     secret: 'roman',
//     resave: false,
//     saveUninitialized: true,
//   })
// );
// app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
// app.use(passport.session());

//fix cors
app.use(cors());

//routes
app.use('/api/', apiRouter);

//serwer
app.listen(port, function () {
  console.log('serwer słucha... http://localhost:' + port);
});
