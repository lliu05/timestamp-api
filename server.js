var express = require("express");
var path = require("path");
var moment = require("moment");
var query = require("querystring");
var app = express();

app.use(express.static(path.join(__dirname, 'static/html')));
app.use(express.static(path.join(__dirname, 'static/css')));

app.get('/message/:time', function(req, res) {
    //expect "time" to be in unix time form
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
    
    //retrive info based on unix time
    var date = moment.unix(time);
    result["unix"] = time.toString();
    result["natural"] = date.format("MMMM D, YYYY");
    
    //check if date validate
    if (!result["unix"] || result["natural"] == "Invalid date") {
        result["unix"] = null;
        result["natural"] = null;
    }
    
    res.send(result);
});

app.listen(process.env.PORT);

