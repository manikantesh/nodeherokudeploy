const express = require('express');
const chalk = require('chalk');
const fs = require('fs');
var products = {};
var isUserLoggedIn = false;

var PORT = process.env.PORT || 8080;

var app = express();

fs.readFile('./data/products.json',function(err,data){
    products = JSON.parse(data.toString());
});

/* starting server might take few sec*/
app.listen(PORT,function(){
    console.log(chalk.green('Server listening at',PORT))
});
/** Middleware */
app.use(function(req,res,next){
    console.log('*** Request Received ***',new Date());
    next();//Pass request to next handler
});

function validateUser(req,res,next){
    if(isUserLoggedIn){
        next();
    }else{
        res.sendFile(__dirname + '/login.html');
    }
}

/*https://localhost:3000/products*/
app.get('/products',validateUser,function(req,res){
    res.json(products);
});

/*https://localhost:3000/*/
app.get('/',function(req,res){
    res.sendFile(__dirname + '/login.html');
});
/*https://localhost:3000/login*/
app.post('/login',function(req,res){
    isUserLoggedIn = true;
    res.sendFile(__dirname + '/home.html');
})
/*https://localhost:3000/invoice*/
app.get('/invoice',validateUser,function(req,res){
    res.download(__dirname+'/data/invoice.pdf');
})

console.log('***Program End***');


/**
 * 
 * Heroku cloud development
 * 
 * 1. Coniguration (setup)
 * 2. Code in remote repository
 * 3. Deploy
 * 
 * 
 * PORT 8080
 * Procfile
 * add web command: "web:node app.js"
 * 
 * checkin code to github
 */