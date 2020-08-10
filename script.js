let storedText = [];
function formDate() {
    let keyDate = document.formDate.date;
    let elem = keyDate.value;
    let cDate = new Date(elem);
    let year = cDate.getFullYear();
    let month = cDate.getMonth() + 1;
    let day = cDate.getDate();
/*    let url = "https://ip-2-165.unn.ru:3389/cadi/CADIDATA/"+ year + "/0" + month+ "/0" + day+ "/200709121500.png";
    return document.getElementById("png").src = url;*/
    let url = "img/"+ year + "/0" + month+ "/0" + day+ "/filenames.txt";

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


function done() {
    document.getElementById('txt').innerHTML = storedText;
/*    for (let key of storedText) {
        const url = "img/2020/07/09/"+ key;
        let png = document.getElementById("png").src = url;
        let result = key.link(png);
        document.getElementById('txt').innerHTML = result;
    }*/
}


