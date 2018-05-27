const express = require('express');
const app = express();
const hbs = require('hbs');
const fs = require('fs');

app.set('view engine','hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getcurrentyear',() =>{
	return new Date().getFullYear();
});



app.use((req,res,next) => {
	var now = new Date().toString();
	//console.log(`${now} : ${req.method} ${req.url}`);
	var log = `${now} : ${req.method} ${req.url}`;
	fs.appendFile('server.log',log + '\n',(err) =>{

	});
	next();
});
// app.use((req,res,next) => {
//   res.render('maintainance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res) =>{
 
  res.render('Home.hbs',{
  	pageTitle:'Home page',
  	welcome:'Welcome***'
  });
});


app.get('/about',(req,res) =>{
	res.render('about.hbs',{
		pageTitle:'About page'
	});
});

app.get('/bad',(req,res) =>{
	res.send('error in request');
});

app.listen(3000,() => {
       console.log("server started");
	});
