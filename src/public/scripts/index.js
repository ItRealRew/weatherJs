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
const filteredWeathers = new Array();

const filter = new Array();

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

    var sorted = filtedByClody(weathers);

    clearGrid();
    for (let i = 0; i < sorted.length; i++) {
        newGridElement(sorted[i]);
    }

    addTotals(sorted.length);

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

    var sorted = filtedByNotClody(weathers);

    clearGrid();
    for (let i = 0; i < sorted.length; i++) {
        newGridElement(sorted[i]);
    }

    addTotals(sorted.length);
}

function filterBySunny() {
    clearGrid();
    addLoader();

    var sorted = filtedBySunny(weathers);

    clearGrid();
    for (let i = 0; i < sorted.length; i++) {
        newGridElement(sorted[i]);
    }

    addTotals(sorted.length);
}

function filterByNotSunny() {
    clearGrid();
    addLoader();

    var sorted = filtedByNotSunny(weathers);

    clearGrid();
    for (let i = 0; i < sorted.length; i++) {
        newGridElement(sorted[i]);
    }

    addTotals(sorted.length);
}

function resetFilter() {
    filterDestroy();
}

function addNew() {
    const weather = addNewElem();

    newGridElement(weather);
    weathers.push(weather);
}