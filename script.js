function formDate(e) {
    let keyDate = document.formDate.date;
    let elem = keyDate.value;
    let cDate = new Date(elem);
    let year = cDate.getFullYear();
    let month = cDate.getMonth() + 1;
    let day = cDate.getDate();
    let url = "https://ip-2-165.unn.ru:3389/cadi/CADIDATA/"+ year + "/0" + month+ "/0" + day+ "/200709121500.png";
    return document.getElementById("png").src = url;
}

let printButton = document.formDate.print;
printButton.addEventListener("click", formDate);

function getText() {
    let request = new XMLHttpRequest();

    request.open('GET', "https://ip-2-165.unn.ru:3389/cadi/CADIDATA/2020/07/09/filenames.txt", true);
    request.send(null);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            let type = request.getResponseHeader('Content-Type');
            if (type.indexOf("text") !== 1) {
                return request.responseText;
            }
        }
    }
}

function populateTables() {

    let outer_text = getText();
    /*outer_text = outer_text.split('\n');*/
    console.log(outer_text);
    /*let text = document.getElementById("txt").textContent = outer_text;*/
}

populateTables();

/*
var url = 'https://ip-2-165.unn.ru:3389/cadi/CADIDATA/2020/07/09/filenames.txt';
var storedText;

fetch(url)
    .then(function(response) {
        response.text().then(function(text) {
            storedText = text;
            done();
        });
    });

function done() {
    /!*document.getElementById('txt').textContent = storedText;*!/
}*/
