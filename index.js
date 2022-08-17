const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors')
require('dotenv/config')

const app = express();
const PORT = 3001;

app.use(cors())

app.use(bodyParser.json());

//Import Routes
const CarsStockRoute = require('./routes/cars')

app.use('/cars' , CarsStockRoute)
app.use('/public', express.static('public'))
//Routes
app.get('/' ,(req, res) => {
    res.send('Apollo Car Dealership Back End API 🎉 | Developed By Andrew Kelly')
})


//Connect To DB
mongoose.connect(process.env.DB_CONNECTION, () => console.log('Connected Successfully'))

//Starts The Server
app.listen(PORT, (error) =>{
	if(!error)
		console.log("Server is Successfully Running, and App is listening on port "+ PORT)
	else
		console.log("Error occurred, server can't start", error);
	}
);
