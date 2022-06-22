require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const Add = require('./models/add')
const cors = require('cors')
const usersRouter=require('./controllers/users')
const User = require('./models/user')
app.use('api/users', usersRouter)
app.use(cors())
app.use(express.static('build'))
app.use(express.json())


morgan.token('add', (request, response) => JSON.stringify(request.body));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :add'))


app.get('/', (request, response) => {
response.send('<h1>Works</h1>')
})



app.get('/api/adds', (request, response) => {
  Add.find({}).then(adds => {
    response.json(adds)
  })
})

app.get('/api/adds/:id', (request, response, next) => {
  Add.findById(request.params.id)
  .then(add => {
    if (add) {
        response.json(add)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/adds/:id', (request, response, next) => {
  Add.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


app.post('/api/adds', async (request, response, next) => {
  const body = request.body

const user= await User.findById(body.userId)

  if (!body.item) {
    return response.status(400).json({ 
      error: 'item missing' 
    })
  }
  if (!body.description) {
    return response.status(400).json({ 
      error: 'description missing' 
    })
  }
  if (!body.price) {
    return response.status(400).json({ 
      error: 'price missing' 
    })
  }
  if (!body.photo) {
    return response.status(400).json({ 
      error: 'photo missing' 
    })
  }

 
  const add = new Add ({
    item: body.item,
    description: body.description,
    price: body.price,
    photo: body.photo,
    user: user._id
  })
  
 add
    .save()
    user.adds = user.adds.concat(savedAdd._id)
  await user.save()
    .then((savedAdd) => {
      response.json(savedAdd.toJSON())
    })
    .catch((error) => next(error))
})

app.put('/api/adds/:id', (request, response, next) => {
  const body = request.body

  const add = {
    item: body.item,
    description: body.description,
    price: body.price,
    photo:body.photo
  }

  Add.findByIdAndUpdate(request.params.id, add, { new: true })
    .then(updatedAdd => {
      response.json(updatedAdd.toJSON())
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } 

  next(error)
}
app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})