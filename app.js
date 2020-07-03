const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// express app
let app = express()
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
// bootstrap
app.use(express.static('public'))

// mongoose
mongoose.connect('mongodb://localhost/yelp_camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
})
const Campground = mongoose.model('Campground', campgroundSchema)

// routes

app.get('/', function (req, res) {
  res.render('landing')
})

// INDEX
app.get('/campgrounds', function (req, res) {
  Campground.find({}, function (err, campgrounds) {
    if (err) {
      console.log(err)
    } else {
      res.render('index', { campgrounds: campgrounds })
    }
  })
})

// CREATE
app.post('/campgrounds', function (req, res) {
  const name = req.body.name
  const image = req.body.image
  const description = req.body.description
  const newCampground = { name: name, image: image, description: description }

  Campground.create(newCampground, function (err) {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/campgrounds')
    }
  })
})

// NEW
app.get('/campgrounds/new', function (req, res) {
  res.render('new')
})

// SHOW
app.get('/campgrounds/:id', function (req, res) {
  Campground.findById(req.params.id, function (err, foundCampground) {
    if (err) {
      console.log(err)
    } else {
      res.render('show', { campground: foundCampground })
    }
  })
})

// listen
app.listen('3000', function () {
  console.log('The YelpCamp Server has started')
})
