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
    xmlDOM = sourceXML;
    for (i = 0; i < textList.length; i++) {
        // create one row per text
        var tr = document.createElement('tr');
        tr.className = 'ochreTableRows';
        // set unique attributes per row
        tr.id = 'row_' + i;

        // tr.setAttribute('class', 'ochreTableRows');
        // tr.setAttribute('id', 'row_' + i);
        document.getElementById('ochreTableBody').appendChild(tr);

        // populate the cells in the row
        var td = document.createElement('td');
        td.className = 'Name';
        td.id = 'td_row_' + i;

        // create an anchor link for each text name
        var button = document.createElement('button');
        var textUUID = textList[i].attributes[1].nodeValue;
        button.id = textUUID;
        // onclick passes the text UUID and the xmlDOM to the next function
        button.setAttribute('onclick', 'photoBlock(this.id, xmlDOM)');
        button.setAttribute('target', '_blank');
        button.className = 'textSelection btn btn-link';
        var textLabel = textList[i].childNodes[0].childNodes[0].innerHTML;
        button.textContent = textLabel;

        // td.setAttribute('id', 'td_name_' + i);
        // td.textContent = textList[i].children[0].children[0].innerHTML;

        document.getElementById('row_' + i).appendChild(td);
        document.getElementById('td_row_' + i).appendChild(button);
        var td2 = document.createElement('td');
        td2.className = 'Description';
        // td2.setAttribute('id', 'td_desc_' + i);

        var textDescription = textList[i].childNodes[3].innerHTML;
        td2.textContent = textDescription;
        // td2.textContent = textList[i].children[3].innerHTML;
        document.getElementById('row_' + i).appendChild(td2);
    }
}

function photoBlock(textUUID, xmlDOM) {
    //console.log(xmlDOM);
    var imageText = xmlDOM.getElementsByTagName('text');
    document.getElementById('imgBlock').innerHTML = "";
    //console.log(imageText);
    var imageUUIDs = [];
    for (var i = 0; i < imageText.length; i++) {
        if (imageText[i].attributes[1].nodeValue === textUUID) {
            //console.log(imageText[i]);
            var linksList = imageText[i].getElementsByTagName('resource');

            //console.log(linksList);
            for (var n = 0; n < linksList.length; n++) {
                var attUUID = linksList[n].attributes.uuid.nodeValue;
                var imageUUID = attUUID;
                imageUUIDs.push(imageUUID);
            };
        };
    };
    //console.log(imageUUIDs);
    for (var i = 0; i < imageUUIDs.length; i++) {
        var a = document.createElement('a');
        a.setAttribute('href', 'http://ochre.lib.uchicago.edu/ochre?uuid=' + imageUUIDs[i] + '&image');
        a.target = "_blank";
        a.id = 'link_' + i;
        document.getElementById('imgBlock').appendChild(a);
        var img = document.createElement('img');
        img.setAttribute('src', 'http://ochre.lib.uchicago.edu/ochre?uuid=' + imageUUIDs[i] + '&preview');
        img.id = 'image_' + i;
        document.getElementById('link_' + i).appendChild(img);
        var cap = document.createElement('figcaption');
        cap.innerHTML = linksList[i].innerHTML;
        document.getElementById('link_' + i).appendChild(cap);
    }
}