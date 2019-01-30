import mongoose, { Schema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const Account = new Schema({

    name: { type: String, required: true },
    email: { 
        type: String, required: true 
    },
    password: { 
        type: String, required: true 
    }
});

Account.plugin(passportLocalMongoose);
module.exports = mongoose.model('accounts', Account);