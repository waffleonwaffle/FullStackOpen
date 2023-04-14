require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')
app.use(express.json())
app.use(express.static('build'))
morgan.token('data', function (request, response) {
    if (request.method === 'POST') {
        return JSON.stringify(request.body)
    }
})

const errorHandler = (error, request, response, next) => {
    console.log(error)
    if(error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    next(error)
}
app.use(morgan(':method :url :status :response-time ms :data'))
app.use(cors())
app.get('/', (request, response) => {
    response.send('<h1>People Directory<h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(people => {
        response.json(people)
    })
})

app.get('/info', (request, response) => {
    const now = new Date();
    Person.countDocuments({}).then(count => {
        response.send(`<p>Phonebook has info for ${count} people<p> ${now}`)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, error) => {
    const id = request.params.id
    Person.findByIdAndDelete(id)
        .then(() => {
            response.status(204).end();
        })
        .catch((error) => next(error))
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (body.name === undefined) {
        return response.status(400).json({
            error: 'name missing'
        })
    } else if (body.number === undefined) {
        return response.status(400).json({
            error: 'number missing'
        })
    }
    Person.findOne({ "name": body.name }).then((person) => {
        if (person) {
            return response.status(400).json({
                error: 'name must be unique'
            })
        }
        const newPerson = new Person({
            name: body.name,
            number: body.number || ''
        })
        newPerson.save().then(savedPerson => {
            response.json(savedPerson)
        })
    }).catch((error) => next(error))

})

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})