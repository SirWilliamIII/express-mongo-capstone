const mongoose = require('mongoose')

const Employee = mongoose.model('Employee', {
	firstName: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	lastName: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	department: {
		type: String,
		required: false,
		minlength: 1,
		trim: true
	},
	salary: {
		type: Number,
		required: false,
		minlength: 1
	},
	title: {
		type: String,
		required: false,
		minlength: 1
	}
})

module.exports = { Employee }
