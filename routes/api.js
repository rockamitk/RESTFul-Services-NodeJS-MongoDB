// Dependencies
let express = require('express');
let router = express.Router();
Employee = require('../models/employee');
Device = require('../models/device');
Allocation = require('../models/allocation');


// router.route('*').get(function(req, res){
// 	return res.send("APIs url is invalid!");
// });
/*
 * Employee APIs Signature
 */
router.route('/employees').get(function(req, res){
	Employee.getEmployees(function(err, result){
		if (err) return res.status(500).send(err);
		if (result.length){
			console.log("emp collections: "+result);
			return res.status(200).json(result);
		}
		return res.status(404).json({"message": "employees has empty records."});
	});
});

router.route('/employee/:_id').get(function(req, res){
	Employee.getEmployeeById(req.params._id, function(err, emp){
		if (err) return res.status(500).send(err);
		if (emp) return res.status(200).json(emp);
		return res.status(404).json({"message": "employee has not found _id:"+req.params._id});
	});
});

router.route('/employee').post(function(req, res){
	let empObj = req.body;
	console.log("req.body: "+JSON.stringify(empObj));
	Employee.addEmployee(empObj ,function(err, result){
		if(err){throw err;}
		console.log("Employee records has saved suceesfully. _id: "+result._id);
		res.status(200).json(result);
	});
});

router.route('/employee/:_id').put(function(req, res){
	let id = req.params._id;
	let empObj = req.body;
	console.log("req.body: "+JSON.stringify(empObj));
	Employee.updateEmployee(id, empObj, {upsert:true, new: true}, function(err, result){
		if (err) return res.status(500).send(err);
		if (result){
			console.log("employee "+id+" is updated.");
			return res.status(200).json(result);
		}
		return res.status(404).json({"message": "employees "+id+" has not found."});
	});
});
router.route('/employee/hard/:_id').delete(function(req, res){
	Employee.removeEmployee(req.params._id, function(err, emp){
		if (err) return res.status(500).send(err);
		if (emp) return res.status(200).json(emp);
		return res.status(404).json({"message": "employee has not found _id:"+req.params._id});
	});
});

router.route('/employee/soft/:_id').delete(function(req, res){
	let id = req.params._id;
	Employee.deleteEmployee(id, {upsert:true, new: true}, function(err, emp){
		if (err) return res.status(500).send(err);
		if (emp){
			console.log("employee "+id+" is mark as deleted.");
			return res.status(200).json(emp);
		}
		return res.status(404).json({"message": "employee has not found _id:"+req.params._id});
	});
});

/*
 * Device APIs Signature
 */
router.route('/devices').get(function(req, res){
	Device.getDevices(function(err, result){
		if (err) return res.status(500).send(err);
		if (result.length){
			console.log("device collections: "+result);
			return res.status(200).json(result);
		}
		return res.status(404).json({"message": "devices has empty records."});
	});
});

router.route('/device/:_id').get(function(req, res){
	Device.getDeviceById(req.params._id, function(err, device){
		if (err) return res.status(500).send(err);
		if (device) return res.status(200).json(device);
		return res.status(404).json({"message": "device has not found _id:"+req.params._id});
	});
});

router.route('/device').post(function(req, res){
	let deviceObj = req.body;
	console.log("req.body: "+JSON.stringify(deviceObj));
	Device.addDevice(deviceObj ,function(err, result){
		if(err){throw err;}
		console.log("Device has saved suceesfully. _id: "+result._id);
		res.status(200).json(result);
	});
});

