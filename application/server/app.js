// import modules
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');
const csv = require('csv-parser');
const Product = require('./models/Product');
require("dotenv").config();


// app
const app = express();

// db
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Successfully connected to database'))
.catch((err) => console.log('Error connecting to databse', err));

// middleware
app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true}));

// routes
const testRoutes = require('./routes/test');
app.use("/", testRoutes);

// port
const port = process.env.PORT || 8080;


// listener
const server = app.listen(port, () => console.log(`Server is running on port ${port}`));