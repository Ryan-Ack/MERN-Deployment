const express = require("express");
const cors = require('cors');
const app = express();
const port = 8000;


app.use(cors());
app.use(express.json(), express.urlencoded({ extended: true }));

require("./server/config/mongoose.config");
require('./server/routes/movie.routes')(app); //app is passed in here

const server = app.listen(port, () => console.log(`Server is running on port ${server.address().port}!`))