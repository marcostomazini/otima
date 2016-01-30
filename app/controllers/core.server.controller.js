'use strict';

var RaspiCam = require("raspicam");
var path = require('path');
var async = require('async');
var exec = require('child_process').exec;

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
	var spawn = require('child_process').spawn;
	var raspistill = spawn('raspistill', ['-w', '640', '-h', '480', '-q', '5', '-o', '/home/pi/Projetos/otima/public/server/photo.jpg', '-tl', '1000', '-t', '9999999', '-th', '0:0:0', '-n', '-rot', '180']);
	res.json({'type': 'success'});
};