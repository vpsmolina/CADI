let storedText = [];
let pngUrl;
function formDate() {
    let keyDate = document.formDate.date;
    let elem = keyDate.value;
    let cDate = new Date(elem);
    let year = cDate.getFullYear();
    let month = cDate.getMonth() + 1;
    if (month < 10) month = "0" + month;
    let day = cDate.getDate();
    if (day < 10) day = "0" + day;
    /*pngUrl = "https://ip-2-165.unn.ru:3389/cadi/CADIDATA/"+ year + "/" + month+ "/" + day+ "/";*/
    pngUrl = "./CADIDATA/"+ year + "/" + month+ "/" + day+ "/";
    /*return document.getElementById("png").src = url;*/
    let url = "CADIDATA/"+ year + "/" + month+ "/" + day+ "/filenames.txt";


    fetch(url)
        .then(function(response) {
            if(response.ok) {
                response.text().then(function(text) {
                    storedText = text.split('\r\n');
                    done();
                });
            } else {
                console.log("Network request for filenames.txt failed with response" + response.status + " : " + response.statusText);
            }
        });
}
let printButton = document.formDate.print;
printButton.addEventListener("click", formDate);

let list = [];
let listAside = [];
let prev;
let asideList;
function done() {
    storedText.forEach((item, index, arr) => {
        if (item !== "") {
            listAside[index] = item;
            index = item[6] + item[7] + ":" + item[8] + item[9] + ":" + item[10] + item[11];
            list[index] = item;
            let url = pngUrl + item;

            asideList = document.createElement('button');
            asideList.className = 'aside-btn';
            asideList.innerHTML = index;
            asideList.onclick = printPng;

            function printPng(event) {
                document.getElementById("png").src = url;
                prev = event.currentTarget.previousElementSibling.innerHTML;
            }

            aside.append(asideList);
        }
    });
}

document.getElementsByClassName('prev')[0].addEventListener("click", function () {

    prev = document.getElementById("png").src;
    listAside.forEach((element, index, arr) => {
        if (element == prev.slice(-16)) {
            document.getElementById("png").src = pngUrl + arr[index-1];
        }
    });
});

document.getElementsByClassName('next')[0].addEventListener("click", function () {
    prev = document.getElementById("png").src;
    listAside.forEach((element, index, arr) => {
        if (element == prev.slice(-16)) {
            document.getElementById("png").src = pngUrl + arr[index+1];
        }
    });
});

const latest = "./latest.png";

const xhr = new XMLHttpRequest();

xhr.open('GET', latest);

xhr.send();

document.getElementById("png").src = latest;

