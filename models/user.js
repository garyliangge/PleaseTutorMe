var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
    username: String,
    password: String,
    name: String,
    location: String,
    phone: String,
    requesting: String,
    subjects: Array(String),
    currentSearch: String,
    active: Boolean
});
