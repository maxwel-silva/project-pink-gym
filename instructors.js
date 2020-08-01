const fs = require('fs')
const data = require('./data.json')

exports.post = function (request, response) {

  const keys = Object.keys(request.body)

  for (key of keys) {
    if (request.body[key] == "") {
      return response.send('Please, fill all fields')
    }
  }

  // Adicionando Data Cadastro

  request.body.birth = Date.parse(request.body.birth)
  request.body.created_at = Date.now()

  // Adicionando ID

  request.body.id = Number(data.instructors.length + 1)

  // Armazenando Informações JSON

  data.instructors.push(request.body) 
  fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
    if (err) return response.send('Write file error')
    return response.redirect('/instructors')
  })
}
