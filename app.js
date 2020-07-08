var express = require('express');
var mysql = require('mysql');
var bodyparser = require('body-parser');	//This pases the request body
var app = express();	// Web framewrok


app.set("view engine", "ejs");	//This configures your application
app.use(bodyparser.urlencoded({extended: true}));	// Allows you to extract info/data from the url
app.use(express.static(__dirname + "/public"));		// Take whatever is in the public directory and serve them (that's where the css file is)


// Console message
app.listen(3000, function(){
	console.log("server running on 3000!");
});


// Connect the nodeJS file to MYSQL database
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'join_us'
});
	

// Write path for function
app.get("/", function(req,res){
	
	// Find count of users in db
	var num_of_users = "SELECT COUNT(*)  AS  count FROM users";
	
	connection.query(num_of_users, function(err, results){
		if(err) throw err;
		var count = results[0].count;
		
		// Respond with that count
		// This renders a file. it will look for a directory called views and will then loke for a file called home.ejs
		// This will then take the variable on the right and pass it into the home.ejs as the variable on the left
		res.render("home", {count: count});
	});
});


// Extract the entered email and insert into database
app.post("/register", function(req, res){
	var person = {email: req.body.email};	// This extracts form data from the request body

	connection.query('INSERT INTO users SET ?', person, function(err, result){
		if(err) throw err;
		res.redirect("/");
	});
});