// Require needed modules
var express = require('express');
var expressEjsLayouts = require('express-ejs-layouts');
var request = require('request');

const port = process.env.PORT || 3000
//Declare a new express app
var app = express();

// Tell express what view engine we want to use
app.set('view engine', 'ejs');

// Define middleware settings
app.use(expressEjsLayouts);

// Define routes
app.get('/', function(req, res){
	const url = 'http://www.omdbapi.com?apikey=908a16f9&s=Titanic';
	request(url, (error, response, body) => {
		if(!error && response.statusCode === 200){
			var parsedJson = JSON.parse(body);
			console.log(parsedJson)
			res.render('home', {movies: parsedJson.Search})
		}else{
			res.send(error);
		}
	});
});

app.get('/about', (req, res) => {
	console.log('hello')
	var name = 'Andy';
	var foods = ['sushi', 'cheese', 'coconuts', 'BBQ'];
	res.render('about', {Myname: name, myfoods: foods});
});

// Liston on port 3000
app.listen(port)