console.log("main.js is linked");
$(document).ready(function () {
    function populateBook(isbn) {
        var apiKey = "AIzaSyBVaPHihkOt3MSXrw5Hf-HjJB7TrOdawlo";
        var queryURL =
            "https://www.googleapis.com/books/v1/volumes?q=isbn:" +
            isbn +
            "&key=" +
            apiKey;
        // Performing GET requests to the Google Books API
        // Searches by ISBN
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (data) {
            console.log(data);
        });
    }

    function isOnShelves() {
        var stockStatus = parseInt($(".on-stock").html());
        console.log(stockStatus);

        if (stockStatus === 0) {
            $("#actionBtnReserve").text("Add to Waitlist");
            $(".on-stock").addClass("stock-alert");
        }
    }

    $(".favorite-book").hover(
        function () {
            $(this).addClass("fav-on");
        },
        function () {
            $(this).removeClass("fav-on");
        }
    );

    isOnShelves();

    $(document).on("click", "a.dropdown-item", function () {
        var keyWord = $("#search-input")
            .val()
            .trim();
        populateBook(keyWord);
    });

    $("#actionBtnReserve").on("click", function () {
        // gets the book id
        var id = $(this).data('mediumId');

        console.log(id);
        reserveMedia(id, 2);

        // var customer = $(this).parent().closest('.input-group').children('.form-control').val();
        // if (customer === "") {
        //     alert("Please enter your name!");
        //     return;
        // }
    });

    // ************ Favorites Section ************
    $('.actionBtnFav').on('click', function (event) {
        event.preventDefault();
        var mediumId = $(this).data('mediumId');
        var userId = $(this).data('userId');
        var favorite = {
            mediumId: mediumId,
            userId: userId
        };

        if ($(this).hasClass('fav-selected')) {
            removeFromFavorites(favorite, $(this));
        } else {
            addToFavorites(favorite, $(this));
        }

    })

    $('.remove-favorite').on('click', function () {
        var mediumId = $(this).data('mediumId');
        var userId = $(this).data('userId');
        var favorite = {
            mediumId: mediumId,
            userId: userId
        };
        removeFromFavorites(favorite);
        $(this).parents('article').remove();

    })

    function addToFavorites(newFavorite, btn) {
        $.post("/api/favorites/create", newFavorite, result => {
            console.log("NEW newFavorite MADE:");
            console.log(newFavorite);
        })
            .then(() => {
                console.log("TO DO: update media table quantities");
                btn.addClass('fav-selected');
            })
    }

    function removeFromFavorites(favorite, btn) {
        // /api/:table /:UserId / delete /:MediumId?
        $.ajax({
            url: "/api/favorites/" + favorite.userId + "/delete/" + favorite.mediumId,
            type: "DELETE",
            success: result => {
                console.log("RECORD DELETED");
                console.log(result);
                if (btn) {
                    btn.removeClass('fav-selected');
                }
            }
        });
    } // ************ Favorites Section End ************


    function reserveMedia(mediumId, userId) {
        var newReservation = {
            mediumId: mediumId,
            userId: userId
        };
        console.log(userId)
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

    $('.action-btn-cancel-media').on('click', function (event) {
        event.preventDefault();
        var mediumId = $(this).data('mediumId');
        var userId = $(this).data('userId');
        $(this).parents('article').remove();
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

        //PUT to media table
    }

    //Verified the function works using:
    //checkOutMedia(8, 2);
    // function checkOutMedia(mediumId, userId) {
    //     var newCheckout = {
    //         MediumId: mediumId,
    //         UserId: userId
    //     };

    //     //POST to checkouthistories table
    //     $.post("/api/checkouthistories/create", newCheckout, result => {
    //         console.log("NEW CHECKOUT MADE:");
    //         console.log(newCheckout);
    //     }).then(() => {
    //         console.log("TO DO: update media table quantities");
    //         //PUT to media table
    //     });
    // }
    // checkInMedia(8, 2);
    // function checkInMedia(mediumId, userId) {
    //     console.log("Entering fxn checkInMedia");
    //     var newCheckin = {
    //         MediumId: mediumId,
    //         UserId: userId
    //     };

    //     //PUT to checkouthistories table
    //     $.ajax({
    //         url: "/api/checkouthistories/checkin",
    //         type: "PUT",
    //         success: result => {
    //             console.log("RECORD UPDATED");
    //             console.log(result);
    //         }
    //     });

    //     //PUT to media table
    // }
    // /users/:userId

    $.get("/api/4/favorites", function (data) {
        console.log("show me object" + data);
    });
});

// All this stuff commented out was my hour long attempt to get bootstrap validation to work. It almost worked but in the end I failed :(
// (function() {
//   'use strict';

//   window.addEventListener('load', function() {
//     var form = document.getElementById('mediaform');
//     form.addEventListener('submit', function(event) {
//       if (form.checkValidity() === false) {
//         event.preventDefault();
//         event.stopPropagation();
//       }
//       form.classList.add('was-validated');
//     }, false);
//   }, false);
// })();

// Adding a new book to DB: 
$("#new-submit").on("click", function () {
    event.preventDefault();
    var newbook = {
        mediaType: $("#media-type").val().toLowerCase(),
        industryIdentifier: $("#industry-identifier").val()
    }
    $.post("/api/media/new", newbook)
})

// Clear form after modal is dismissed: 
$("#modalclose").on("click", function () {
    $("#industry-identifier").val("");
})