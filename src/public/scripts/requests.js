const API_URL = "http://localhost:3000/api/";

export async function getData() {
    return await fetch(API_URL + 'getdata')
     .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Ошибка загрузки данных');
        }
      })
     .catch(error => {
        console.error(error);
      });
  }

  export function addNewElem() {
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
               return weather;
            } else {
                console.error(xhr.statusText);
            }
        }
    };
    xhr.send(JSON.stringify(weather));

    return weather;
}

function getDataNow() {
    var dateNow = new Date();
    dateNow = String(dateNow.getDate()).padStart(2, '0') +
        '/' + String(dateNow.getMonth() + 1).padStart(2, '0') +
        '/' + dateNow.getFullYear() +
        ' ' + String(dateNow.getHours() + ':' + dateNow.getMinutes());
    return dateNow.toString();
}