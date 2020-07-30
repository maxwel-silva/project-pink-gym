const express = require('express')
const routes = express.Router()

routes.get('/', function (request, response) {
  return response.redirect('/instructors')
})

routes.get('/instructors', function (request, response) {
  return response.render('instructors/index')
})

routes.get('/instructors/create', function (request, response) {
  return response.render('instructors/create')
})

routes.post('/instructors', function(request, response){
  return response.send(request.body)
})

routes.get('/members', function (request, response) {
  return response.render('members/index')
})

module.exports = routes