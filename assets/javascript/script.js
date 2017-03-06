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
	var destination = $("#destination").val().trim();
	var firstTime = $("#first-time").val().trim();
	var freq = $("#frequency").val().trim();
	var arrival;
	var minutesAway;

	//convert current and firstTime to military
	var currentTime = moment().format("hh:mm");
	firstTime = moment(firstTime).format("hh:mm");

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
	/* move to child_added
	var newRow = $("<tr>");
	//loop to create table entry
	for (var i = 0; i < length; i++) {
		var newCol = $("<td>");
		newCol.text(array[i]);
		newRow.append(newCol);
	}*/

	//firebase push data
	database.ref().push({
		trainName: trainName,
		destination: destination,
		firstTime: firstTime,
		freq: frequency,
		arrival: arrival,
		minutes: minutesAway
	});
});

//call values from database and add to table on push
database.ref().on("child_added", function(snapshot){

});