const mongoose = require('mongoose')
const Restaurant = require('../Restaurant')
const restaurantList = require('../../restaurant.json').results

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {

  Restaurant.create(restaurantList)
    .then(() => {
      console.log('seeder created done.')
      db.close()
    })
    .catch(err => console.log(err))
})
