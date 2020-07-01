const express = require('express')
const bodyParser = require('body-parser')

let app = express()
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))

let campgrounds = [
  {
    name: 'Salmon Creek',
    image:
      'https://api.creativecommons.engineering/v1/thumbs/51ea6857-e202-4e84-8623-1ee864bcab3c',
  },
  {
    name: 'Granite Hill',
    image:
      'https://api.creativecommons.engineering/v1/thumbs/208b70eb-8ffd-4236-be8e-8c46322afd44',
  },
  {
    name: 'Mountain Goats Rest',
    image:
      'https://api.creativecommons.engineering/v1/thumbs/9f47e988-4c8d-4f4f-8dbd-66af44ff4131',
  },
]

app.get('/', function (req, res) {
  res.render('landing')
})

app.get('/campgrounds', function (req, res) {
  res.render('campgrounds', { campgrounds: campgrounds })
})

app.post('/campgrounds', function (req, res) {
  const name = req.body.name
  const image = req.body.image
  campgrounds.push({ name: name, image: image })
  res.redirect('/campgrounds')
})

app.get('/campgrounds/new', function (req, res) {
  res.render('new')
})

app.listen('3000', function () {
  console.log('The YelpCamp Server has started')
})
