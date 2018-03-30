const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    birthday: Date,
    address: String,
    address2: String,
    country: String,
    city: String,
    postalCode: String
});

module.exports = mongoose.model('User', userSchema);
