const MovieController = require("../controllers/movie.controller");

module.exports = app => {
    //create
    app.post("/api/movies", MovieController.create);
    //find all
    app.get("/api/movies", MovieController.findAll);
    //find by ID
    app.get("/api/movies/:id", MovieController.findById);
    // //update
    app.put("/api/movies/:id", MovieController.findOneAndUpdate);
    // app.patch("/api/movies/:id/review", MovieController.addReview);
    // //delete
    app.delete("/api/movies/:id", MovieController.delete)
}