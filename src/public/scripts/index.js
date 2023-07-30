const API_URL = "http://localhost:3000/api/";

document.addEventListener('DOMContentLoaded', function () {
    fetch(API_URL + 'getdata')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Ошибка загрузки данных');
            }
        })
        .then(data => {
            for (let i = 0; i < data.length; i++) {
                newGridElement(data[i])
            }
        })
        .catch(error => {
            console.error(error);
        });
});


function newGridElement(weather) {
    const parentDiv = document.getElementsByClassName("grid")[0];

    const newEl = document.createElement("div");

    const DateDiv = document.createElement("div");
    DateDiv.textContent = weather.Date;

    const PlaceDiv = document.createElement("div");
    PlaceDiv.textContent = weather.Place;

    const TemperatureDiv = document.createElement("div");
    TemperatureDiv.textContent = weather.Temperature;

    const CloudСoverDiv = document.createElement("div");
    CloudСoverDiv.textContent = weather.Cloud;

    const SunshineDiv = document.createElement("div");
    SunshineDiv.textContent = weather.Sunshine;

    const HumidityDiv = document.createElement("div");
    HumidityDiv.textContent = weather.Humidity;

    const WindDiv = document.createElement("div");
    WindDiv.textContent = weather.Wind;

    const CycloneDiv = document.createElement("div");
    CycloneDiv.textContent = weather.Cyclone;

    const AntiCycloneDiv = document.createElement("div");
    AntiCycloneDiv.textContent = weather.AntiCyclone;

    const AuthorDiv = document.createElement("div");
    AuthorDiv.textContent = weather.Author;

    newEl.appendChild(DateDiv);
    newEl.appendChild(PlaceDiv);
    newEl.appendChild(TemperatureDiv);
    newEl.appendChild(CloudСoverDiv);
    newEl.appendChild(SunshineDiv);
    newEl.appendChild(HumidityDiv);
    newEl.appendChild(WindDiv);
    newEl.appendChild(CycloneDiv);
    newEl.appendChild(AntiCycloneDiv);
    newEl.appendChild(AuthorDiv);

    newEl.classList.add("grid-body");
    newEl.classList.add("transition");
    newEl.classList.add("grid-rows");

    parentDiv.appendChild(newEl);
}

function AddNew() {
    var weather = {
        Date: getDataNow(),
        Place: document.getElementById("place").value,
        Temperature: parseInt(document.getElementById("temperature").value),
        Cloud: document.getElementById("cloud").checked,
        Sunshine: document.getElementById("sunshine").checked,
        Humidity: parseInt(document.getElementById("humidity").value),
        Wind: document.getElementById("wind").value,
        Cyclone: document.getElementById("cyclone").checked,
        AntiCyclone: document.getElementById("anticyclone").checked,
        Author: document.getElementById("author").value,
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", API_URL + "create");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                newGridElement(weather);
            } else {
                console.error(xhr.statusText);
            }
        }
    };
    xhr.send(JSON.stringify(weather));
}

function getDataNow() {
    var dateNow = new Date();
    dateNow = String(dateNow.getMonth() + 1).padStart(2, '0') +
        '/' + String(dateNow.getDate()).padStart(2, '0') +
        '/' + dateNow.getFullYear() +
        ' ' + String(dateNow.getHours() + ':' + dateNow.getMinutes());
    return dateNow.toString();
}