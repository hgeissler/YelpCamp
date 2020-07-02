const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// express app
let app = express()
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))

// mongoose
mongoose.connect('mongodb://localhost/yelp_camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
})
const Campground = mongoose.model('Campground', campgroundSchema)
// Campground.create(
//   {
//     name: 'TestCamp',
//     image:
//       'https://api.creativecommons.engineering/v1/thumbs/51ea6857-e202-4e84-8623-1ee864bcab3c',
//   },
//   function (err, campground) {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log(campground)
//     }
//   }
// )

// routes
app.get('/', function (req, res) {
  res.render('landing')
})

app.get('/campgrounds', function (req, res) {
  Campground.find({}, function (err, campgrounds) {
    if (err) {
      console.log(err)
    } else {
      res.render('campgrounds', { campgrounds: campgrounds })
    }
  })
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

// listen
app.listen('3000', function () {
  console.log('The YelpCamp Server has started')
})
