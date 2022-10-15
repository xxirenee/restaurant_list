const express = require('express')
const router = express.Router()
const RestaurantList = require('../../models/Restaurant')

//新增餐廳頁面
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  RestaurantList.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//查看特定餐廳
router.get('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  RestaurantList.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch((error) => console.log(error))
})
//修改餐廳
router.get('/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  RestaurantList.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch((error) => console.log(error))
})

router.put('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return RestaurantList.findByIdAndUpdate(id, req.body)
    .lean()
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})
//刪除餐廳
router.delete('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return RestaurantList.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
