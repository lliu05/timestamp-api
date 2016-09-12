var express = require("express");
var moment = require("moment");
var query = require("querystring");
var app = express();

app.use(express.static(path.join(__dirname, 'static/html')));
app.use(express.static(path.join(__dirname, 'static/css')));

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
        time = moment(dateReadble).valueOf()/1000;
    }
    
    var date = moment.unix(time);
    result["unix"] = time;
    result["natural"] = date.format("MMMM D, YYYY");
    
    res.send(result);
});

app.listen(process.env.PORT);
