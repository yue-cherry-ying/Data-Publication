// Define parent element
var parentElement = document.getElementById('ochreTableBody');
// Define API url
var url = "http://ochre.lib.uchicago.edu/ochre?uuid=accd571b-bae3-4d42-93d9-58b65ec79300";

// First function, called on <body>
function loadXML() {
    // Chain the next function to create the XHR
    XMLrequest(url);
    console.log('loadXML -- ok');
}

function XMLrequest(link) {
    // Make the API call and send the results to the next function
    var connect = new XMLHttpRequest();
    connect.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { // state 4 and 200 means we have the green light to go ahead
            listTexts(this.responseXML);
        };
    };
    connect.open('GET', link, true);
    connect.send();
    console.log('XML request -- ok');
}

function listTexts(sourceXML) {
    // Select, parse, and display the data
    console.log(sourceXML); // raw document response we get from the API
    //     var textList = sourceXML.getElementsByTagName('text');
    //     console.log(textList)
}