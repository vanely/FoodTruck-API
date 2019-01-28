import mongoose from 'mongoose';
const {Schema} = mongoose;

const foodTruckSchema = new Schema({
    name: String
});

module.exports = mongoose.model('FoodTruck', foodTruckSchema);