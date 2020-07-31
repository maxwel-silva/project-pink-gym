const fs = require('fs')
const data = require('./data.json')

exports.post = function (request, response) {

  const keys = Object.keys(request.body)

  for (key of keys) {
    if (request.body[key] == "") {
      return response.send('Please, fill all fields')
    }
  }

  // []
  data.instructors.push(request.body) // [{...}, {...}, {...}]

  // Armazenando Informações Instructors

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
    if (err) return response.send('Write file error')
    return response.redirect('/instructors')
  })
}
