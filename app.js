const express = require('express')
const app = express()
const port = 3000

const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json').results

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))


//首頁路由
app.get('/', (req, res) => {
  res.render('index', { restaurantList })
})

//頁面動態路由
app.get('/restaurants/:restaurant_id', (req, res) => {
  const { restaurant_id } = req.params
  const restaurantsList = restaurantList.find(data => data.id === Number(restaurant_id)
  )
  res.render('show', { restaurantsList })
})


//搜尋功能
app.get('/search', (req, res) => {
  const keywords = req.query.keywords.trim().toLowerCase()
  const filterRestaurants = restaurantList.filter(data => {
    const keyName = data.name.toLowerCase().includes(keywords)
    const keyCategory = data.category.includes(keywords)
    return (keyName || keyCategory)
  })
  res.render('index', { restaurantList: filterRestaurants, keywords: keywords})
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
