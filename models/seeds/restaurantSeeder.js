const mongoose = require('mongoose')
const Restaurant = require('../Restaurant')
const restaurantList = require('../../restaurant.json').results
const db = require('../../config/mongoose')

db.once('open', () => {

  Restaurant.create(restaurantList)
    .then(() => {
      console.log('seeder created done.')
      db.close()
    })
    .catch(err => console.log(err))
})
