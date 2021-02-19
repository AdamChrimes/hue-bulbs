// External dependencies
const express = require('express');
const axios = require('axios');
const morgan = require('morgan');

// Initialise
const app = express();
const port = 3000;

// dotenv environment variables
require('dotenv').config()

// Middleware
app.use(express.json());
app.use(morgan('tiny'));

// Philips Hue API credentials
const API_URL = process.env.API_URL;
const API_USERNAME = process.env.API_USERNAME;

// Default GET route
app.get('/', (req, res) => {
  res.send('Hello Hue!')
})

// Get light information by ID
app.get('/lights/:id', (req, res) => {
  axios.get(`${API_URL}/${API_USERNAME}/lights/${req.params.id}`)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => console.log(error));
})

// Default POST route
app.post('/', function (req, res) {
  res.send('Got a POST request')
})

// Default PUT route
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
})

// Default DELETE route
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
})

// Run app
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
