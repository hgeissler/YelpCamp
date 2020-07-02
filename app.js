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
  const newCampground = { name: req.body.name, image: req.body.image }

  Campground.create(newCampground, function (err, newlyCreated) {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/campgrounds')
    }
  })
})

app.get('/campgrounds/new', function (req, res) {
  res.render('new')
})

// listen
app.listen('3000', function () {
  console.log('The YelpCamp Server has started')
})
