const express      = require('express'),
      bodyParser   = require('body-parser'),
      _            = require('lodash')

const { mongoose } = require('./db/mongoose'),
      { Employee }     = require('./models/employee')

const { ObjectId } = require('mongodb')

const app = express()

const port = process.env.PORT || 3000

app.use(bodyParser.json())

app.post('/api/employees', (req, res) => {
	const employee = new Employee({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		title: req.body.title,
		salary: req.body.salary,
		department: req.body.department
	})
	employee.save()
		.then(doc => {
			res.send(doc)
		}, e => {
			res.status(400).send(e)
		})
})

app.get('/api/employees', (req, res) => {
	Employee.find().then(employees => {
		res.send({ employees })
	}, e => {
		res.status(400).send(e)
	})
})

app.get('/api/employees/:id', (req, res) => {
	const id = req.params.id

	Employee.findById(id).then(employee => {
		if(!employee) {
			return res.status(404).send()
		}
		res.send({ employee })
	}).catch(e => {
		res.status(404).send(e)
	})
})

app.delete('/api/employees/:id', (req, res) => {
	const id = req.params.id

	Employee.findByIdAndRemove(id)
		.then(employee => {
			if(!employee) {
				return res.status(404).send()
			}
			res.send({ employee })
		})
		.catch(e => {
			res.status(404).send(e)
		})
})

app.listen(port, () => {
	console.log(`Started on port ${port}`)
})
