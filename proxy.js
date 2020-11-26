const express = require('express');
var cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

var axios = require('axios');

const app = express();
app.use(cors())

// Logging
app.use(morgan('dev'));

app.use('/api', 
(req, res) => {
  let config = {
    method: 'get',
    url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.headers.lat},${req.headers.lng}&key=${process.env.GOOGLE_MAPS_API_KEY}`
  };
  axios(config)
    .then(function (response) {
      console.log(req.headers.lat);
      res.send(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
});



app.listen(3080);







// axios(config)
// .then(function (response) {
//   console.log(JSON.stringify(response.data));
// })
// .catch(function (error) {
//   console.log(error);
// });
