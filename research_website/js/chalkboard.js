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
    if (inputValue % 2 == 0) {
        alert(inputValue + " is an even number.")
    } else {
        alert(inputValue + " is an odd number.")
    }
}