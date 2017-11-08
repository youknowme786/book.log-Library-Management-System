$(document).ready(function() {
    $(".nav a").on("click", function() {
        $(".nav")
            .find(".active")
            .removeClass("active");
        $(this)
            .parent()
            .addClass("active");
    });

    // ************ Firebase Authentication Section ************
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
                }).then(() => {
                    $("#sign-in-modal").modal("hide");
                });
            })
            .catch(error => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log("FIREBASE USER SIGN UP ERROR");
                console.log(errorCode);
                console.log(errorMessage);
                $("#authentication-error")
                    .text(errorMessage)
                    .show();
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
                $("#authentication-error")
                    .text(errorMessage)
                    .show();
            });

        //show the myprofile button
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
            $(".my-profile-button").show(0);
            $(".my-profile-button").attr("href", "/users/" + user.uid);
            $("#log-out-button").show(0);
            $("#authenticate-button").hide(0);
            $("#unauthenticated-banner").hide(0);
            $("#sign-in-modal").modal("hide");
            $(".action-btn-reserve-media").attr(
                "data-target",
                ".bd-example-modal-sm"
            );
            $(".actionBtnFav")
                .attr("data-target", "")
                .attr("data-toggle", "");

            $("#manage-page-button").show(0);
        } else {
            console.log("No user is signed in");
            user = null;
            $("#authenticate-button").show(0);
            $("#unauthenticated-banner").show(0);
            $(".my-profile-button").hide(0);
            $("#log-out-button").hide(0);
            $("#manage-page-button").hide(0);
            $(".action-btn-reserve-media").attr(
                "data-target",
                "#sign-in-modal"
            );
            $(".actionBtnFav")
                .attr("data-target", "#sign-in-modal")
                .attr("data-toggle", "modal");
        }
    });

    // ************ End Firebase Authentication Section ***********

    function isOnShelves() {
        var stockStatus = parseInt($(".on-stock").html());
        // console.log(stockStatus);

        if (stockStatus === 0) {
            $(".action-btn-reserve-media").text("Add to Waitlist");
            $(".on-stock").addClass("stock-alert");
        }
    }

    $(".favorite-book").hover(
        function() {
            $(this).addClass("fav-on");
        },
        function() {
            $(this).removeClass("fav-on");
        }
    );

    isOnShelves();

    $(".action-btn-reserve-media").on("click", function() {
        // gets the book id
        var mediumId = $(this).data("mediumId");
        var userId = user.uid;

        console.log(mediumId);
        reserveMedia(mediumId, userId);

        // var customer = $(this).parent().closest('.input-group').children('.form-control').val();
        // if (customer === "") {
        //     alert("Please enter your name!");
        //     return;
        // }
    });

    // ************ Favorites Section ************
    $(".actionBtnFav").on("click", function(event) {
        event.preventDefault();

        if (user) {
            var mediumId = $(this).data("mediumId");
            var userId = user.uid;
            var favorite = {
                mediumId: mediumId,
                userId: userId
            };

            if ($(this).hasClass("fav-selected")) {
                removeFromFavorites(favorite, $(this));
            } else {
                addToFavorites(favorite, $(this));
            }
        }
    });

    $(".remove-favorite").on("click", function() {
        var mediumId = $(this).data("mediumId");
        var userId = user.uid;
        var favorite = {
            mediumId: mediumId,
            userId: userId
        };
        removeFromFavorites(favorite);
        $(this)
            .parents("article")
            .remove();
    });

    function addToFavorites(newFavorite, btn) {
        $.post("/api/favorites/create", newFavorite, result => {
            console.log("NEW newFavorite MADE:");
            console.log(newFavorite);
        }).then(() => {
            console.log("TO DO: update media table quantities");
            btn.addClass("fav-selected");
        });
    }

    function removeFromFavorites(favorite, btn) {
        if (btn) {
            btn.removeClass("fav-selected");
        }

        // /api/:table /:UserId / delete /:MediumId?
        $.ajax({
            url:
                "/api/favorites/" +
                favorite.userId +
                "/delete/" +
                favorite.mediumId,
            type: "DELETE",
            success: result => {
                console.log("RECORD DELETED");
                console.log(result);
                if (btn) {
                    btn.removeClass("fav-selected");
                }
            }
        });
    } // ************ Favorites Section End ************

    function reserveMedia(mediumId, userId) {
        var newReservation = {
            mediumId: mediumId,
            userId: userId
        };
        console.log(userId);
        //POST to reservations table
        $.post("/api/reservations/create", newReservation, result => {
            console.log("NEW RESERVATION MADE:");
            console.log(newReservation);
        })
            .then(() => {
                console.log("TO DO: update media table quantities");
                //PUT to media table
            })
            .then(() => {
                console.log("Entering block with $.get");
                console.log("UserID: ", userId);
                $.get(
                    "/api/reservations/media/" + mediumId + "/" + userId,
                    data => {
                        console.log(data);
                        $("#reservation-position").text(
                            `You are number ${data.userPosition} in line`
                        );
                    }
                );
            });
    }

    // ************ Cancel Reservation Section ************

    $(".action-btn-cancel-media").on("click", function(event) {
        event.preventDefault();
        var mediumId = $(this).data("mediumId");
        // var userId = user.uid;
        var userId = user.uid;
        $(this)
            .parents("article")
            .remove();
        deleteReservation(mediumId, userId);
    });

    //Verified the function works using:
    //deleteReservation(4, 1);
    function deleteReservation(mediumId, userId) {
        console.log("Entering fxn deleteReservation");
        //DELETE from reservations table
        $.ajax({
            url: "/api/reservations/" + userId + "/delete/" + mediumId,
            type: "DELETE",
            success: result => {
                console.log("RECORD DELETED");
                console.log(result);
            }
        });
    }
    // ************ Cancel Reservation Section End ************

    // ************ Check Out Section ************
    $(".action-btn-check-out-media").on("click", function() {
        event.preventDefault();
        var mediumId = $(this).data("mediumId");
        var userId = user.uid;
        $(this)
            .parents("article")
            .remove();
        checkOutMedia(mediumId, userId);
    });

    function checkOutMedia(mediumId, userId) {
        var newCheckout = {
            mediumId: mediumId,
            userId: userId
        };

        //POST to checkouthistories table
        $.post("/api/checkouthistories/create/withres", newCheckout, result => {
            console.log("NEW CHECKOUT MADE:");
            console.log(newCheckout);
        }).then(() => {
            console.log("CheckOutMedia");
        });
    }
    // ************ Check Out Section End ************

    // ************ Check In Section ************
    $(".action-btn-check-in-media").on("click", function() {
        event.preventDefault();
        var mediumId = $(this).data("mediumId");
        var userId = user.uid;
        checkInMedia(mediumId, userId);

        $(this)
            .prev()
            .find(".returnBy")
            .addClass("hide");
        $(this)
            .prev()
            .find(".returnOn")
            .removeClass("hide");
        $(this).remove();
    });

    function checkInMedia(mediumId, userId) {
        var newCheckin = {
            mediumId: mediumId,
            userId: userId
        };

        //PUT to checkouthistories table
        $.ajax({
            url: "/api/checkouthistories/update/checkin",
            data: newCheckin,
            type: "PUT",
            success: result => {
                console.log("RECORD UPDATED");
                console.log(result);
            }
        });
    }
    // *******************SEARCH********************
    $("#searchButton").on("click", event => {
        event.preventDefault();

        var searchQuery = $("#searchQuery")
            .val()
            .trim();
        var searchBy = $("#searchBy option:selected")
            .text()
            .toLowerCase();

        console.log("You are searching for");
        console.log(searchQuery);
        console.log(searchBy);

        window.location.href = "/search/" + searchBy + "/" + searchQuery;
    });

    // ************ Check In Section ************
    // Manage user submit button:
    $("#user-submit").on("click", function() {
        event.preventDefault();
        console.log(
            $("#user-id")
                .val()
                .trim()
        );
        window.location.href =
            "/manage/users/" +
            $("#user-id")
                .val()
                .trim();
    });

    // When manager adds a new media:
    $("#new-submit").on("click", function() {
        event.preventDefault();
        $("#new-book-modal").modal("show");
        var newbook = {
            mediaType: $("#media-type")
                .val()
                .toLowerCase(),
            industryIdentifier: $("#industry-identifier").val(),
            totalStock: $("#new-quantity").val()
        };
        $.post("/api/media/new", newbook);
    });

    // When manager deletes a media:
    $("#delete-submit").on("click", function() {
        event.preventDefault();
        var id = $("#delete-industry-identifier").val();
        $.ajax({
            method: "DELETE",
            url: "/api/media/delete/" + id
        }).then(function(res) {
            console.log(res);
        });
    });
});
