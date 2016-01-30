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
	var photo = new RaspiCam({
		mode: "photo",
		w: 180
	});

	res.json({'type': 'success', 'teste': photo});
};