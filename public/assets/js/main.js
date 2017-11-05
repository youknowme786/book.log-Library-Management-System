console.log("main.js is linked");
$(document).ready(function() {
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
        }).done(function(data) {
            console.log(data);
        });
    }

    function isInStock() {
        var stockStatus = parseInt($(".on-stock").html());
        console.log(stockStatus);

        if (stockStatus === 0) {
            $("#reserveBook").removeClass("visible");
            $("#reserveBook").addClass("invisible");
            $("#addToWhishList").removeClass("invisible");
            $("#addToWhishList").addClass("visible");
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

    isInStock();

    $(document).on("click", "a.dropdown-item", function() {
        var keyWord = $("#search-input")
            .val()
            .trim();
        populateBook(keyWord);
    });

    $("#action-btn-reserve").on("click", function(event) {
        console.log("reserve button pressed");
        event.preventDefault();
        // gets the book id of the ice cream and the cutomer name
        var id = $("#isbn").html();
        console.log(id);
        // var customer = $(this).parent().closest('.input-group').children('.form-control').val();
        // if (customer === "") {
        //     alert("Please enter your name!");
        //     return;
        // }
        // sets a PUT ajax call to update the database
        // $.ajax("/api/reservations/create", {
        //     data: {
        //         MediumId: 4,
        //         UserId: 4
        //     },
        //     type: "POST"
        // }).then(function(data) {
        //     console.log("updated id ", id);
        //     console.log(data);
        //     // reloads the page to get the updated list
        //     // location.reload();
        // });
    });
});
