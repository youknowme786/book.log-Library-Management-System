$(document).ready(function() {
	console.log("authorization.js is linked");

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

	//Sign up a new user
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
					firstName: "user test",
					middleName: "",
					lastName: "userTLastNAme",
					userType: "Patron",
					phoneNumber: "1231231245",
					streetAddress: "st add",
					city: "testcity",
					state: "statetest",
					zipCode: "0001",
					emailAddress: user.email,
					isEmployee: false
				};

				$.post("api/users/create", newUser, result => {
					console.log(result);
				});
			})
			.catch(err => {
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				console.log("FIREBASE USER CREATION ERROR");
				console.log(errorCode);
				console.log(errorMessage);
			});
	});

	$("#log-in-button").on("click", event => {
		var email = $("#email-input").val();
		var password = $("#password-input").val();

		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				console.log("USER SIGNED IN");
				$.get("/api/test", result => {
					//figure out how to consistently return the user once the user is signed in
					console.log(result);
				});
			})
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

	//Log in an existing user
});
