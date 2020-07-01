const express = require('express')
let app = express()
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('landing')
})

app.get('/campgrounds', function (req, res) {
  let campgrounds = [
    {
      name: 'Salmon Creek',
      img:
        'https://api.creativecommons.engineering/v1/thumbs/51ea6857-e202-4e84-8623-1ee864bcab3c',
    },
    {
      name: 'Granite Hill',
      img:
        'https://api.creativecommons.engineering/v1/thumbs/208b70eb-8ffd-4236-be8e-8c46322afd44',
    },
    {
      name: 'Mountain Goats Rest',
      img:
        'https://api.creativecommons.engineering/v1/thumbs/9f47e988-4c8d-4f4f-8dbd-66af44ff4131',
    },
  ]
  res.render('campgrounds', { campgrounds: campgrounds })
})

app.listen('3000', function () {
  console.log('The YelpCamp Server has started')
})
