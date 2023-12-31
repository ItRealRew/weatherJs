import {
    newGridElement,
    addControls,
    addLoader,
    clearGrid,
    addTotals,
    addListFilter,
    filterDestroy,
    notResuilt,
    addPagination,
    paginationDestroy,
    changeMax,
    changeMin,
    changeSortButton,
    initialTemp,
    initialHum,
    initialWind
} from './controls.js';

import {
    getData,
    addNewElem
} from './requests.js';

import {
    AddChart
} from './chart.js';

import {
    sortedDateAsc,
    sortedDateDes,
    sortedPlaceAsc,
    sortedPlaceDes,
    sortedTempAsc,
    sortedTempDes,
    sortedHumAsc,
    sortedHumDes,
    sortedWindAsc,
    sortedWindDes
} from './utils/sorting.js';

import {
    filtedByClody,
    filtedByNotClody,
    filtedBySunny,
    filtedByNotSunny,
    filtedByTemp,
    filtedByHum,
    filtedByWind,
    filtedByCyclone,
    filtedByAntyCyclone,
    searchByAuthor,
    searchByPlace,
    searchByDate
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

    if (event.target.classList.contains('sort-wind') ||
        event.target.classList.contains('sortWind') ||
        event.target.classList.contains('grid-wind-sort')) {
        sortWind();
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

    if (event.target.id === "WindFilter") {
        filterByWind();
    }

    if (event.target.id === "SortCyclone") {
        filterCyclone();
    }

    if (event.target.id === "SortAntyCyclone") {
        filterAntyCyclone();
    }

    if (event.target.id === "AuthorSearch") {
        filterAuthor();
    }

    if (event.target.id === "PlaceSearch") {
        filterPlace();
    }

    if (event.target.id === "DateSearch") {
        filterDate();
    }

    if (event.target.classList.contains('grid-filter-reset')) {
        resetFilter();
    }

    if (event.target.classList.contains('modal-btn')) {
        addNew();
    }

    if (event.target.classList.contains('download-link') ||
        event.target.id === "Download") {
        downloadData();
    }

    if (event.target.classList.contains('chart') ||
        event.target.id === "Chart") {
        AddChart("Количество записей в день", getWeathers());
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
        changeMax(event.target.value, "tempMaxResult");
    }

    if (event.target.id === "tempMin") {
        changeMin(event.target.value, "tempMinResult");
    }

    if (event.target.id === "humMax") {
        changeMax(event.target.value, "humMaxResult");
    }

    if (event.target.id === "humMin") {
        changeMin(event.target.value, "humMinResult");
    }

    if (event.target.id === "windMax") {
        changeMax(event.target.value, "windMaxResult");
    }

    if (event.target.id === "windMin") {
        changeMin(event.target.value, "windMinResult");
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

    const minWind = weathers.reduce((min, weather) => {
        return Math.min(min, weather.Wind);
    }, weathers[0].Wind);

    const maxWind = weathers.reduce((max, weather) => {
        return Math.max(max, weather.Wind);
    }, weathers[0].Wind);

    initialWind(minWind, maxWind);
}

function sortDate() {
    clearGrid();
    addLoader();

    var sorted;

    changeSortButton("sort-date") ?
        sorted = sortedDateAsc(getWeathers()) :
        sorted = sortedDateDes(getWeathers());

    clearGrid();
    displayDate(sorted);
}

function sortPlace() {
    clearGrid();
    addLoader();

    var sorted;

    changeSortButton("sort-place") ?
        sorted = sortedPlaceDes(getWeathers()) :
        sorted = sortedPlaceAsc(getWeathers());

    clearGrid();
    displayDate(sorted);
}

function sortTemp() {
    clearGrid();
    addLoader();

    var sorted;

    changeSortButton("sort-temp") ?
        sorted = sortedTempDes(getWeathers()) :
        sorted = sortedTempAsc(getWeathers());

    clearGrid();
    displayDate(sorted);
}

function sortHum() {
    clearGrid();
    addLoader();

    var sorted;

    changeSortButton("sort-hum") ?
        sorted = sortedHumDes(getWeathers()) :
        sorted = sortedHumAsc(getWeathers());

    clearGrid();
    displayDate(sorted);
}

function sortWind() {
    clearGrid();
    addLoader();

    var sorted;

    changeSortButton("sort-wind") ?
        sorted = sortedWindDes(getWeathers()) :
        sorted = sortedWindAsc(getWeathers());

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

function filterByWind() {
    clearGrid();
    addLoader();

    currentPage = 1;
    filteredWeathers = filtedByWind(getWeathers(), getMinWind(), getMaxWind());

    clearGrid();
    displayDate(filteredWeathers);

    addTotals(filteredWeathers.length);

    toListFilter("Wind", "Скорость ветра От " + getMinWind() + ", До " + getMaxWind());
}

function filterCyclone() {
    clearGrid();
    addLoader();

    currentPage = 1;
    filteredWeathers = filtedByCyclone(getWeathers());

    clearGrid();
    displayDate(filteredWeathers);

    addTotals(filteredWeathers.length);

    toListFilter("Cyclone", "Циклон");
}

function filterAntyCyclone() {
    clearGrid();
    addLoader();

    currentPage = 1;
    filteredWeathers = filtedByAntyCyclone(getWeathers());

    clearGrid();
    displayDate(filteredWeathers);

    addTotals(filteredWeathers.length);

    toListFilter("AntyCyclone", "Антициклон");
}


function filterAuthor() {
    clearGrid();
    addLoader();

    currentPage = 1;
    const searchString = getAuthorSearchStr();

    filteredWeathers = searchByAuthor(getWeathers(), searchString);

    clearGrid();
    displayDate(filteredWeathers);

    addTotals(filteredWeathers.length);

    toListFilter("Author", "Автор: " + searchString);
}

function filterPlace() {
    clearGrid();
    addLoader();

    currentPage = 1;
    const searchString = getPlaceSearchStr();

    filteredWeathers = searchByPlace(getWeathers(), searchString);

    clearGrid();
    displayDate(filteredWeathers);

    addTotals(filteredWeathers.length);

    toListFilter("Place", "Город: " + searchString);
}

function filterDate() {
    clearGrid();
    addLoader();

    currentPage = 1;
    let start = getStartDate();
    let finish = getFinishDate();

    const startDate = start === "" ? (new Date(), start = 'Сегодня') : new Date(start);
    const finishDate = finish === "" ? (new Date(), finish = 'Сегодня') : new Date(finish);


    filteredWeathers = searchByDate(getWeathers(), startDate, finishDate);

    clearGrid();
    displayDate(filteredWeathers);

    addTotals(filteredWeathers.length);

    toListFilter("Date", "Сортировка по дате: от " + start + ", до " + finish);
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

function getMaxWind() {
    return document.getElementById("windMaxResult").textContent;
}

function getMinWind() {
    return document.getElementById("windMinResult").textContent;
}

function getAuthorSearchStr() {
    return document.getElementById("AuthorSearchStr").value;
}

function getPlaceSearchStr() {
    return document.getElementById("PlaceSearchStr").value;
}

function getStartDate() {
    return document.getElementById("DateStart").value;
}

function getFinishDate() {
    return document.getElementById("DateFinish").value;
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

function downloadData() {
    const blob = new Blob([JSON.stringify(getWeathers())], {
        type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.json';
    link.click();
}