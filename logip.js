// Load the core http module.
var http = require('http');
    mongojs = require("mongojs");

var uri = "mongodb://trackeradmin:qjoLtAJ3JevTQ2kJGXYy@ds033459.mongolab.com:33459/nsiptracker",
    db = mongojs.connect(uri, ["nsiptracker"]);

var server = http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end(request.connection.remoteAddress + '\n');
    
    var document = {
        ip:request.connection.remoteAddress,
        servertime:new Date()
    };
    
    logged_ipsCollection = db.collection('logged_ips');
    
    console.log(document);
	logged_ipsCollection.insert(document);
});

// Start the server on port 3000
server.listen(3000);

// Print out a nice message so you know that the server started
console.log('Server running on port 3000');

