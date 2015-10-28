var express = require('express');
var router = express.Router();
var User = require('../models/user');
var sms = require('../node_modules/twili');

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport) {

  router.get('/', function(req, res) {
      // Display the Login page with any flash message, if any
  		if (req.isAuthenticated()) {
  			res.redirect('/find_tutor');
  		} else {
  			res.render('index', { title: 'SmartTi.me', message: req.flash('message') });
  		}
  	});

  /*router.get('/helloworld', function(req, res){
    res.render('helloworld', {title:'Hello, World!'});
  });*/

  //final login GET
  router.get('/login', function(req, res) {
    res.render('login', {title: 'Log in or sign up', message: req.flash('message')});
  });

  //final login POST
  router.post('/signin', passport.authenticate('login', {
      failureRedirect: '/login',
      failureFlash : true
  }), function(req, res) {
			res.redirect('/map');
});

  //final registration POST
  router.post('/signup', passport.authenticate('signup', {
				failureRedirect:'/',
	      failureFlash : true
	}), function(req, res){
		req.user.name = req.body.name;
		req.user.save();
		res.redirect('/map');
	});

	router.get('/newtask', function(req, res) {
	    res.render('newtask', { title: 'Add New Task' });
	});

	router.post('/tasklist', isAuthenticated, function(req, res) {
		res.render('tasklist', { user: req.user });
	});

	router.post('/changelocation', function(req, res){
		console.log(req.body.lat);
		req.user.location = JSON.stringify({lat: req.body.lat, lng: req.body.lng});
		console.log(req.user.location);
		req.user.save();
	})

	router.get('/map', isAuthenticated, function(req, res){
		var db = req.db;
		var u = req.user;
		var str = "";
		var collection = db.get('users');
		collection.find({},{},function(e,docs){
			function allLocations(){
				var passed = [];
				for(var i = 0; i < docs.length; i++){
					if(docs[i].active && docs[i].location != "" && docs[i].username != u.username){
						if(u.currentSearch != "" && docs[i].subjects.indexOf(u.currentSearch) >= 0){
							passed.push(JSON.stringify(docs[i]));
						}
						else if(u.currentSearch == "")
							passed.push(JSON.stringify(docs[i]));
					 }
				}
				if(req.user.currentSearch != ""){
					str = req.user.currentSearch;
					req.user.currentSearch = "";
					req.user.save();
				}
				return passed;
			}
			res.render('map', {usr:u, "allLocations": allLocations(), "search":str});
		});
	});

	router.get('/maptwo', isAuthenticated, function(req, res){
		if(req.user.requesting != ""){
			res.redirect('/mapthree');
		}
		else{
		var db = req.db;
		var u = req.user;
		var collection = db.get('users');
		collection.find({},{},function(e,docs){
			function allLocations(){
				var passed = [];
				for(var i = 0; i < docs.length; i++){
					if(docs[i].active && docs[i].location != "" && docs[i].username != u.username && docs[i].requesting == u.username){
						if(u.currentSearch != "" && docs[i].subjects.indexOf(u.currentSearch) >= 0)
							passed.push(JSON.stringify(docs[i]));
						else if(u.currentSearch == "")
							passed.push(JSON.stringify(docs[i]));
					 }
				}
				if(req.user.currentSearch != ""){
					req.user.currentSearch = "";
					req.user.save();
				}
				return passed;
			}
			res.render('maptwo', {usr:u, "allLocations": allLocations()});
		});
	}
});

	router.get('/mapthree', isAuthenticated, function(req, res){
		var db = req.db;
		var u = req.user;
		var collection = db.get('users');
		collection.find({},{},function(e,docs){
			function allLocations(){
				var passed = [];
				for(var i = 0; i < docs.length; i++){
					if(docs[i].active && docs[i].location != "" && docs[i].username != u.username && docs[i].username == u.requesting){
						if(u.currentSearch != "" && docs[i].subjects.indexOf(u.currentSearch) >= 0)
							passed.push(JSON.stringify(docs[i]));
						else if(u.currentSearch == "")
							passed.push(JSON.stringify(docs[i]));
					 }
				}
				if(req.user.currentSearch != ""){
					req.user.currentSearch = "";
					req.user.save();
				}
				return passed;
			}
			res.render('mapthree', {usr:u, "allLocations": allLocations()});
		});
	});

	router.post('/searching', function(req,res){
            req.user.currentSearch = req.body.results;
            req.user.save();
            res.redirect('/map');
    });

	router.post('/updatelocation', isAuthenticated, function(req, res){
		res.render('login');
	})

	router.get('/profile', isAuthenticated, function(req, res){
		res.render('profile', {"name": req.user.name, "email": req.user.username, "phone": req.user.phone});
	});

  router.get('/userlist', function(req, res) {
      var db = req.db;
      var collection = db.get('usercollection');
			if(req.user){
				var uname = req.user.username
			}
      collection.find({},{},function(e,docs){
          res.render('userlist', {
              "userlist": docs
          });
      });
  });

	router.get('/be_tutor', isAuthenticated, function(req,res){
		res.render('map');
	});

  router.get('/newuser', function(req, res) {
      res.render('signup', { title: 'Add New User' });
  });

  router.post('/adduser', function(req, res){
    var db = req.db;

    var userName = req.body.username;
    var userPassword = req.body.userpassword;
    var name = req.body.name;
		var grade = req.body.grade;
		var tutor = req.body.tutor;
		var tutee = req.body.tutee;
		var location = req.body.location;

		var subjects = []
		var classes = []
		var ratings = [-1]
		if(tutor){
			var subjects = req.body.subjects
			var classes = req.body.classes
			var ratings = [5]
		}

    var collection = db.get('usercollection');

    collection.insert({
      "username" : userName,
      "password" : userPassword,
      "name": name,
			"grade": grade,
			"tutor": tutor,
			"tutee": tutee,
			"active": false,
			"subjects": subjects,
			"classes": classes,
			"ratings": ratings,
			"location": location
    }, function (err, doc){
      if(err){
        res.send("fukin error m8");
      }
      else{
        res.redirect("userlist");
        }
    });
  });

	//EXPERIMENTAL TWILIO ROUTE!!!
	router.post('/MessagesTest', function(req, res) {
		if(req.user.requesting == ""){
			sms.sendSms(req.body.phone, "You have been requested by "+ req.body.name +"!");
			req.user.requesting = req.body.username;
			req.user.save();
		}
		res.redirect('map');
	});

	router.post('/MessagesTestResponse', function(req, res) {
			sms.sendSms(req.body.phone, req.body.name + " has accepted your request for tutoring and is on their way!");
			req.user.requesting = req.body.username;
			req.user.save();
			res.redirect('maptwo');
	});
	//THIS IS FOR TESTING ONLY. GET RID OF IT LATER.
	//Allows you to quickly double-check twilio functionality by using get request
	//sends text to Arthur's textfree number
	router.get('/mt', function(req, res) {
		console.log('made it to post');
		sms.sendSms('6086209078','hi');//hard-coded message and phone number
		console.log('sent sms i think');
		res.render('map');
	});

	router.post('/finish', isAuthenticated, function(req, res){
		req.user.requesting = "";
		req.user.save();
		res.redirect('maptwo');
	})

  router.get('/newtask', function(req, res) {
      res.render('newtask', { title: 'Add New Task' });
  });

	router.get('/find_tutor', isAuthenticated, function(req, res){
			res.render('maptwo');
	});

	router.post('/find_tutor', isAuthenticated, function(req,res){
		req.body.search;
	})

	router.get('/averages', isAuthenticated, function(req, res){
	  var db = req.db;
	  var collection = db.get('taskcollection');
	  collection.find({},{},function(e,docs){
	    function allNames(){
	       var names=[];
	       for(var i = 0; i < docs.length; i++){
	         if(names.indexOf(docs[i].name) <= -1){
	           names.push(docs[i].name);
	          }
	       }
	       return names;
	     }
	  res.render('averages', {
	    "tasklist" : docs,
	    "allNames": allNames()
	    });
	  });
	});
  /* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

  return router;

}
