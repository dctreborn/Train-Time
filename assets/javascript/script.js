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
	//variables to be stored and put into table
	var trainName = $("#train-name").val().trim();
	console.log("name: " + trainName);
	var destination = $("#destination").val().trim();
	console.log("destination: " + destination);
	var firstTime = $("#first-time").val().trim();
	console.log("first time: " + firstTime);
	var freq = $("#frequency").val().trim();
	console.log("frequency: " + freq);
	var arrival;
	var minutesAway;

	//convert first time to military
	firstTime = moment(firstTime, "hh:mm").subtract(1, "day");
	//calculate difference from first time to now
	var timeDiff = moment().diff(firstTime, "minutes");
	//get remaining time to next train
	var timeRemainder = timeDiff % freq;
	//get time in minutes of next train
	minutesAway = freq - timeRemainder;
	//get actual time of next train
	arrival = moment().add(minutesAway, "minutes").format("hh:mm");

	firebase push data
	database.ref().push({
		trainName: trainName,
		destination: destination,
		firstTime: firstTime,
		freq: freq,
		arrival: arrival,
		minutes: minutesAway
	});
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


	var length = arrival.length;
	var newRow = $("<tr>");
	//loop to create table entry
	for (var i = 0; i < length; i++) {
		var newCol = $("<td>");
		newCol.text(array[i]);
		newRow.append(newCol);
	}
});