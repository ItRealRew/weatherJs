import {
    newGridElement,
    addControls,
    changeDateControls,
    changePlaceControls,
    changeTempControls,
    changeHumControls,
    addLoader,
    clearGrid,
    addTotals,
    addListFilter,
    filterDestroy,
    notResuilt,
    addPagination,
    paginationDestroy,
    changeTempMax,
    changeTempMin,
    changeHumMax,
    changeHumMin,
    initialTemp,
    initialHum
} from './controls.js';

import {
    getData,
    addNewElem
} from './requests.js';

import {
    sortedDateAsc,
    sortedDateDes,
    sortedPlaceAsc,
    sortedPlaceDes,
    sortedTempAsc,
    sortedTempDes,
    sortedHumAsc,
    sortedHumDes
} from './utils/sorting.js';

import {
    filtedByClody,
    filtedByNotClody,
    filtedBySunny,
    filtedByNotSunny,
    filtedByTemp,
    filtedByHum
} from './utils/filtering.js';

const weathers = new Array();

var filteredWeathers = new Array();
var displayArr = new Array();

var filter = new Array();

const pageSize = 2;
var currentPage = 1;


document.addEventListener('DOMContentLoaded', async function () {
    addControls();

    await getData().then(data => {
        for (let i = 0; i < data.length; i++) {
            weathers.push(data[i])
        }

        displayArr = weathers.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    });

    for (let i = 0; i < displayArr.length; i++) {
        newGridElement(displayArr[i]);
    }

    addPagination(Math.ceil(weathers.length / pageSize), currentPage);
    addTotals(weathers.length);

    filterInitialization();
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

    if (event.target.classList.contains('sort-hum') ||
        event.target.classList.contains('sortHum') ||
        event.target.classList.contains('grid-hum-sort')) {
        sortHum();
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

    if (event.target.id === "TempFilter") {
        filterByTemp();
    }

    if (event.target.id === "HumFilter") {
        filterByHum();
    }

    if (event.target.classList.contains('grid-filter-reset')) {
        resetFilter();
    }

    if (event.target.classList.contains('modal-btn')) {
        addNew();
    }

    const pagination = document.querySelector('.pagination');
    const paginationElems = pagination.querySelectorAll('.pagination-elem');

    for (let i = 0; i < paginationElems.length; i++) {
        if (event.target === paginationElems[i]) {
            currentPage = parseInt(paginationElems[i].textContent);
            clearGrid();
            displayDate(getWeathers());
        }
    }
});

document.addEventListener('input', function (event) {
    if (event.target.id === "tempMax") {
        changeTempMax(event.target.value);
    }

    if (event.target.id === "tempMin") {
        changeTempMin(event.target.value);
    }

    if (event.target.id === "humMax") {
        changeHumMax(event.target.value);
    }

    if (event.target.id === "humMin") {
        changeHumMin(event.target.value);
    }
});

function getWeathers() {
    return filteredWeathers.length === 0 ? weathers : filteredWeathers;
}

function filterInitialization() {
    const minTemp = weathers.reduce((min, weather) => {
        return Math.min(min, weather.Temperature);
    }, weathers[0].Temperature);

    const maxTemp = weathers.reduce((max, weather) => {
        return Math.max(max, weather.Temperature);
    }, weathers[0].Temperature);

    initialTemp(minTemp, maxTemp);

    const minHum = weathers.reduce((min, weather) => {
        return Math.min(min, weather.Humidity);
    }, weathers[0].Humidity);

    const maxHum = weathers.reduce((max, weather) => {
        return Math.max(max, weather.Humidity);
    }, weathers[0].Humidity);

    initialHum(minHum, maxHum);
}

function sortDate() {
    clearGrid();
    addLoader();

    var sorted;

    changeDateControls() ?
        sorted = sortedDateAsc(getWeathers()) :
        sorted = sortedDateDes(getWeathers());

    clearGrid();
    displayDate(sorted);
}

function sortPlace() {
    clearGrid();
    addLoader();

    var sorted;

    changePlaceControls() ?
        sorted = sortedPlaceDes(getWeathers()) :
        sorted = sortedPlaceAsc(getWeathers());

    clearGrid();
    displayDate(sorted);
}

function sortTemp() {
    clearGrid();
    addLoader();

    var sorted;

    changeTempControls() ?
        sorted = sortedTempDes(getWeathers()) :
        sorted = sortedTempAsc(getWeathers());

    clearGrid();
    displayDate(sorted);
}

function sortHum() {
    clearGrid();
    addLoader();

    var sorted;

    changeHumControls() ?
        sorted = sortedHumDes(getWeathers()) :
        sorted = sortedHumAsc(getWeathers());

    clearGrid();
    displayDate(sorted);
}

function filterByClody() {
    clearGrid();
    addLoader();

    currentPage = 1;
    filteredWeathers = filtedByClody(getWeathers());

    clearGrid();
    displayDate(filteredWeathers);

    addTotals(filteredWeathers.length);

    toListFilter("Clody", "Облачно");
}

function filterByNotClody() {
    clearGrid();
    addLoader();

    currentPage = 1;
    filteredWeathers = filtedByNotClody(getWeathers());

    clearGrid();
    displayDate(filteredWeathers);

    addTotals(filteredWeathers.length);

    toListFilter("NoClody", "Не облачно");
}

function filterBySunny() {
    clearGrid();
    addLoader();

    currentPage = 1;
    filteredWeathers = filtedBySunny(getWeathers());

    clearGrid();
    displayDate(filteredWeathers);

    addTotals(filteredWeathers.length);

    toListFilter("Sunny", "Солнечно");
}

function filterByNotSunny() {
    clearGrid();
    addLoader();

    currentPage = 1;
    filteredWeathers = filtedByNotSunny(getWeathers());

    clearGrid();
    displayDate(filteredWeathers);

    addTotals(filteredWeathers.length);

    toListFilter("NotSunny", "Пасмурдно");
}

function filterByTemp() {
    clearGrid();
    addLoader();

    currentPage = 1;
    filteredWeathers = filtedByTemp(getWeathers(), getMinTemp(), getMaxTemp());

    clearGrid();
    displayDate(filteredWeathers);

    addTotals(filteredWeathers.length);

    toListFilter("Temp", "Температура От " + getMinTemp() + ", До " + getMaxTemp());
}

function filterByHum() {
    clearGrid();
    addLoader();

    currentPage = 1;
    filteredWeathers = filtedByHum(getWeathers(), getMinHum(), getMaxHum());

    clearGrid();
    displayDate(filteredWeathers);

    addTotals(filteredWeathers.length);

    toListFilter("Hum", "Влажность От " + getMinHum() + ", До " + getMaxHum());
}

function getMaxTemp() {
    return document.getElementById("tempMaxResult").textContent;
}

function getMinTemp() {
    return document.getElementById("tempMinResult").textContent;
}

function getMaxHum() {
    return document.getElementById("humMaxResult").textContent;
}

function getMinHum() {
    return document.getElementById("humMinResult").textContent;
}

function resetFilter() {
    clearGrid();
    addLoader();

    filteredWeathers = new Array();
    filter = new Array();

    filterDestroy();

    clearGrid();
    displayDate(weathers);

    addTotals(weathers.length);
}

function displayDate(gridList) {
    paginationDestroy();

    if (gridList.length === 0) {
        notResuilt();
        return
    }

    displayArr = gridList.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    for (let i = 0; i < displayArr.length; i++) {
        newGridElement(displayArr[i]);
    }

    addPagination(Math.ceil(gridList.length / pageSize), currentPage);
}

function toListFilter(nameFilter, LableFilter) {
    const elemFilter = {
        Name: nameFilter,
        Lable: LableFilter
    }

    filter.some(item => item.Name === elemFilter.Name && item.Lable === elemFilter.Lable) ?
        false : (filter.push(elemFilter), addListFilter(filter));
}

function addNew() {
    const weather = addNewElem();

    newGridElement(weather);
    weathers.push(weather);
}