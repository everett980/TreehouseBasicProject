var https = require("https");
function printMessage(username, badgeCount, points) {
	console.log(username + " has "+badgeCount+" badge(s) and "+points+" points in Javascript.");
};
function get(username) {
	var request = https.get("https://teamtreehouse.com/"+username+".json", function(response) {
		var responseBody = "";
		response.on('data', function(chunk) {
			responseBody+=chunk;
			//console.log("cat");
		});
		response.on('end', function() {
			if(response.statusCode === 200) {
				try {
					var profile = JSON.parse(responseBody);
					printMessage(username, profile.badges.length, profile.points["JavaScript"]);
				} catch(error) {
					printError(error);
				}
			} else {
				printError({message: "There was an error getting the profile for: "+username+". ("+response.statusCode+")"});
				//since teamtreehouse changed from http to https, STATUS_CODE is no longer available, so I'll simply print the statusCode for response
			}	
		});
	});
	function printError(error) {
		console.error(error.message);
	}
	request.on('error', printError);
}
module.exports.get = get;