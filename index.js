var http = require("http"),
    mongojs = require("mongojs");
    url = require("url");

var uri = process.env.MONGO_URI || "mongodb://devtest:trackerdev@ds031988.mongolab.com:31988/nsiptracker_dev",
    db = mongojs.connect(uri);

function requestHandler(request, response) {
    response.writeHead(200, {"Content-Type": "text/html"});
    
    logged_ipsCollection = db.collection('logged_ips');
    
    var url_parts = url.parse(request.url, true);
    var query = url_parts.query;
    console.log(query);
    
    var computername = query.computername;
    
    if(computername){    
        var document = {
            computername:computername,
            ip:request.connection.remoteAddress,
            servertime:new Date()
        };
    
        console.log(document);
        logged_ipsCollection.insert(document);
    }

    logged_ipsCollection.find({}, {limit:5,sort:[['servertime',-1]]}, function(err, records) {
        if(err) {
            console.log("There was an error executing the database query.");
            response.end();
            return;
        }
        var html = '<h2>Logged IPs</h2>',
        i = records.length;

        while(i--) {
            html += '<p><b>Computer Name:</b> ' 
                 + records[i].computername 
                 + ' <br /><b>IP:</b> ' 
                 + records[i].ip
                 + ' <br /><b>Server Time:</b> ' 
                 + records[i].servertime
        }
        
        html += '<form>';
        html += 'Computer Name: <input type="text" name="computername">';
        html += '<input type="submit" value="Log IP">';
        html += '</form>'
        
        response.write(html);
        response.end();                            
    });
}

var server = http.createServer(requestHandler);

var port = Number(process.env.PORT || 3000);

server.listen(port);

console.log('Server running on port ' + port);