import mongoose, { Schema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const Account = new Schema({

    email: { type: String },
    password: { type: String }
});

Account.plugin(passportLocalMongoose);
module.exports = mongoose.model('accounts', Account);