express = require("express");
var moment = require("moment");
var query = require("querystring");
var app = express();

app.get('/message/:time', function(req, res) {
    var time = req.params.time;
    var parseTime = parseInt(time, 10);
    var result = {
        "unix": "",
        "natural": ""
    };

    //not unix format input, eg: December%2015,%202015
    if (!parseTime) {
        //convert input to unix format
        var dateReadble = query.unescape(time);
        time = moment(dateReadble, "MMMM D, YYYY", true).valueOf()/1000;
    }
    
    
    result["unix"] = time;
    
    //check if date valid
    var date = moment.unix(time);
    if (time) result["natural"] = date.format("MMMM D, YYYY");
    else result["natural"] = null;

    res.send(result);
});

app.listen(8080);
