function greeting(firstName) {
    alert("Hello " + firstName);
}

function conditional() {
    alert("Use Inspect to see the console and inspect the code.");
    var currentHour = new Date().getHours();
    if (currentHour < 10) {
        alert("Good morning!");
    } else if (currentHour < 18) {
        alert("Good day!");
    } else {
        alert("Good evening!");
    }
}

function variable() {
    var inputValue;
    var inputValue = 1;
    alert("You defined a new variable: " + inputValue);
}

function evalNumber() {
    var inputValue = Number(prompt("Enter any five-digit number without commas"))
    if (isNaN(inputValue) || Number.isInteger(inputValue)) { // check to see if the input value is not a number or if is not an integer
        alert(inputValue + " is not a number or is not an integer.")
    } else if (inputValue.toString().length != 5) {
        alert("False! " + inputValue + " is not a whole 5-digit number.")
    } else if (inputValue % 2 == 0) {
        alert(inputValue + " is an even number.")
    } else {
        alert(inputValue + " is an odd number.")
    }
}

function changeTitle() {
    let selectedElement = document.getElementById("week1Card");
    console.log(selectedElement);
    selectedElement.innerText = "Week One";
}

function scopeValues() {
    if (0 == 0) {
        var x = 0;
        var y = 1;
    } else {
        alert("Why is 0 not 0?");
    };

    const z = x;
    alert("Use Inspect to see the console and inspect the code.")
    console.log("Check the sources to see this code and study the scope of the declarations.")
    console.log("Value of x as originally declared: " + x);
    console.log("Value of y as originally declared: " + y); //"let" is not accessible outside of the if statement code block
    var x = x + 2;
    console.log("Value of x + 1: " + x);
    console.log("Value of z: " + z + " does not change.");
}

function currentMinute() {
    var dt = new Date();
    let selectedElement = document.getElementById("datetime");
    console.log(selectedElement);
    selectedElement.innerText = "Today is " + dt.toLocaleDateString() + ", and it is " +
        dt.toLocaleTimeString() + " now.";
}

function disappear() {
    let selectedElement = document.getElementById("footer");
    selectedElement.style.visibility = "hidden";
}

function lastItem(arrayName) {
    let selectedElement = document.getElementById("fruit");
    arrayName.sort();
    selectedElement.innerText = "The original array is " + "[" +
        arrayName +
        "], and I sorted it alphabetically. The last item of the sorted array is " + arrayName[arrayName.length - 1];
}

// function parseArray(array) {
//     var newFruit = prompt("enter a fruit"); //prompt asks for input
//     array.push(newFruit); //.push method adds a value to an array
//     var x = array.sort(); //.sort method sorts values in an array
//     var y = x.length; //.length method accesses the length of an array
//     console.log(x[y - 1]); //log the last item in the array
//     console.log(array); //log the entire array
// }
// var newArray = ["papaya", "apple", "orange", "banana"];

function parentFunction() {
    let a = 1;

    function childFunction() {
        var b = a + 2;
        return b;
    };
    return childFunction();
}

function searchMusic() {
    // declare variable from user input
    var artistName = document.getElementById("artistInput").value;
    // var albumName = document.getElementById("albumInput").value;

    // declare base url for API
    var url = "https://www.theaudiodb.com/api/v1/json/1/discography.php?s=" + artistName;

    // declare destination for album art
    // var albumDiv = document.getElementById("albumArt");

    // fetch command
    // check for bad response
    // save the response to a variable
    // grab album art URL
    // grab album year
    // grab album genre
    // grab album description
    fetch(url)
        .then( // check to see if the page is not loading properly
            function(response) {
                if (response.status !== 200) {
                    // 200 means that the page is successfully hit
                    console.log('PROBLEM! Status code is: ' + response.status);
                    return;
                }
                response.json().then(function(data) {
                    console.log(data);
                    let jsonContent = data.album;
                    console.log(jsonContent); // this allows us to investigate what fields are available to us
                    for (i in jsonContent) {
                        var discographyDiv = document.getElementById('discography');
                        var albumYearDiv = document.createElement('span');
                        albumYearDiv.setAttribute('class', 'h4');
                        albumYearDiv.innerText = jsonContent[i].intYearReleased;
                        var albumNameDiv = document.createElement('span');
                        albumNameDiv.setAttribute('class', 'h4');
                        albumNameDiv.innerText = jsonContent[i].strAlbum;
                        discographyDiv.appendChild(albumYearDiv);
                        discographyDiv.appendChild(albumNameDiv);
                    }
                    // albumDiv.src = jsonContent.strAlbumThumb; // change the src of the albumDiv id
                    document.getElementById("albumYear").innerText = jsonContent.intYearReleased;
                    document.getElementById("albumName").innerText = jsonContent.strAlbum;
                    // document.getElementById("albumDesc").innerText = jsonContent.strDescriptionEN;
                });
            });
}

// Super Challenge
// Use this base to return all albums.
// Iterate through them all and display them.
// https: //www.theaudiodb.com/api/v1/json/1/searchalbum.php?s=" + artistName + "&a=" + albumName;

function addElements() {
    var valueArray = ['first', 'second', 'third'];
}