router.route('/device/:_id').put(function(req, res){
	let id = req.params._id;
	let deviceObj = req.body;
	console.log("req.body: "+JSON.stringify(deviceObj));
	Device.updateDevice(id, deviceObj, {upsert:true, new: true}, function(err, result){
		if (err) return res.status(500).send(err);
		if (result){
			console.log("device "+id+" is updated.");
			return res.status(200).json(result);
		}
		return res.status(404).json({"message": "devices "+id+" has not found."});
	});
});
router.route('/device/hard/:_id').delete(function(req, res){
	Device.removeDevice(req.params._id, function(err, device){
		if (err) return res.status(500).send(err);
		if (device) return res.status(200).json(device);
		return res.status(404).json({"message": "device has not found _id:"+req.params._id});
	});
});

router.route('/device/soft/:_id').delete(function(req, res){
	let id = req.params._id;
	Device.deleteDevice(id, {upsert:true, new: true}, function(err, device){
		if (err) return res.status(500).send(err);
		if (device){
			console.log("device "+id+" is mark as deleted.");
			return res.status(200).json(device);
		}
		return res.status(404).json({"message": "device has not found _id:"+req.params._id});
	});
});

/*
 * Device Allocation API Signature
 */
router.route('/allocations').get(function(req, res){
	Allocation.getAllocations(function(err, result){
		if (err) return res.status(500).send(err);
		if (result.length){
			console.log("allocation collections: "+result);
			return res.status(200).json(result);
		}
		return res.status(404).json({"message": "allocations has empty records."});
	});
});

router.route('/allocation/:_id').get(function(req, res){
	Allocation.getAllocationById(req.params._id, function(err, allocation){
		if (err) return res.status(500).send(err);
		if (allocation) return res.status(200).json(allocation);
		return res.status(404).json({"message": "allocation has not found _id:"+req.params._id});
	});
});

router.route('/allocation').post(function(req, res){
	let allocationObj = req.body;

	console.log("req.body: "+JSON.stringify(allocationObj));
	let deviceId = allocationObj.device_id;
	let empId = allocationObj.emp_id;

	Device.getDeviceById(deviceId, function(err, device){
		if (err) return res.status(500).send(err);
		console.log("\tRecords exists for deviceId: "+deviceId);
		Employee.getEmployeeById(empId, function(err, employee){
			if (err) return res.status(500).send(err);
			console.log("\tRecords exists for employeeId: "+empId);
		
			Allocation.addAllocation(allocationObj ,function(err, result){
				if(err){throw err;}
				console.log("Allocation has saved suceesfully. _id: "+result._id);
				res.status(200).json(result);
			});
		});
	});
});

router.route('/allocation/:_id').put(function(req, res){
	let id = req.params._id;
	let allocationObj = req.body;
	console.log("req.body: "+JSON.stringify(allocationObj));
	Allocation.updateAllocation(id, allocationObj, {upsert:true, new: true}, function(err, result){
		if (err) return res.status(500).send(err);
		if (result){
			console.log("allocation "+id+" is updated.");
			return res.status(200).json(result);
		}
		return res.status(404).json({"message": "allocations "+id+" has not found."});
	});
});
router.route('/allocation/hard/:_id').delete(function(req, res){
	Allocation.removeAllocation(req.params._id, function(err, allocation){
		if (err) return res.status(500).send(err);
		if (allocation) return res.status(200).json(allocation);
		return res.status(404).json({"message": "allocation has not found _id:"+req.params._id});
	});
});

router.route('/allocation/soft/:_id').delete(function(req, res){
	let id = req.params._id;
	Allocation.deleteAllocation(id, {upsert:true, new: true}, function(err, allocation){
		if (err) return res.status(500).send(err);
		if (allocation){
			console.log("allocation "+id+" is mark as deleted.");
			return res.status(200).json(allocation);
		}
		return res.status(404).json({"message": "allocation has not found _id:"+req.params._id});
	});
});

console.log("\n");
router.stack.forEach(function(r){
  if (r.route && r.route.path && r.route.methods){
  	let method = Object.keys(r.route.methods)[0];
    console.info("\t"+method.toUpperCase()+"\t"+"/api"+r.route.path);
  }
});
// Return router
module.exports = router;