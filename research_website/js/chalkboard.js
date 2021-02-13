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
    selectedElement.innerText = "The original array is " + arrayName + ", and I sorted it alphabetically. The last item of the sorted array is " + arrayName[arrayName.length - 1];
}

function parentFunction() {
    let a = 1;

    function childFunction() {
        var b = a + 2;
        return b;
    };
    return childFunction();
}