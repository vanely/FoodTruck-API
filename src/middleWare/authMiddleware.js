import config from '../config';
import jwt from 'jasonwebtoken';
import expressJwt from 'express-jwt';
// import { request } from 'https';

//Json Web Token setup
const TOKENTIME = 60*60*24*30 //30 Days (30*24*60*60*1000)
const SECRET = config.Secret;

//aauthenticate with unique secret
let authenticate = expressJwt({secret: SECRET});

//middleware to generate and sign token
let generateAccessToken = (req, res, next) => {
    
    req.token = req.token || {};
    req.token = jwt.sign(
        {
            id: req.user.id,
        },
        SECRET,
        {
            expiresIn: TOKENTIME
        }
    )
    next();
}

//response for current user and their json web token
let respond = (req, res) => {
    res.status(200).json(
        {
            user: req.user.username,
            token: request.token
        }
    )
}

//NOTE: in es6, when the property(key) has the same name as the value in an object, the valued is implied, and passed implicitly 
module.exports = {
    authenticate,
    generateAccessToken,
    respond
}