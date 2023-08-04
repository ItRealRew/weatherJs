import {
    newGridElement,
    addControls,
    changeDateControls,
    changePlaceControls,
    changeTempControls,
    addLoader,
    clearGrid,
    addTotals,
    addListFilter,
    filterDestroy
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
    sortedTempDes
} from './utils/sorting.js';

import {
    filtedByClody,
    filtedByNotClody,
    filtedBySunny,
    filtedByNotSunny
} from './utils/filtering.js';

const weathers = new Array();

let filteredWeathers = new Array();
let filter = new Array();

document.addEventListener('DOMContentLoaded', async function () {
    addControls();

    await getData().then(data => {
        for (let i = 0; i < data.length; i++) {
            newGridElement(data[i])
            weathers.push(data[i]);
        }
    });

    addTotals(weathers.length);
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

    if (event.target.classList.contains('grid-filter-reset')) {
        resetFilter();
    }

    if (event.target.classList.contains('modal-btn')) {
        addNew();
    }
});

function getWeathers() {
    return filteredWeathers.length === 0 ? weathers : filteredWeathers;
}

function sortDate() {
    clearGrid();
    addLoader();

    var sorted;

    changeDateControls() ?
        sorted = sortedDateAsc(getWeathers()) :
        sorted = sortedDateDes(getWeathers());

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
        sorted = sortedPlaceDes(getWeathers()) :
        sorted = sortedPlaceAsc(getWeathers());

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
        sorted = sortedTempDes(getWeathers()) :
        sorted = sortedTempAsc(getWeathers());

    clearGrid();
    for (let i = 0; i < sorted.length; i++) {
        newGridElement(sorted[i]);
    }
}

function filterByClody() {
    clearGrid();
    addLoader();

    filteredWeathers = filtedByClody(getWeathers());

    clearGrid();
    for (let i = 0; i < filteredWeathers.length; i++) {
        newGridElement(filteredWeathers[i]);
    }

    addTotals(filteredWeathers.length);

    var clodyFilter = {
        Name: "Clody",
        Lable: "Облачно"
    }

    filter.push(clodyFilter);
    addListFilter(filter);
}

function filterByNotClody() {
    clearGrid();
    addLoader();

    filteredWeathers = filtedByNotClody(getWeathers());

    clearGrid();
    for (let i = 0; i < filteredWeathers.length; i++) {
        newGridElement(filteredWeathers[i]);
    }

    addTotals(filteredWeathers.length);

    var NotClodyFilter = {
        Name: "NoClody",
        Lable: "Не облачно"
    }

    filter.push(NotClodyFilter);
    addListFilter(filter);
}

function filterBySunny() {
    clearGrid();
    addLoader();

    filteredWeathers = filtedBySunny(getWeathers());

    clearGrid();
    for (let i = 0; i < filteredWeathers.length; i++) {
        newGridElement(filteredWeathers[i]);
    }

    addTotals(filteredWeathers.length);

    var sunnyFilter = {
        Name: "Sunny",
        Lable: "Солнечно"
    }

    filter.push(sunnyFilter);
    addListFilter(filter);
}

function filterByNotSunny() {
    clearGrid();
    addLoader();

    filteredWeathers = filtedByNotSunny(getWeathers());

    clearGrid();
    for (let i = 0; i < filteredWeathers.length; i++) {
        newGridElement(filteredWeathers[i]);
    }

    addTotals(filteredWeathers.length);

    var notSunnyFilter = {
        Name: "NotSunny",
        Lable: "Пасмурдно"
    }

    filter.push(notSunnyFilter);
    addListFilter(filter);
}

function resetFilter() {
    clearGrid();
    addLoader();
    filteredWeathers.splice(0, filteredWeathers.length);

    filterDestroy();

    clearGrid();
    for (let i = 0; i < weathers.length; i++) {
        newGridElement(weathers[i]);
    }

    addTotals(weathers.length);
}

function addNew() {
    const weather = addNewElem();

    newGridElement(weather);
    weathers.push(weather);
}