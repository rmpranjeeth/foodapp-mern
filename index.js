var express = require('express');
var cookieParser = require('cookie-parser');
var cors = require('cors')
const mongoose = require('mongoose');
require("dotenv").config();

//Router//
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors())

//Port//
const PORT = 8000;

app.use('/', indexRouter);
app.use('/users', usersRouter);


// Set up default mongoose connection
mongoose.connect((process.env.dbUrl), { useNewUrlParser: true, useUnifiedTopology: true }),
console.log("Connected to MongoDB, server listening on port "+ PORT);

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

