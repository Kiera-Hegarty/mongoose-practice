const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/mongoose-practice",{
    useNewUrlParser: true
});

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 2
    },

    description: {
        type: String,
        required: true,
        minlength: 2
    },

    ageRating: {
        type: String,
        requied: true,
        minlength: 1
    }
});

module.exports = mongoose.model("Movie", movieSchema);