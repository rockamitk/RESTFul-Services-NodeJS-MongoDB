let mongoose = require('mongoose');

//Employee Schema
let empSchema = new mongoose.Schema({
	emp_name: {
		type: String,
		reuired: true
	},
	emp_category: 'string',
	is_active: {
		type: Boolean
	}
},
{
  timestamps: true
});
let Employee = module.exports = mongoose.model('Employee', empSchema);

//Get employees
module.exports.getEmployees = function(callback){
	Employee.find(callback).where('is_active').equals(true);
}

//Get employees
module.exports.getEmployeeById = function(id, callback){
	Employee.findById(id, callback).where('is_active').equals(true);
}

//Insert employee
module.exports.addEmployee = function(empObj, callback){
	let newObj = {
		emp_name: empObj.emp_name,
		emp_category: empObj.emp_category,
		is_active: true
	};
	Employee.create(newObj, callback);
}

//Update employee
module.exports.updateEmployee = function(id, empObj, options, callback){
	let query = {_id: id};
	let update = {
		emp_name: empObj.emp_name,
		emp_category: empObj.emp_category,
		is_active: true
	};
	Employee.findOneAndUpdate(query, update, options, callback);
}
//Delete permanent employees
module.exports.removeEmployee = function(id, callback){
	let query = {_id: id};
	Employee.remove(query, callback);
}
//Soft delete employee
module.exports.deleteEmployee = function(id, options, callback){
	let query = {_id: id};
	let update = {is_active: false};
	Employee.findOneAndUpdate(query, update, options, callback);
}