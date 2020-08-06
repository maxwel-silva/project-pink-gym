const express = require('express')
const routes = express.Router()

const instructors = require('../instructors')

routes.get('/', function (request, response) {
  return response.redirect('/instructors')
})

routes.get('/instructors', function (request, response) {
  return response.render('instructors/index')
})

routes.get('/instructors/create', function (request, response) {
  return response.render('instructors/create')
})

routes.post('/instructors', instructors.post)

routes.get('/members', function (request, response) {
  return response.render('members/index')
})

module.exports = routes