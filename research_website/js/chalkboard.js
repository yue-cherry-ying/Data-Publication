function addElements() {
    var valueArray = ['Data Publication for the Humanities', 'DIGS 2/30005', 'Professor: Miller Prosser'];
    for (i in valueArray) {
        var newDiv = document.createElement('div');
        newDiv.setAttribute('class', 'container text-center');
        newDiv.setAttribute('style', "width: 40%; border: dotted; border-radius: 20%; background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFs4-hYpYOBWjTdWgJY0ldGvTHZNf0VcZkMA&usqp=CAU');");
        newDiv.setAttribute('id', 'div ' + i);
        document.getElementById('addElements').appendChild(newDiv);
        newDiv.innerText = valueArray[i];
    };
}

function searchMusic() {
    var artistName = document.getElementById("artistInput").value;
    var url = "https://www.theaudiodb.com/api/v1/json/1/discography.php?s=" + artistName;
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
                        var linebreak = document.createElement('br');
                        albumYearDiv.setAttribute('class', 'h4');
                        albumYearDiv.innerText = jsonContent[i].intYearReleased;
                        var albumNameDiv = document.createElement('span');
                        albumNameDiv.setAttribute('class', 'h4');
                        albumNameDiv.innerText = jsonContent[i].strAlbum;
                        discographyDiv.appendChild(linebreak); // add line break between each entry
                        discographyDiv.appendChild(albumYearDiv);
                        discographyDiv.appendChild(document.createTextNode('\u00A0')); // add space between album year and album name
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

function currentMinute() {
    var dt = new Date();
    let selectedElement = document.getElementById("datetime");
    console.log(selectedElement);
    selectedElement.innerText = "Today is " + dt.toLocaleDateString() + ", and it is " +
        dt.toLocaleTimeString() + " now.";
}

function lastItem(arrayName) {
    let selectedElement = document.getElementById("fruit");
    arrayName.sort();
    selectedElement.innerText = "The original array is " + "[" +
        arrayName +
        "], and I sorted it alphabetically. The last item of the sorted array is " +
        arrayName[arrayName.length - 1] + ".";
}

function parseArray() {
    let selectedElement = document.getElementById("array");
    var newFruit = prompt("enter a fruit"); //prompt asks for input
    var newAnimal = prompt("enter an animal"); //prompt asks for input
    var newState = prompt("enter a state"); //prompt asks for input
    var newCountry = prompt("enter a country"); //prompt asks for input

    var array = []
    array.push(newFruit.toLowerCase()); //.push method adds a value to an array
    array.push(newAnimal.toLowerCase()); //.push method adds a value to an array
    array.push(newState.toLowerCase()); //.push method adds a value to an array
    array.push(newCountry.toLowerCase()); //.push method adds a value to an array

    var x = array.sort(); //.sort method sorts values in an array
    // var y = x.length; //.length method accesses the length of an array
    console.log(x); //log the the sorted array
    console.log(array); //log the entire array
    selectedElement.innerText = "The four items you typed are: " +
        newFruit + ", " +
        newAnimal + ", " +
        newState + ", " +
        newCountry +
        ". I lowered all the letters and sorted them alphabetically: " + x
}

function update() {
    var newWord = document.getElementById("newWord").value.trim();
    var currentWordLength = document.getElementById("long-word").innerHTML.length;
    if (newWord.length > currentWordLength) {
        document.getElementById("long-word").innerHTML = newWord;
    }
    document.getElementById("newWord").value = "";
}

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
    if (Number.isInteger(inputValue)) { // check to see if the input value is not an integer
        if (isNaN(inputValue)) { // check to see if the input value is not a number
            alert(inputValue + " is not a number.")
        } else if (inputValue.toString().length != 5) {
            alert("False! " + inputValue + " is not a whole 5-digit number.")
        } else if (inputValue % 2 == 0) {
            alert(inputValue + " is an even number.")
        } else {
            alert(inputValue + " is an odd number.")
        }
    } else {
        alert(inputValue + " is not an integer.")
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

function disappear() {
    let selectedElement = document.getElementById("foot");
    selectedElement.style.visibility = "hidden";
}

function parentFunction() {
    let a = 1;

    function childFunction() {
        var b = a + 2;
        return b;
    };
    return childFunction();
}

function wikiAPI() {
    var searchTerm = document.getElementById('searchTerm').value;
    var connect = new XMLHttpRequest();
    var url = "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=20&gsrsearch=" + searchTerm;
    connect.open('GET', url);
    connect.onload = function() {
        var wikiObject = JSON.parse(this.response);
        // console.log(wikiObject);
        // console.log(wikiObject.query.pages);
        var pages = wikiObject.query.pages;
        for (var i in pages) {
            var newDiv = document.createElement("div");
            var newLink = document.createElement("a");
            newDiv.setAttribute('class', 'row h4');
            document.getElementById("wiki").appendChild(newDiv);
            document.getElementById("wiki").appendChild(newLink);
            newDiv.innerText = pages[i].title;

            var linkText = document.createTextNode(pages[i].title);
            newLink.appendChild(linkText);
            newLink.title = pages[i].title;
            newLink.href = "https: //en.wikipedia.org/?curid=" + pages[i].pageid;
        };
    }
    connect.send();
}

// Alternative Way to create the wikiAPI() function
/* function wikiAPI() {
var parentDiv = document.getElementById('wiki');
removeResults(parentDiv)
var searchTerm = document.getElementById('searchTerm').value;
var connect = new XMLHttpRequest();
var url = "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=20&gsrsearch=" + searchTerm;

connect.open('GET', url);

connect.onload = function() {
    var wikiObject = JSON.parse(this.response);
    var pages = wikiObject.query.pages;
    for (i in pages) {
        // basic function
        // var newDiv = document.createElement("div");
        // newDiv.setAttribute('class', 'row h4');
        // document.getElementById("wiki").appendChild(newDiv);
        // newDiv.innerText = pages[i].title;

        // super challenge
        var pageURL = "https: //en.wikipedia.org/?curid="
        var newAnchor = document.createElement("a");
        newAnchor.href = pageURL + pages[i].pageid; //setAttribute('href', pageURL+page[i].pageid);
        newAnchor.className = 'd-block'; //setAttribute('class', 'd-block');
        newAnchor.innerText = pages[i].title;
        document.getElementById("wiki").appendChild(newAnchor);
    };
}
connect.send();
}*/