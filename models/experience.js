// Dependencies
const mongoose = require('mongoose');

// Model
const ExpSchema = new Schema ({
    title:String,
    location:[String],
    people:[String],
    important:[String]
})

const Experiences = mongoose.model('Experiences',ExpSchema);
module.exports= Experiences;
