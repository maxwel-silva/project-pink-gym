const fs = require('fs')
const data = require('./data.json')

exports.post = function (request, response) {

  // Validação Dados

  const keys = Object.keys(request.body)

  for (key of keys) {
    if (request.body[key] == "") {
      return response.send('Please, fill all fields')
    }
  }

  // Tratamento Dados

  let { avatar_url, name, birth, gender, classes, services } = request.body

  birth = Date.parse(birth)
  const created_at = Date.now()
  const id = Number(data.instructors.length + 1)

  // Organização Dados

  data.instructors.push({
    id,
    avatar_url,
    name,
    birth,
    gender,
    classes,
    services,
    created_at,
  })

  // Armazenando os Dados

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
    if (err) return response.send('Write file error')
    return response.redirect('/instructors')
  })
}
