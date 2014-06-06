var http = require("http"),
    mongojs = require("mongojs");

var uri = process.env.MONGO_URI || "mongodb://devtest:trackerdev@ds031988.mongolab.com:31988/nsiptracker_dev",
    db = mongojs.connect(uri);

var server = http.createServer(requestHandler);

function requestHandler(request, response) {
    response.writeHead(200, {"Content-Type": "text/html"});
    
    logged_ipsCollection = db.collection('logged_ips');
    
    logged_ipsCollection.find({}, function(err, records) {
        if(err) {
            console.log("There was an error executing the database query.");
            response.end();
            return;
        }
        var html = '<h2>Logged IPs</h2>',
        i = records.length;

        while(i--) {
            html += '<p><b>IP:</b> ' 
                 + records[i].ip 
                 + ' <br /><b>Server Time:</b> ' 
                 + records[i].servertime
        }
        response.write(html);
        response.end();                            
    });
}

var port = Number(process.env.PORT || 3000);

server.listen(port);

console.log('Server running on port ' + port);