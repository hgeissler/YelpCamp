const express = require('express')
let app = express()

app.get('/', function (req, res) {
  res.send('This will be the landing page')
})

app.listen('3000', function () {
  console.log('The YelpCamp Server has started')
})
