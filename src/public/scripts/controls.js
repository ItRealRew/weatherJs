export function addControls() {
    addButton("sort-date", '/assets/sort.svg');
    addButton("sort-place", '/assets/place.svg');
    addButton("sort-temp", '/assets/temp.svg');
    addButton("sort-hum", '/assets/hum.svg');
    addButton("sort-wind", '/assets/wind.svg');
    addButton("download-link", '/assets/upload.svg');
    addButton("chart", '/assets/chart.svg');
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
    CloudСoverDiv.textContent = weather.Cloud === true ? "Да" : "Нет";

    const SunshineDiv = document.createElement("div");
    SunshineDiv.textContent = weather.Sunshine === true ? "Да" : "Нет";

    const HumidityDiv = document.createElement("div");
    HumidityDiv.textContent = weather.Humidity;

    const WindDiv = document.createElement("div");
    WindDiv.textContent = weather.Wind;

    const CycloneDiv = document.createElement("div");
    CycloneDiv.textContent = weather.Cyclone === true ? "Да" : "Нет";

    const AntiCycloneDiv = document.createElement("div");
    AntiCycloneDiv.textContent = weather.AntiCyclone === true ? "Да" : "Нет";

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

export function addPagination(numPages, currentPage) {
    if (numPages === 1) {
        return
    }

    var container = document.getElementsByClassName("pagination")[0];

    for (let i = 1; i < numPages + 1; i++) {
        const item = document.createElement("div");
        currentPage === i ? item.classList.add("pagination-active") : (item.classList.add("pagination-elem"), item.classList.add("transition"));
        item.textContent = i;

        container.appendChild(item);
    }
}

export function addListFilter(filterList) {
    filterDestroy();

    const gridFilter = document.getElementsByClassName("grid-header")[0];

    const filter = document.createElement("div");
    filter.classList.add('grid-filter-list');

    filter.appendChild(addResetFilter());

    for (let i = 0; i < filterList.length; i++) {
        const itemFilter = document.createElement("div")
        itemFilter.classList.add('grid-filter-item');
        itemFilter.textContent = filterList[i].Lable;
        filter.appendChild(itemFilter);
    }

    gridFilter.appendChild(filter);
}

function addResetFilter() {
    const itemFilter = document.createElement("div")
    itemFilter.classList.add('grid-filter-reset');
    itemFilter.classList.add('transition');
    itemFilter.textContent = "Сбросить";
    return itemFilter;
}

export function paginationDestroy() {
    var pagination = document.getElementsByClassName("pagination")[0];

    const childElements = pagination.querySelectorAll('div > *');
    childElements.forEach(element => {
        element.remove();
    });
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

export function changeSortButton(elemClass) {
    const value = document.getElementsByClassName(elemClass)[0];

    let result;

    value.style.getPropertyValue("transform") ? (value.style.transform = "", result = true) :
        (value.style.transform = "rotate(180deg)", result = false);
    return result;
}

function addButton(elemClass, icon) {
    var dateSort = document.getElementsByClassName(elemClass)[0];

    var xhr = new XMLHttpRequest();
    xhr.open('GET', icon);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var svgContent = xhr.responseText;
            dateSort.innerHTML = svgContent;
        }
    };
}

export function notResuilt() {
    const grid = document.getElementsByClassName("grid")[0];

    const result = document.createElement("div");
    result.classList.add("grid-not-result");
    result.textContent = "Результатов нет";

    grid.appendChild(result);
}

export function initialTemp(min, max) {
    changeMax(max, "tempMaxResult");
    changeMin(min, "tempMinResult");

    const maxContainer = document.getElementsByClassName("tempInputMax")[0];
    const minContainer = document.getElementsByClassName("tempInputMin")[0];

    const maxInput = document.createElement("input");
    maxInput.setAttribute("type", "range");
    maxInput.setAttribute("min", min);
    maxInput.setAttribute("max", max);
    maxInput.setAttribute("class", "slider");
    maxInput.setAttribute("id", "tempMax");
    maxInput.setAttribute("value", max);


    const minInput = document.createElement("input");
    minInput.setAttribute("type", "range");
    minInput.setAttribute("min", min);
    minInput.setAttribute("max", max);
    minInput.setAttribute("class", "slider");
    minInput.setAttribute("id", "tempMin");
    minInput.setAttribute("value", min);

    maxContainer.appendChild(maxInput);
    minContainer.appendChild(minInput);
}

export function initialHum(min, max) {
    changeMax(max, "humMaxResult");
    changeMin(min, "humMinResult");

    const maxContainer = document.getElementsByClassName("humInputMax")[0];
    const minContainer = document.getElementsByClassName("humInputMin")[0];

    const maxInput = document.createElement("input");
    maxInput.setAttribute("type", "range");
    maxInput.setAttribute("min", min);
    maxInput.setAttribute("max", max);
    maxInput.setAttribute("class", "slider");
    maxInput.setAttribute("id", "humMax");
    maxInput.setAttribute("value", max);


    const minInput = document.createElement("input");
    minInput.setAttribute("type", "range");
    minInput.setAttribute("min", min);
    minInput.setAttribute("max", max);
    minInput.setAttribute("class", "slider");
    minInput.setAttribute("id", "humMin");
    minInput.setAttribute("value", min);

    maxContainer.appendChild(maxInput);
    minContainer.appendChild(minInput);
}

export function initialWind(min, max) {
    changeMax(max, "windMaxResult");
    changeMin(min, "windMinResult");

    const maxContainer = document.getElementsByClassName("windInputMax")[0];
    const minContainer = document.getElementsByClassName("windInputMin")[0];

    const maxInput = document.createElement("input");
    maxInput.setAttribute("type", "range");
    maxInput.setAttribute("min", min);
    maxInput.setAttribute("max", max);
    maxInput.setAttribute("class", "slider");
    maxInput.setAttribute("id", "windMax");
    maxInput.setAttribute("value", max);


    const minInput = document.createElement("input");
    minInput.setAttribute("type", "range");
    minInput.setAttribute("min", min);
    minInput.setAttribute("max", max);
    minInput.setAttribute("class", "slider");
    minInput.setAttribute("id", "windMin");
    minInput.setAttribute("value", min);

    maxContainer.appendChild(maxInput);
    minContainer.appendChild(minInput);
}

export function changeMax(value, elemId) {
    const result = document.getElementById(elemId);
    result.textContent = value;
}

export function changeMin(value, elemId) {
    const result = document.getElementById(elemId);
    result.textContent = value;
}