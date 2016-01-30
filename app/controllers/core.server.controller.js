'use strict';

var RaspiCam = require("raspicam");

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null,
		request: req
	});
};


exports.photo = function(req, res) {
	var camera = new RaspiCam({
		mode: "photo",
		output: "/home/pi/teste.jpg",
		w: 180
	});
	camera.start('timelapse');

	camera.stop();

	camera.on("read", function(err, timestamp, filename){ 
    	//do stuff
    	console.log(err);
    	console.log(timestamp);
    	console.log(filename);
	});

	res.json({'type': 'success', 'teste': camera});
};