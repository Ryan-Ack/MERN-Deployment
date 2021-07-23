const mongoose = require("mongoose")

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        minLength: [3, "Movie Title must be at least 3 characters"]
    },
    rating: {
        type: Number,
        required: [true, "your Rating is required"],
        min: [1, "You can't rate less than 1 star"],
        max: [5, "You can't rate higher than 5 stars"]
    },
    username: {
        type: String,
        required: [true, "Who Are you?"],
        minLength: [10, "Username must be at least 10 characters"]
    }

}, { timestamps: true })

const Movie = mongoose.model("Movie", MovieSchema);
module.exports = Movie


