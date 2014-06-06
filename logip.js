// Load the core http module.
var http = require('http');
    mongojs = require("mongojs");

var uri = process.env.MONGO_URI || "mongodb://devtest:trackerdev@ds031988.mongolab.com:31988/nsiptracker_dev",
    db = mongojs.connect(uri);

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

var port = Number(process.env.PORT || 3000);

// Start the server on port 3000
server.listen(port);

// Print out a nice message so you know that the server started
console.log('Server running on port ' + port);