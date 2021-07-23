const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/movieDB", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log("Connection to DB established"))
    .catch((err) => console.log("There was an error connecting to the DB", err))
