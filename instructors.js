const fs = require('fs')
const data = require('./data.json')
const { age, date } = require('./utils')

// Visualizar Instructors

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

// Criar Instructors

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

// Page Editar Instructors 

exports.edit = function (request, response) {

  const { id } = request.params

  const foundInstructor = data.instructors.find(function (instructor) {
    return instructor.id == id
  })

  if (!foundInstructor) {
    return response.send('Instructor not found')
  }

  const instructor = {
    ...foundInstructor,
    birth: date(foundInstructor.birth)
  }

  return response.render('instructors/edit', { instructor })
}

// Put Instructors

exports.put = function (request, response) {

  const { id } = request.body
  let index = 0

  const foundInstructor = data.instructors.find(function (instructor, foundIndex) {
    if (id == instructor.id) {
      index = foundIndex
      return true
    }
  })

  if (!foundInstructor) {
    return response.send('Instructor not found')
  }

  const instructor = {
    ...foundInstructor,
    ...request.body,
    birth: Date.parse(request.body.birth)
  }

  data.instructors[index] = instructor

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
    if (err) {
      return response.send('Write error')
      
    } else {
      return response.redirect(`/instructors/${id}`)
    }
  })
}