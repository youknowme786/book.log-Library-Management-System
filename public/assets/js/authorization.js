$(document).ready(function() {
	console.log("authorization.js is linked");

	var user;

	//Used for Auth0
	// $("#sign-in").on("click", event => {
	// 	console.log("Sign in button clicked");
	// 	$.get("/login", data => {
	// 		console.log("Successfully routed to /login");
	// 	});
	// });

	// Initialize Firebase
	var fbConfig = {
		apiKey: "AIzaSyCtU9CvYWigVKqx1-SpTJa7r4cPwh8x8VQ",
		authDomain: "booklog-library-mgt-system.firebaseapp.com",
		databaseURL: "https://booklog-library-mgt-system.firebaseio.com",
		projectId: "booklog-library-mgt-system",
		storageBucket: "booklog-library-mgt-system.appspot.com",
		messagingSenderId: "728679115344"
	};

	firebase.initializeApp(fbConfig);

	//USER SIGN UP
	//create the user in firebase
	//create the user in mysql, using the firebase UID as the primary key
	$("#sign-up-button").on("click", event => {
		var email = $("#email-input").val();
		var password = $("#password-input").val();

		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(user => {
				console.log("USER CREATED");
				console.log(user);
				//create mysql user
				//when a user is created, how to set the firebase UID as the primary key in the users table?
				//might want to change isAlpha test of city/state because some do have spaces
				var newUser = {
					id: user.uid,
					firstName: "user test",
					middleName: "solo",
					lastName: "LastNAme",
					userType: "Patron",
					phoneNumber: "1231231245",
					streetAddress: "St ad",
					city: "testcity",
					state: "statetest",
					zipCode: "0001",
					emailAddress: user.email
				};

				$.post("api/users/create", newUser, result => {
					console.log(result);
					console.log(result.id);
				});
			})
			.catch(err => {
				// Handle Errors here.
				console.log("FIREBASE USER CREATION ERROR");
				console.log(err.code);
				console.log(err.message);
			});
	});

	$("#log-in-button").on("click", event => {
		var email = $("#email-input").val();
		var password = $("#password-input").val();

		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.catch(function(error) {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log("FIREBASE USER LOGIN ERROR");
				console.log(errorCode);
				console.log(errorMessage);
			});
	});

	$("#log-out-button").on("click", event => {
		firebase
			.auth()
			.signOut()
			.then(user => {
				// Sign-out successful.
				console.log("User signed out");
				console.log(user);
			})
			.catch(function(error) {
				// An error happened.
				console.log("SIGN OUT ERROR");
				console.log(error);
			});
	});

	var user = null;
	//Gets the currently signed in user
	firebase.auth().onAuthStateChanged(signedInUser => {
		if (signedInUser) {
			user = signedInUser;
			console.log("Currently signed in user:");
			console.log(user);
			console.log(user.uid);
		} else {
			console.log("No user is signed in");
			user = null;
		}
	});

	$("#test-button").on("click", event => {
		console.log("Current user:");
		console.log(user);
		console.log(user.uid);
	});
});
