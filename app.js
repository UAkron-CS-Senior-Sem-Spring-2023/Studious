// including express
const express = require('express'); 
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());

// IMPORT ROUTES
const usersRoute = require('./routes/users');
app.use('/users', usersRoute);

// ROUTES

// home page
app.get('/', (req, res) => {
    res.send('We are on home now');
})

// connect to the mongodb
mongoose.connect('mongodb+srv://studiousprj:studiousnet5@studious.5mlqmcc.mongodb.net/?retryWrites=true&w=majority', 
    { useNewUrlParser: true }, 
    () => console.log("connected to db")
);

// start listening to the server (port 3000)
app.listen(3000);