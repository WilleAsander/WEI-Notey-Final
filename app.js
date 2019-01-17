var express = require('express');

var app = express();

var home = require('./routes/home')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', home);

app.use(express.static('public'));

var PORT = process.env.PORT || 4242;

app.listen(PORT, function(){
    console.log('Server running at ' + PORT);
});