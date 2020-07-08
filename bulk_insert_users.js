// Installing and loading relevent libraries
//npm install faker
//npm install mysql
var faker = require('faker');
var mysql = require('mysql');


// Connect the nodeJS file to MYSQL database
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'join_us'
});


connection.connect();


// Create data to push to MYSQL
var data = [];
for (var i = 0; i < 500; i++){
	data.push([
		faker.internet.email(),
		faker.date.past()
	]);
}

// Inserting the data to MYSQL using MYSQL syntax
var q = 'INSERT INTO users(email, created_at) VALUES ?';
connection.query(q,[data], function(err, result){
	console.log(err);
	console.log(result);
});


connection.end();
