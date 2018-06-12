
$(document).ready(function(){



    
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
                
                console.log(response);
                // storing the data from the AJAX request in the results variable
                var results = response.data;
                console.log(results);
                console.log(results.slug);

                // Looping through each result item
                for (var i = 0; i < results.length; i++) {
                    console.log(results[i].slug);
                    // Creating and storing a div tag
                    var animalDiv = $("<div>");

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + results[i].rating);

                    // Creating and storing an image tag
                    var animalImage = $("<img>");
                    // Setting the src attribute of the image to a property pulled off the result item
                    animalImage.attr("src", results[i].images.fixed_height.url);

                    // Appending the paragraph and image tag to the animalDiv
                    animalDiv.append(p);
                    animalDiv.append(animalImage);

                    // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                    $("#animals").prepend(animalDiv);
            }
        });
    }


    $(document).on("click", ".button", displayAnimalGiphy);

    var myanimals = ["dog", "cat", "elephant"];
    
    function insertButton() {
        $("#animalButtons").empty();
        for (var i=0; i<myanimals.length; i++) {
            var btn = $("<button>");

            btn.addClass("button");
            btn.attr("data-animal", myanimals[i]);
            btn.text(myanimals[i]);
            $("#animalButtons").append(btn);

        }
    }

    $("#addAnimal").on("click", function(event){
        event.preventDefault();

        var myAnimal = $("#animal-input").val().trim();

        myanimals.push(myAnimal);
        insertButton();
    })

    insertButton();

});