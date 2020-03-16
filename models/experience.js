// Dependencies
const mongoose = require('mongoose');

// Model
const ExpSchema = mongoose.Schema ({
    title:String,
    location:[String],
    people:[String],
    important:[String]
})

const Experience = mongoose.model('Experience',ExpSchema);
module.exports= Experience;
