const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const RestaurantList = require('./models/Restaurant')

mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  RestaurantList.find()
    .lean()
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.error(error))
})

//新增餐廳頁面
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

app.post('/restaurants', (req, res) => {
  RestaurantList.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//查看特定餐廳
app.get('/restaurants/:restaurant_id', (req, res) => {
  const { restaurant_id } = req.params
  RestaurantList.findById(restaurant_id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant}))
    .catch((error) => console.log(error))
})


//搜尋功能
app.get('/search', (req, res) => {
  const keywords = req.query.keywords.trim().toLowerCase()
  RestaurantList.find({})
    .lean()
    .then(restaurant=> {
      const filterRestaurantsData = restaurant.filter(
        data =>
          data.name.toLowerCase().includes(keywords) ||
          data.category.includes(keywords)
      )
      res.render("index", { restaurant: filterRestaurantsData, keywords:keywords })
    })
    .catch(err => console.log(err))

})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
