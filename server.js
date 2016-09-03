var express = require("express");
var moment = require("moment");
var query = require("querystring");
var app = express();

app.get("/", function(req, res) {
    res.send("Example Input --- <https://luna-timestamp-api.herokuapp.com/message/December%2015,%202015> ---OR--- <https://luna-timestamp-api.herokuapp.com/message/1450137600>")
});

app.get("/message/:time", function(req, res) {
    //console.log("works");
    var time = req.params.time;
    var parseTime = parseInt(time, 10);
    var result = {
        "unix": "",
        "natural": ""
    };

    //not unix format input, eg: December%2015,%202015
    if (!parseTime) {
        var dateReadble = query.unescape(time);
        //convert input to unix format
        time = moment(dateReadble).valueOf()/100;
    }
    
    var date = moment.unix(time);
    result["unix"] = time;
    result["natural"] = date.format("MMMM D, YYYY");
    
    res.send(result);
});

app.listen(process.env.PORT);
