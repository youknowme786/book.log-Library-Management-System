$(document).ready(function () {

    function populateBook(isbn) {
        var apiKey = 'AIzaSyBVaPHihkOt3MSXrw5Hf-HjJB7TrOdawlo'
        var queryURL = 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn + '&key=' + apiKey;
        // Performing GET requests to the Google Books API
        // Searches by ISBN
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function (data) {
            console.log(data)
        });
    }

    $(document).on('click', 'a.dropdown-item', function () {
        var keyWord = $('#search-input').val().trim();
        populateBook(keyWord);
    })

})  