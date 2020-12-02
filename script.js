let storedText = [];
let pngUrl;
let list = [];
let listAside = [];
let prev;
let asideList;
let asideP = document.getElementById("aside");

/*const latest = "./latest.png";
const xhr = new XMLHttpRequest();
xhr.open('GET', latest);
xhr.send();
document.getElementById("png").src = latest;*/

document.formDate.print.addEventListener("click", checkList);

document.getElementsByClassName('prev')[0].addEventListener("click", function () {
    prev = document.getElementById("png").src;
    /*console.log(asideList);*/
    listAside.forEach((element, index, arr) => {
        if (element == prev.slice(-16) && index !== 0) {
            document.getElementById("png").src = pngUrl + arr[index-1];
            /*document.getElementsByClassName('aside-btn').innerHTML;*/
            let key = Object.keys(list)[Object.values(list).indexOf(element)];
            /*style.backgroundColor = "#bc1423";*/

        }
    });
});

document.getElementsByClassName('next')[0].addEventListener("click", function () {
    prev = document.getElementById("png").src;
    listAside.forEach((element, index, arr) => {
        if (element == prev.slice(-16) && index !== arr.length-1) document.getElementById("png").src = pngUrl + arr[index+1];
    });
});

function checkList() {
    if (asideList) {
        asideP.innerHTML = '';
    } formDate();
}
function formDate() {
    let keyDate = document.formDate.date;
    let elem = keyDate.value;
    let cDate = new Date(elem);
    let year = cDate.getFullYear();
    const month = (cDate.getMonth() + 1) < 10 ? `0${cDate.getMonth() + 1}` : `${cDate.getMonth() + 1}`;
    const day = (cDate.getDate()) < 10 ? `0${cDate.getDate()}` : `${cDate.getDate()}`;
    const baseUrl = `CADIDATA/${year}/${month}/${day}/`;
    pngUrl = `https://ip-2-165.unn.ru:3389/cadi/CADIDATA/${year}/${month}/${day}/`;
    /*pngUrl = `./${baseUrl}`;*/
    let url = `${baseUrl}filenames.txt`;


    fetch(url)
        .then(function(response) {
            if(response.ok) {
                response.text().then(function(text) {
                    storedText = text.split('\r\n');
                    /*storedText = text.split('\n');*/

                    done();
                });
            } else {
                console.log(`Network request for filenames.txt failed with response ${response.status}: ${response.statusText}`);
                let errFilenames = document.createElement("div");
                errFilenames.className = "err-filenames";
                errFilenames.innerHTML = `${day}.${month}.${year} данных не найдено, выберите другой день.`;
                asideP.append(errFilenames);
            }
        });
}

function done() {
    storedText.forEach((item, index, arr) => {
        if (item !== "") {
            listAside[index] = item;
            index = `${item[6]}${item[7]}:${item[8]}${item[9]}:${item[10]}${item[11]}`;
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
            
            asideP.append(asideList);
        }
    });
}

function startPage() {
    document.location.reload();
}
