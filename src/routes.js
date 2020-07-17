const express = require('express')
const routes = express.Router()

routes.get('/', function (request, response) {
  return response.redirect('/instructors')
})

routes.get('/instructors', function (request, response) {
  return response.render('instructors/index')
})

routes.get('/members', function (request, response) {
  return response.render('members/index')
})

module.exports = routes