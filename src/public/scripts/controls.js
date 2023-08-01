function addControls() {
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