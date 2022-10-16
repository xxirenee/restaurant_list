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

  const { keywords, sort, order, title } = req.query
  RestaurantList.find({})
    .sort({ [sort]: order })
    .lean()
    .then(restaurant => {
      const filterRestaurantsData = restaurant.filter(
        data =>
          data.name.trim().toLowerCase().includes(keywords.trim().toLowerCase()) ||
          data.category.includes(keywords.trim())
      )
      res.render('index', { restaurant: filterRestaurantsData, keywords:keywords, title })
    })
    .catch(err => console.log(err))
})

module.exports = router
