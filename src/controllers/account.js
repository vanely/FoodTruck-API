import mongoose from 'mongoose';
import { Router } from 'express';
import Account from '../models/account';
import bodyParser from 'body-parser';
import passport from 'passport';
import config from '../config';

//import created middleware methods
import { generateAccessToken, respond, authenticate } from '../middleware/authMiddleware';
// import { SIGPIPE } from 'constants';

export default ({config, db}) => {
    let api = Router();

    // /v1/account/register CRUD: Create(POST)
    api.post('/register', (req, res) => {

        const {email, password} = req.body;

        Account.register(new Account({username: email}), password)
        .then(account => account)
        .catch(err => res.status(500).json(err));

        passport.authenticate('local',
            {
                session: false
            }
        )(req, res => {

            res.status(200).json('New account successfully created');
        });
    });

    // /v1/account/login CRUD: Create(POST)
    //if successful. Will generate access token, then respond and send token back
    api.post('/login', passport.authenticate('local', 
        {
            session: false,
            scope: []
        }),
        generateAccessToken, respond
    );

    // /v1/account/logout CRUD: Read(GET)
    api.get('/logout', authenticate, (req, res) => {

        res.logout();
        res.status(200).json('Successfully logged out.');
    });

    // /v1/account/me CRUD: Read(Get)
    //need users token to utilize this
    api.get('/me', authenticate, (req, res) => {
        
        res.status(200).json(req.user);
    });


    return api;
}