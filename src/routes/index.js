import express from 'express';
import config from '../config';
//when used will create our database connection
import initializeDB from '../DBconfig';
import middleWare from '../middleWare';
import foodtruck from '../controllers/foodtruck';
// import app from '../index';

let router = express();

//connect to DB
initializeDB(db => {

    //internal middleware
    router.use(middleWare({config, db}));

    //API ROUTES (v1)
    //'/foodtruck' route after '/v1' orefix with reataurant controller
    router.use('/foodtruck', foodtruck({config, db}))
});

export default router;