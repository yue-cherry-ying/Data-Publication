// Define parent element
var parentElement = document.getElementById('ochreTableBody');
// Define API url
var url = "https://ochre.lib.uchicago.edu/ochre?uuid=accd571b-bae3-4d42-93d9-58b65ec79300";

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
    document.getElementById('projectTitle').innerText = sourceXML.getElementsByTagName('metadata')[0].children[1].innerHTML;
    document.getElementById('setTitle').innerText = sourceXML.getElementsByTagName('set')[0].children[3].children[0].innerHTML;
    document.getElementById('setDescription').innerText = sourceXML.getElementsByTagName('set')[0].children[4].innerHTML;
    var licenseText = document.getElementById('license');
    licenseText.innerText = sourceXML.getElementsByTagName('availability')[0].children[0].innerHTML;
    licenseText.setAttribute('href', sourceXML.getElementsByTagName('availability')[0].children[0].attributes[0].nodeValue);

    // Select, parse, and display the data
    console.log(sourceXML); // raw document response we get from the API
    var textList = sourceXML.getElementsByTagName('text');
    console.log(textList);
    var linkList = sourceXML.getElementsByTagName('links');
    console.log(linkList);
    for (i = 0; i < textList.length; i++) {
        // create one row per text
        var tr = document.createElement('tr');
        tr.setAttribute('class', 'ochreTableRows');
        tr.setAttribute('id', 'row_' + i);
        document.getElementById('ochreTableBody').appendChild(tr);
        // populate the cells in the row
        var td = document.createElement('td');
        td.setAttribute('id', 'td_name_' + i);
        td.textContent = textList[i].children[0].children[0].innerHTML;
        // var imageDiv = document.createElement('div');
        // imageDiv.addEventListener('click', showImage(i, linkList));
        // imageDiv.textContent = textList[i].children[0].innerHTML;
        // td.appendChild(imageDiv);
        document.getElementById('row_' + i).appendChild(td);
        var td2 = document.createElement('td');
        td2.setAttribute('id', 'td_desc_' + i);
        td2.textContent = textList[i].children[3].innerHTML;
        document.getElementById('row_' + i).appendChild(td2);


        // var links = textList[i].children[4];
        // for (i = 0; i < links.length; i++) {
        //     var td3 = document.createElement('td');
        //     td3.setAttribute('id', 'td_photo_' + i);
        //     var a = document.createElement('a');
        //     var url = "http://ochre.lib.uchicago.edu/ochre?uuid=" + links.children[i].attributes[1].nodeValue + "&preview";
        //     a.setAttribute('href', XMLrequest(url));
        //     td3.textContent = links.children[i].innerHTML;
        //     document.getElementById('row_' + i).appendChild(a);
        //     document.getElementById('row_' + i).appendChild(td3);
        // }
    }
}

function showImage(i, linkList) {
    var array = [];
    for (j = 0; j < linkList[i].children.length; j++) {
        var resource = listList[i].children[j].outerHTML;
        var parResource = new window.DOMParser().parseFromString(resource, 'text/xml');
        var uuid = parResource.getElementsByTagName('resource')[0].attributes[1].nodeValue;
        var url = "http://ochre.lib.uchicago.edu/ochre?uuid=" + uuid + "&preview";
        array.push(url);
    };
    var display = document.getElementById('image display');
    for (j = 0; j < array.length; j++) {
        var img = document.createElement('img');
        img.setAttribute('src', array[j]);
        display.appendChild(img);
    }
}