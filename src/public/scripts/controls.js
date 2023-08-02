export function addControls() {
    addSortedButtonDate();
    addSortedButtonPlace();
    addSortedButtonTemp();
}

export function addLoader() {
    const grid = document.getElementsByClassName("grid")[0];

    const loader = document.createElement("span");
    loader.classList.add('loader');

    grid.appendChild(loader);
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