const Movie = require("../models/movie.model")

module.exports = {

    //Create
    create: (req, res) => {
        Movie.create(req.body)
            .then(data => res.json(data))
            .catch(err => { res.status(400).json(err) })
    },

    // Read
    findAll: (req, res) => {
        Movie.find()
            .then(data => res.json(data))
            .catch(err => { res.status(400).json(err) })
    },
    findById: (req, res) => {
        Movie.findById(req.params.id) // object
            // Product.findOne({_id: req.params.id}) // arr
            .then(data => {
                console.log(data)
                res.json(data)
            })
            .catch(err => { res.status(400).json(err) })
    },

    // Update
    findOneAndUpdate: (req, res) => {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
            .then(data => res.json(data))
            .catch(err => { res.status(400).json(err) })
    },
    // addReview:(req,res)=>{
    //     Movie.findOne({_id:req.params.id,'username.name':req.body.name})
    // }




    // Delete
    delete: (req, res) => {

        Movie.deleteOne({ _id: req.params.id }) // hardcoded variable .params.{variable name here}
            .then(data => res.json(data))
            .catch(err => { res.status(400).json(err) })
    },
}