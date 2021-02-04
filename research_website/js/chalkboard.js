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
    selectedElement.innerText = "Week One"
}