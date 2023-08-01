const API_URL = "http://localhost:3000/api/";

export function getData() {
    return fetch(API_URL + 'getdata')
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