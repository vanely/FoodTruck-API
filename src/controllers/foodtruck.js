import mongoose from 'mongoose';
import {Router} from 'express';
import FoodTruck from '../models/foodtruck';
import Review from '../models/review';
import bodyParser from 'body-parser';
import passport from 'passport'

export default({config, db}) => {
    let api = Router();

    // /v1/foodtruck/add CRUD: Create(POST)
    api.post('/add', (req, res) => {

         //destructored req.body properties
        const {name, foodtype, avgcost, geometry} = req.body;

        let newTruck = new FoodTruck();
        newTruck.name = name;
        newTruck.foodtype = foodtype;
        newTruck.avgcost = avgcost;
        newTruck.geometry.coordinates = geometry.coordinates;

        newTruck.save()
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

    // /v1/foodtruck/reviews/add/:id CRUD: Create(POST)
    api.post('/reviews/add/:id', (req, res) => {
        
        const {id} = req.params;
        const {title, text} = req.body;

        FoodTruck.findById(id)
        .then(truck => {
            
            let newReview = new Review();
    
            newReview.title = title;
            newReview.text = text;
            newReview.foodtruck = truck._id;
            
            //all changes to a record(instance of a schema) need to be explicitly saved
            newReview.save()
            .then((review) => {

                //the review property in FoodTruck schema is an array. We have to push the newly created review
                truck.reviews.push(newReview);

                //again saving the change explicitly
                truck.save()
                .then(() => res.json('Review success'))
                .catch(err => res.status(400).json(err));
            })
            .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json(err));

    });

    // /v1/foodtruck/reviews/:id CRUD: Read(GET)
    api.get('/reviews/:id', (req, res) => {

        const {id} = req.params;

        Review.find({foodtruck: id})
        .then(reviews => res.json(reviews))
        .catch(err => res.status(400).json(err))
    });

    return api;
}