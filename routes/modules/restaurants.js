const express = require('express')
const router = express.Router()
const RestaurantList = require('../../models/Restaurant')

//新增餐廳頁面
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const userId = req.user._id
  RestaurantList.create({...req.body, userId})
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//查看特定餐廳
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  RestaurantList.findOne({_id, userId})
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch((error) => console.log(error))
})
//修改餐廳
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  RestaurantList.findOne({_id, userId})
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch((error) => console.log(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  return RestaurantList.findOneAndUpdate({_id, userId}, req.body)
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})
//刪除餐廳
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return RestaurantList.findOneAndDelete({_id, userId})
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
