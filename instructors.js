const fs = require('fs')
const data = require('./data.json')
const { age } = require('./utils')

// Visualizações Instructor

exports.show = function (request, response) {
  const { id } = request.params

  const foundInstructor = data.instructors.find(function (instructor) {
    return instructor.id == id
  })

  if (!foundInstructor) {
    return response.send('Instructor not found')
  }
 
  const instructor = {

    // Realizando Spread

    ...foundInstructor,
    age: age(foundInstructor.birth),
    services: foundInstructor.services.split(','),
    created_at: new Intl.DateTimeFormat('pt-BR').format(foundInstructor.created_at),

  }
  return response.render('instructors/show.njk', { instructor })
}

// Criações Instructors

exports.post = function (request, response) {

  // Validando Dados

  const keys = Object.keys(request.body)

  for (key of keys) {
    if (request.body[key] == "") {
      return response.send('Please, fill all fields')
    }
  }

  // Tratando Dados

  let { avatar_url, name, birth, gender, education, classes, services } = request.body

  birth = Date.parse(birth)
  const created_at = Date.now()
  const id = Number(data.instructors.length + 1)

  // Organizando Dados

  data.instructors.push({
    id,
    avatar_url,
    name,
    birth,
    gender,
    education,
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



