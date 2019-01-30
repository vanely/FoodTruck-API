import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { createServer } from 'tls';
import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;

import config from './config';
import routes from './routes';

const app = express();
app.server = http.createServer(app);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({
    limit: config.bodyLimit
}));

//passport config
app.use(passport.initialize());
let Account = require('./models/account');

//redefine what the following fields will be refered to as.
passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    Account.authenticate()
));

//serialize and deserialize user. 
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

//routes being called in as middleware with prefix route "/v1"
app.use('/v1', routes);

app.server.listen(config.port);
console.log(`Serving on Port: ${app.server.address().port}`);

export default app;