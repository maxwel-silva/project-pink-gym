const fs = require('fs')
const data = require('./data.json')


// Show Instructor
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

    age: "",
    classes: "",
    services: foundInstructor.services.split(','),
    created_at: ""
  }

  return response.render('instructors/show.njk', { instructor })
}

// Create Instructors
exports.post = function (request, response) {

  // Validação Dados

  const keys = Object.keys(request.body)

  for (key of keys) {
    if (request.body[key] == "") {
      return response.send('Please, fill all fields')
    }
  }

  // Tratamento Dados

  let { avatar_url, name, birth, gender, education, classes, services } = request.body

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
