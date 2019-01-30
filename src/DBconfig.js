import mongoose from 'mongoose';
import config from './config';

export default callback => {
    //creating variable that connects to database
    let db = mongoose.connect(config.mongoURI, {
        useNewUrlParser: true
    });

    // callback(db);
}