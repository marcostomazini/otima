'use strict';

var RaspiCam = require("raspicam");
var path = require('path');
var async = require('async');
var exec = require('child_process').exec;
var cloudinary = require('cloudinary');
    cloudinary.config({ 
        cloud_name: 'hvdnpm6dx', 
        api_key: '893746855269141', 
        api_secret: 'kdvaLWVGZ4pyby-nPQaDvx3MlDE' 
    });

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


	var urlPhoto = {};

	cloudinary.uploader.upload(
            '/home/pi/Projetos/otima/public/server/photo.jpg',
            function(result) { 
                urlPhoto = {
                    url: result.url,
                    public_id: result.public_id
                };
                res.json({'type': urlPhoto});
            },
            {
                crop: 'limit',
                width: 800,
                height: 800
            }      
        );
};