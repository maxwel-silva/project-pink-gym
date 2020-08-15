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

routes.get('/instructors/:id', instructors.show)
routes.get('/instructors/:id/edit', instructors.edit)
routes.post('/instructors', instructors.post)
routes.put('/instructors', instructors.put)

// HTTP Verbs *
// GET : Receber 
// POST : Criar 
// PUT : Atualizar 
// DELETE : Deletar

routes.get('/members', function (request, response) {
  return response.render('members/index')
})

module.exports = routes