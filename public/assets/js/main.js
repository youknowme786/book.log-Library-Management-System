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

    function isOnShelves() {
        var stockStatus = parseInt($('.on-stock').html());
        console.log(stockStatus);

        if (stockStatus === 0) {
            $('#reserveBook').removeClass('visible')
            $('#reserveBook').addClass('invisible')
            $('#addToWhishList').removeClass('invisible');
            $('#addToWhishList').addClass('visible');
            $('.on-stock').addClass('stock-alert');

        }
    }

    $('.favorite-book').hover(function () {
        $(this).addClass('fav-on');
    }, function () {
        $(this).removeClass('fav-on');
    })

    isOnShelves();

    $(document).on('click', 'a.dropdown-item', function () {
        var keyWord = $('#search-input').val().trim();
        populateBook(keyWord);
    })

    $('#action-btn-reserve').on('click', function (event) {
        event.preventDefault()
        // gets the book id
        var id = $(this).data('mediaid');
        console.log(id);
        // var customer = $(this).parent().closest('.input-group').children('.form-control').val();
        // if (customer === "") {
        //     alert("Please enter your name!");
        //     return;
        // }
        // sets a PUT ajax call to update the database
        $.ajax('/api/reservations/create', {
            data: {
                "MediumId": id,
                "UserId": 4
            },
            type: 'POST'
        }).then(
            function (data) {
                console.log('updated id ', id);
                console.log(data);

                // need position infomation to send back to user
            }
            )
    })

    // need the route to add to waitinglist

})  