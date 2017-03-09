// Initialize Firebase
var config = {
	apiKey: "AIzaSyBynl4WWMWNB9emOAo3R_4ewi6Sr5yk91s",
	authDomain: "rukatrains.firebaseapp.com",
	databaseURL: "https://rukatrains.firebaseio.com",
	storageBucket: "rukatrains.appspot.com",
	messagingSenderId: "42620412251"
};
firebase.initializeApp(config);

var database = firebase.database();

//pass values to database on click
$("#submit-btn").on("click", function(event){
	event.preventDefault();

	//removes : in time format
	var firstTime = $("#first-time").val().trim().replace(/(\:)/g, "");
	var freq = $("#frequency").val().trim();
	var numericTime = $.isNumeric(firstTime);
	var numericFreq = $.isNumeric(freq);

	if (numericTime && numericFreq){
		//rebuild time format to HH:mm
		firstTime = firstTime.slice(0,2) + ":" + firstTime.slice(2,4);
		//variables to be stored and put into table
		var trainName = $("#train-name").val().trim();
		var destination = $("#destination").val().trim();

		var arrival;
		var minutesAway;

		//convert first time to military
		var convertedTime = moment(firstTime, "HH:mm").subtract(1, "day");
		//calculate difference from first time to now
		var timeDiff = moment().diff(convertedTime, "minutes");
		//get remaining time to next train
		var timeRemainder = timeDiff % freq;
		//get time in minutes of next train
		minutesAway = freq - timeRemainder;
		//get actual time of next train
		arrival = moment().add(minutesAway, "minutes").format("HH:mm");

		//firebase push data
		database.ref().push({
			trainName: trainName,
			destination: destination,
			firstTime: firstTime,
			freq: freq,
			arrival: arrival,
			minutes: minutesAway
		});

		//reset input values
		$("#train-name").val("");
		$("#destination").val("");
		$("#first-time").val("");
		$("#frequency").val("");
	}
	else {
		//data verification entries
		if (numericFreq == false) {
			$("#frequency").val("").attr("placeholder","Please enter a number.");
		}
		if (numericTime == false) {
			$("#first-time").val("").attr("placeholder","Please enter a time.");
		}
	}
});

//call values from database and add to table on initial load
database.ref().on("child_added", function(snapshot){
	var db = snapshot.val();


	var trainName = db.trainName;
	var destination = db.destination;
	var firstTime = db.firstTime;
	var freq = db.freq;
	var arrival = db.arrival;
	var minutesAway = db.minutes;

	//variables in array to be looped
	var array = [
		trainName,
		destination,
		firstTime,
		freq,
		arrival,
		minutesAway
	];

	var length = array.length;
	var newRow = $("<tr>");
	//loop to create table entry
	for (var i = 0; i < length; i++) {
		var newCol = $("<td>");
		newCol.text(array[i]);
		newRow.append(newCol);
		$("#train-table").append(newRow);
	}
});