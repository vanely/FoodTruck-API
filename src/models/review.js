import mongoose, {Schema} from 'mongoose';
//import FoodTruck schema
import FoodTruck from './foodtruck';

let reviewSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    text: String,
    foodtruck: {
        type: Schema.Types.ObjectId,
        ref: 'FoodTruck',
        required: true
    }

});

module.exports = mongoose.model('Review', reviewSchema);