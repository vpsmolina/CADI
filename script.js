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
    pngUrl = "./cadi/CADIDATA/"+ year + "/0" + month+ "/0" + day+ "/";
    /*return document.getElementById("png").src = url;*/
    let url = "img/"+ year + "/" + month+ "/" + day+ "/filenames.txt";

    fetch(url)
        .then(function(response) {
            response.text().then(function(text) {
                storedText = text.split('\n');
                done();
            });
        });
}
let printButton = document.formDate.print;
printButton.addEventListener("click", formDate);

let list = {};
function done() {
    storedText.forEach((item, index) => {
        index = item[6] + item[7] + ":" + item[8] + item[9] + ":" + item[10] + item[11];
        list[index] = item;
        let url = pngUrl + item;
        console.log(url);
        /*document.getElementById("png").src = url;*/
        let result = index.link(url);
        document.getElementsByClassName('aside-list')[0].innerHTML += result;
    });
}

/*const latest = "https://ip-2-165.unn.ru:3389/cadi/latest.png";*/
const latest = "./cadi/latest.png";

const xhr = new XMLHttpRequest();

xhr.open('GET', latest);

xhr.send();

document.getElementById("png").src = latest;
