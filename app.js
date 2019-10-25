var express = require('express');
var app = express();

app.use('/', express.static('public'));

app.listen(8080);
console.log('Server is running on Port: 8080');