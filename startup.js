require('babel/register');

var server = require('./server');
var port = process.env.PORT || 4200;

server.listen(port);
console.log('Server listening on http://localhost:' + port);
