const express = require('express')
const router = express.Router()
const RestaurantList = require('../../models/Restaurant')

router.get('/', (req, res) => {
  RestaurantList.find()
    .lean()
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.error(error))
})

//搜尋功能
router.get('/search', (req, res) => {
  const keywords = req.query.keywords.trim().toLowerCase()
  RestaurantList.find({})
    .lean()
    .then(restaurant => {
      const filterRestaurantsData = restaurant.filter(
        data =>
          data.name.toLowerCase().includes(keywords) ||
          data.category.includes(keywords)
      )
      res.render('index', { restaurant: filterRestaurantsData, keywords: keywords })
    })
    .catch(err => console.log(err))
})

module.exports = router
