var express = require('express');
var app = express();

var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

app.use('/', function(req, res){
	// get the date string appended to the URL
    var dateString = req.originalUrl.slice(1);

    // confirm not empty string or null recieved
    if((dateString != null) && (dateString.length > 0)){
    	var date = decodeURI(dateString);
    	var uniTimestamp = parseInt(date);
    	if(uniTimestamp){
    		date = new Date(uniTimestamp);
    	} else {
    		var naturalDate = Date.parse(date);
    		date = new Date(naturalDate);
    	}

    	var humanDate = monthNames[date.getMonth()] + " " + date.getDay() + ", " + date.getFullYear();
    	
    }

    res.send(JSON.stringify({ "unix":  Date.parse(date), "natural":  humanDate }));

});

app.listen(3000, function(){
    console.log("sever started on port 3000");
})