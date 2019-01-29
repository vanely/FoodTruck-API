import mongoose from 'mongoose';
//import Revie Schema
import Review from './review';
const {Schema} = mongoose;

const FoodTruckSchema = new Schema({
    name: {
       type: String,
       required: true
    },
    foodtype: {
        type: String,
        required: true
    },
    avgcost: Number,
    geometry: {
        type: {
            type:String,
            default: 'point'
        },
        coordinates: [Number]
    },
    reviews: [{type: Schema.Types.ObjectId, ref: Review}]
});

module.exports = mongoose.model('FoodTruck', FoodTruckSchema);