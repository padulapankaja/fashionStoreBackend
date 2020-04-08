const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");

//define server running port
let port = 4000; 


//======================================================================================================
//===================================import routes    =================================================
//======================================================================================================

//import user controlers
 const userRoutes   = require('./app/routes/user.router'); 

//======================================================================================================
//===================================import config files ===============================================
//======================================================================================================

// import db
const dbConfig = require('./config/db.config');

//======================================================================================================
//===================================open apps services  ===============================================
//======================================================================================================
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//======================================================================================================
//=================================== defines routes     ===============================================
//======================================================================================================

//user routes 
app.use('/user', userRoutes);



//======================================================================================================
//=================================== critical functions     ===========================================
//======================================================================================================

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


// open server
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});

