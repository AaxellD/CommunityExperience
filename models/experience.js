// Dependencies
const mongoose = require('mongoose');

// Model
const ExpSchema = mongoose.Schema ({
    title:  String ,
    img:String,
    location: [String],
    people: [String],
    important: [String],
    story: String
})

const Experience = mongoose.model('Experience',ExpSchema);
module.exports= Experience;
