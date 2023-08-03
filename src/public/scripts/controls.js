export function addControls() {
    addSortedButtonDate();
    addSortedButtonPlace();
    addSortedButtonTemp();
}

export function newGridElement(weather) {
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

export function addLoader() {
    const grid = document.getElementsByClassName("grid")[0];

    const loader = document.createElement("span");
    loader.classList.add('loader');

    grid.appendChild(loader);
}

export function addTotals(length) {
    var totalsInPage = document.getElementsByClassName("grid-total")[0];

    if (totalsInPage) {
        totalsInPage.parentNode.removeChild(totalsInPage)
    }

    const gridHeader = document.getElementsByClassName("grid-header")[0];

    const total = document.createElement("div");
    total.classList.add('grid-total');
    total.textContent = "Total: " + length;

    gridHeader.appendChild(total);
}

export function addListFilter(filterList) {
    filterDestroy();

    const gridFilter = document.getElementsByClassName("grid-header")[0];

    const filter = document.createElement("div");
    filter.classList.add('grid-filter-list');

    const itemFilter = document.createElement("div")
    itemFilter.classList.add('grid-filter-item');
    itemFilter.textContent = filterList[0].Lable;

    filter.appendChild(addResetFilter());
    filter.appendChild(itemFilter);
    gridFilter.appendChild(filter);
}

function addResetFilter() {
    const itemFilter = document.createElement("div")
    itemFilter.classList.add('grid-filter-reset');
    itemFilter.textContent = "Сбросить";
    return itemFilter;
}

export function filterDestroy() {
    var filterInPage = document.getElementsByClassName("grid-filter-list")[0];

    if (filterInPage) {
        filterInPage.parentNode.removeChild(filterInPage);
    }
}

export function clearGrid() {
    const grid = document.getElementsByClassName("grid")[0];
    var child = grid.lastElementChild;
    while (child) {
        if (child.classList.contains('grid-header')) {
            break;
        }

        grid.removeChild(child);
        child = grid.lastElementChild;
    }
}

export function changeDateControls() {
    const value = document.getElementsByClassName("sort-date")[0];

    let result;

    value.style.getPropertyValue("transform") ? (value.style.transform = "", result = true) :
        (value.style.transform = "rotate(180deg)", result = false);
    return result;
}

export function changePlaceControls() {
    const value = document.getElementsByClassName("sort-place")[0];

    let result;

    value.style.getPropertyValue("transform") ? (value.style.transform = "", result = true) :
        (value.style.transform = "rotate(180deg)", result = false);
    return result;
}

export function changeTempControls() {
    const value = document.getElementsByClassName("sort-temp")[0];

    let result;

    value.style.getPropertyValue("transform") ? (value.style.transform = "", result = true) :
        (value.style.transform = "rotate(180deg)", result = false);
    return result;
}


function addSortedButtonDate() {
    var dateSort = document.getElementsByClassName("sort-date")[0];

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/assets/sort.svg');
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var svgContent = xhr.responseText;
            dateSort.innerHTML = svgContent;
        }
    };
}

function addSortedButtonPlace() {
    var dateSort = document.getElementsByClassName("sort-place")[0];

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/assets/place.svg');
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var svgContent = xhr.responseText;
            dateSort.innerHTML = svgContent;
        }
    };
}

function addSortedButtonTemp() {
    var dateSort = document.getElementsByClassName("sort-temp")[0];

    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/assets/temp.svg');
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var svgContent = xhr.responseText;
            dateSort.innerHTML = svgContent;
        }
    };
}