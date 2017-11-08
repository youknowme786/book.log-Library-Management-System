console.log("Test")(
    // Manage user submit button:
    // $("#user-submit").on("click", function() {
    //     event.preventDefault();
    //     window.location.href = "/manage/users/" + $("#user-id").val()
    // })

    // Validation + function that adds book to DB:
    function() {
        "use strict";

        window.addEventListener(
            "load",
            function() {
                var form = document.getElementById("mediaform");
                form.addEventListener(
                    "submit",
                    function(event) {
                        if (form.checkValidity() === false) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                        form.classList.add("was-validated");
                        event.preventDefault();
                        if (form.checkValidity() === true) {
                            $("#new-book-modal").modal("show");
                            var newbook = {
                                mediaType: $("#media-type")
                                    .val()
                                    .toLowerCase(),
                                industryIdentifier: $(
                                    "#industry-identifier"
                                ).val()
                            };
                            $.post("/api/media/new", newbook);
                        }
                    },
                    false
                );
            },
            false
        );
    }
)();

// Validation + function that deletes books from DB:
// (function() {
//     "use strict";

//     window.addEventListener(
//         "load",
//         function() {
//             var form = document.getElementById("deleteform");
//             form.addEventListener(
//                 "submit",
//                 function(event) {
//                     if (form.checkValidity() === false) {
//                         event.preventDefault();
//                         event.stopPropagation();
//                     }
//                     form.classList.add("was-validated");
//                     event.preventDefault();
//                     if (form.checkValidity() === true) {
//                         // $("#delete-book-modal").modal("show");
//                         var newbook = {
//                             mediaType: $("#delete-media-type")
//                                 .val()
//                                 .toLowerCase(),
//                             industryIdentifier: $("#delete-industry-identifier").val()
//                         };
//                         $.ajax({
//                             method: "DELETE",
//                             url: "/api/media/delete",
//                             data: newbook
//                         })
//                         // ("/api/media/delete", newbook);
//                         console.log(newbook)
//                     }
//                 },
//                 false
//             );
//         },
//         false
//     );
// })();

// When the delete button is clicked
$("#delete-submit").on("click", function() {
    event.preventDefault();
    var newbook = {
        mediaType: $("#delete-media-type")
            .val()
            .toLowerCase(),
        industryIdentifier: $("#delete-industry-identifier").val()
    };
    console.log(newbook);
    $.ajax({
        type: "DELETE",
        url: "/api/media/delete",
        data: newbook
    }).then(function(res) {
        console.log(res);
    });
});
