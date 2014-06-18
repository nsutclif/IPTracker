var http = require("http"),
    mongojs = require("mongojs");
    url = require("url");
    express = require('express');

var uri = process.env.MONGO_URI || "mongodb://devtest:trackerdev@ds031988.mongolab.com:31988/nsiptracker_dev",
    db = mongojs.connect(uri);

function getClientIp(req) {
    // Copied and adapted from StackOverflow
    var ipAddress;
    // Amazon EC2 / Heroku workaround to get real client IP
    var forwardedIpsStr = req.headers['x-forwarded-for'];
    if (forwardedIpsStr) {
        // 'x-forwarded-for' header may return multiple IP addresses in
        // the format: "client IP, proxy 1 IP, proxy 2 IP" so take the
        // the first one
        var forwardedIps = forwardedIpsStr.split(',');
        ipAddress = forwardedIps[0];
    }
    if (!ipAddress) {
        // Ensure getting client IP address still works in
        // development environment
        ipAddress = req.connection.remoteAddress;
    }
    return ipAddress;
};

function requestHandler(request, response) {
    response.writeHead(200, {"Content-Type": "text/html"});
    
    logged_ipsCollection = db.collection('logged_ips');
    
    var url_parts = url.parse(request.url, true);
    var query = url_parts.query;
    
    var computername = query.computername;
    
    if(computername){    
        var document = {
            computername:computername,
            ip:getClientIp(request),
            servertime:new Date()
        };
    
        logged_ipsCollection.insert(document);
    }

    logged_ipsCollection.find({}, {limit:6,sort:[['servertime',-1]]}, function(err, records) {
        if(err) {
            console.log("There was an error executing the database query.");
            response.end();
            return;
        }
        var html = 
            '<html lang="en">\n'
          + '  <head>\n'
          + '    <meta charset="utf-8">\n'
          + '    <meta http-equiv="X-UA-Compatible" content="IE=edge">\n'
          + '    <meta name="viewport" content="width=device-width, initial-scale=1">\n'
          + '    <title>IP Tracker</title>\n'
          + '    <!-- Bootstrap -->\n'
          + '    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">\n'
          + '  </head>\n'
          + ''
          + '<body role="document">\n'
          + '<div class="container">\n'
          + '  <div class="page-header">\n'
          + '    <h2>Logged IPs</h2>\n'
          + '  </div>\n'
        
        i = records.length;

        while(i--) {
            html += '<p><b>Computer Name:</b> ' 
                 + records[i].computername 
                 + ' <br /><b>IP:</b> ' 
                 + records[i].ip
                 + ' <br /><b>Server Time:</b> ' 
                 + records[i].servertime
        }
        
        html += '<form>\n'
              + 'Computer Name: <input type="text" name="computername">\n'
              + '<input type="submit" value="Log IP">\n'
              + '</form>\n'
   
    
    
    
    
              + ' <!-- Bootstrap core JavaScript\n'
              + '================================================== -->\n'
              + '<!-- Placed at the end of the document so the pages load faster -->\n'
              + '<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>\n'
              + '<script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>\n'
              + '</div>'
              + '</body>\n'
              + '</html>';
        
        response.write(html);
        response.end();                            
    });
}

var port = Number(process.env.PORT || 3000);

var app = express();

app.get('/', requestHandler);


app.listen(port);

console.log('Server running on port ' + port);