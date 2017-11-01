let mongoose = require('mongoose');
//Allocation Schema
let schemaDef = new mongoose.Schema({
		device_id: {type: String,reuired: true},
		emp_id: {type: String,reuired: true},
		repair_amount: {type: Number},
		start_date: {type: Date},
		end_date: {type: Date},
		is_active: {type: Boolean}
	},{timestamps: true}
);
let Allocation = module.exports = mongoose.model('Allocation', schemaDef);

//Get allocations
module.exports.getAllocations = function(callback){
	Allocation.find(callback).where('is_active').equals(true);
}

//Get allocation
module.exports.getAllocationById = function(id, callback){
	Allocation.findById(id, callback).where('is_active').equals(true);
}

//Insert allocation
module.exports.addAllocation = function(allocationObj, callback){
	let newObj = {
		device_id: allocationObj.device_id,
		emp_id: allocationObj.emp_id,
		repair_amount: allocationObj.repair_amount,
		start_date: allocationObj.start_date,
		end_date: allocationObj.end_date,
		is_active: true
	};
	Allocation.create(newObj, callback);
}

//Update allocation
module.exports.updateAllocation = function(id, allocationObj, options, callback){
	let query = {_id: id};
	let update = {
		device_id: allocationObj.device_id,
		emp_id: allocationObj.emp_id,
		repair_amount: allocationObj.repair_amount,
		start_date: allocationObj.start_date,
		end_date: allocationObj.end_date,
		is_active: true
	};
	Allocation.findOneAndUpdate(query, update, options, callback);
}

//Soft delete allocation
module.exports.deleteAllocation = function(id, options, callback){
	let query = {_id: id};
	let update = {is_active: false};
	Allocation.findOneAndUpdate(query, update, options, callback);
}

//Delete permanent allocations
module.exports.removeAllocation = function(id, callback){
	let query = {_id: id};
	Allocation.remove(query, callback);
}
