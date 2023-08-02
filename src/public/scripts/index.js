import {
    addControls,
    changeDateControls,
    changePlaceControls,
    changeTempControls,
    addLoader,
    clearGrid
} from './controls.js';

import {
    getData
} from './requests.js';

import {
    sortedDateAsc,
    sortedDateDes,
    sortedPlaceAsc,
    sortedPlaceDes,
    sortedTempAsc,
    sortedTempDes
} from './utils/sorting.js';

import {
    filtedByClody,
    filtedByNotClody,
    filtedBySunny,
    filtedByNotSunny
} from './utils/filtering.js';

const API_URL = "http://localhost:3000/api/";
const weathers = new Array();

document.addEventListener('DOMContentLoaded', function () {
    addControls();

    getData().then(data => {
        for (let i = 0; i < data.length; i++) {
            newGridElement(data[i])
            weathers.push(data[i]);
        }
    });
});

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('sort-date') ||
        event.target.classList.contains('sortDate') ||
        event.target.classList.contains('grid-date-sort')) {
        sortDate();
    }

    if (event.target.classList.contains('sort-place') ||
        event.target.classList.contains('sortPlace') ||
        event.target.classList.contains('grid-place-sort')) {
        sortPlace();
    }

    if (event.target.classList.contains('sort-temp') ||
        event.target.classList.contains('sortTemp') ||
        event.target.classList.contains('grid-temp-sort')) {
        sortTemp();
    }

    if (event.target.id === "Clody") {
        filterByClody();
    }

    if (event.target.id === "NotClody") {
        filterByNotClody();
    }

    if (event.target.id === "Sunny") {
        filterBySunny();
    }

    if (event.target.id === "NotSunny") {
        filterByNotSunny();
    }

    if (event.target.classList.contains('modal-btn')) {
        AddNew();
    }
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

function sortDate() {
    clearGrid();
    addLoader();

    var sorted;

    changeDateControls() ?
        sorted = sortedDateAsc(weathers) :
        sorted = sortedDateDes(weathers);

    clearGrid();
    for (let i = 0; i < sorted.length; i++) {
        newGridElement(sorted[i]);
    }
}

function sortPlace() {
    clearGrid();
    addLoader();

    var sorted;

    changePlaceControls() ?
        sorted = sortedPlaceDes(weathers) :
        sorted = sortedPlaceAsc(weathers);

    clearGrid();
    for (let i = 0; i < sorted.length; i++) {
        newGridElement(sorted[i]);
    }
}

function sortTemp() {
    clearGrid();
    addLoader();

    var sorted;

    changeTempControls() ?
        sorted = sortedTempDes(weathers) :
        sorted = sortedTempAsc(weathers);

    clearGrid();
    for (let i = 0; i < sorted.length; i++) {
        newGridElement(sorted[i]);
    }
}

function filterByClody() {
    clearGrid();
    addLoader();

    var sorted;

    sorted = filtedByClody(weathers);

    clearGrid();
    for (let i = 0; i < sorted.length; i++) {
        newGridElement(sorted[i]);
    }
}

function filterByNotClody() {
    clearGrid();
    addLoader();

    var sorted;

    sorted = filtedByNotClody(weathers);

    clearGrid();
    for (let i = 0; i < sorted.length; i++) {
        newGridElement(sorted[i]);
    }
}

function filterBySunny() {
    clearGrid();
    addLoader();

    var sorted;

    sorted = filtedBySunny(weathers);

    clearGrid();
    for (let i = 0; i < sorted.length; i++) {
        newGridElement(sorted[i]);
    }
}

function filterByNotSunny() {
    clearGrid();
    addLoader();

    var sorted;

    sorted = filtedByNotSunny(weathers);

    clearGrid();
    for (let i = 0; i < sorted.length; i++) {
        newGridElement(sorted[i]);
    }
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
                weathers.push(weather);
            } else {
                console.error(xhr.statusText);
            }
        }
    };
    xhr.send(JSON.stringify(weather));
}

function getDataNow() {
    var dateNow = new Date();
    dateNow = String(dateNow.getDate()).padStart(2, '0') +
        '/' + String(dateNow.getMonth() + 1).padStart(2, '0') +
        '/' + dateNow.getFullYear() +
        ' ' + String(dateNow.getHours() + ':' + dateNow.getMinutes());
    return dateNow.toString();
}