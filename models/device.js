let mongoose = require('mongoose');
//Device Schema
let schemaDef = new mongoose.Schema({
		device_name: {type: String,reuired: true},
		device_category: {type: String},
		device_description: {type: String},
		purchase_amount: {type: Number},
		purchase_date: {type: Date},
		is_active: {type: Boolean}
	},{timestamps: true}
);
let Device = module.exports = mongoose.model('Device', schemaDef);

//Get devices
module.exports.getDevices = function(callback){
	Device.find(callback).where('is_active').equals(true);
}

//Get device
module.exports.getDeviceById = function(id, callback){
	Device.findById(id, callback).where('is_active').equals(true);
}

//Insert device
module.exports.addDevice = function(deviceObj, callback){
	let newObj = {
		device_name: deviceObj.device_name,
		device_category: deviceObj.device_category,
		device_description: deviceObj.device_description,
		purchase_amount: deviceObj.purchase_amount,
		purchase_date: deviceObj.purchase_date,
		is_active: true
	};
	Device.create(newObj, callback);
}

//Update device
module.exports.updateDevice = function(id, deviceObj, options, callback){
	let query = {_id: id};
	let update = {
		device_name: deviceObj.device_name,
		device_category: deviceObj.device_category,
		device_description: deviceObj.device_description,
		purchase_amount: deviceObj.purchase_amount,
		purchase_date: deviceObj.purchase_date,
		is_active: true
	};
	Device.findOneAndUpdate(query, update, options, callback);
}

//Soft delete device
module.exports.deleteDevice = function(id, options, callback){
	let query = {_id: id};
	let update = {is_active: false};
	Device.findOneAndUpdate(query, update, options, callback);
}

//Delete permanent devices
module.exports.removeDevice = function(id, callback){
	let query = {_id: id};
	Device.remove(query, callback);
}
