import mongoose from 'mongoose';
import {Router} from 'express';
import FoodTruck from '../models/foodtruck';
import bodyParser from 'body-parser';

export default({config, db}) => {
    let api = Router();

    // /v1/foodtruck/add CRUD: Create(POST)
    api.post('/add', (req, res) => {

         //destructored req.body properties
        const {name} = req.body;

        let newRest = new FoodTruck();
        newRest.name = name;

        newRest.save()
        .then(() => res.json(`FoodTruck saved successfully`))
        .catch(err => res.status(400).json(err));

    });

    // /v1/foodtruck CRUD: Read(GET)
    api.get('/', (req, res) => {

        //resquesting entire collection of foodtrucks. There isn't a specific record property defined in find
        FoodTruck.find({})
        .then(foodtrucks => res.json(foodtrucks))
        .catch(err => res.status(400).json(err));
    });

    // /v1/foodtruck/:id CRUD: Read(GET)
    api.get('/:id', (req, res) => {
        
         //destructored req.body properties
        const {id} = req.params;

        FoodTruck.findById(id)
        .then(foodtruck => res.json(foodtruck))
        .catch(err => res.status(400).json(err));
    });

    // /v1/foodtruck/:id CRUD: Update(Put)
    api.put('/:id', (req, res) => {

        //destructored req.body properties
        const {id} = req.params;
        const {name} = req.body;

        FoodTruck.findById(id)
        .then(foodtruck => {
            //changing the foodtrucks name that comes back from server to what ever 
            //gets passed to req.body.name
            foodtruck.name = name;
            
            foodtruck.save()
            .then(() => res.json("FoodTruck name updated"))
            .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json(err));
    });

    // /v1/foodtruck/:id CRUD: Delete(DELETE)
    api.delete('/:id', (req, res) => {
        
        const {id} = req.params;

        FoodTruck.deleteOne({_id: id})
        .then(() => res.json("FoodTruck successfully removed!"))
        .catch(err => res.json(err));

    })

    return api;
}