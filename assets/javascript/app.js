





function displayAnimalGiphy() {
    // Grabbing and storing the data-animal property value from the button
    var animal = $(this).attr("data-animal");

    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=NF9xm9MqHWlgQ72hISsHmFo4neb2EBZB&limit=5";

    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After data comes back from the request
        .then(function (response) {
            console.log(queryURL);


            // storing the data from the AJAX request in the results variable
            var results = response.data;


            // Looping through each result item
            for (var i = 0; i < results.length; i++) {

                // Creating and div element
                var animalDiv = $("<div>");

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + results[i].rating);

                // Creating  an image tag
                var animalImage = $("<img>");

                // setting up the src of the image and get it from the ajax call
                animalImage.attr("src", results[i].images.fixed_height_still.url);
                // some css styling
                animalDiv.css("float", "right");
                animalDiv.css("margin-right", "20px");
                
                // setting up attributes for the function that will move and stop the gifs on clicks
                animalImage.attr("data-still", results[i].images.fixed_height_still.url);

                animalImage.attr("data-animate", results[i].images.fixed_height.url);

                animalImage.attr("data-state", "still");
                // add a class to listen for clicks
                animalImage.addClass("gify");


                // Appending the paragraph and image tag to the animalDiv
                animalDiv.append(p);
                animalDiv.append(animalImage);

                // Prependng the animalDiv to the HTML page (the gifs will appear here)
                $("#animals").prepend(animalDiv);

            }
        });
}

// creating the function that holds the state of the gifs 

function gifyMotion() {

    var state = $(this).attr("data-state");
    console.log(state);
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
}
// setting up the event handler for the gif on clicks
$(document).on("click", ".gify", gifyMotion);



// adding an event listener for the class button and display our gifs
$(document).on("click", ".button", displayAnimalGiphy);

// creating an array of animlas that will show up in the btns
var myanimals = ["Fox", "Cat", "Elephant", "Tiger", "Lion", "Koala", "Crocodile", "Baboon", "Mouse"];

// creating the function to make our buttons

function insertButton() {
    $("#animalButtons").empty();
    for (var i = 0; i < myanimals.length; i++) {
        var btn = $("<button>");

        btn.addClass("button");
        btn.attr("data-animal", myanimals[i]);
        btn.text(myanimals[i]);
        $("#animalButtons").append(btn);

    }
}

// event on click for the submit button
$("#addAnimal").on("click", function (event) {
    event.preventDefault();
    // get the value from the text 
    var myAnimal = $("#animal-input").val().trim();
    // pushing a the new animal inserted in the arr
    myanimals.push(myAnimal);
    // calling our function so our new animal is added as a button to the #animalButton
    insertButton();
});

// calling this function to make sure the btn is added
insertButton();

