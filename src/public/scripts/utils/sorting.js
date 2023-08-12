export function sortedDateDes(weathers) {
    return weathers.sort((x, y) => parseDate(y.Date) - parseDate(x.Date));
}

export function sortedDateAsc(weathers) {
    return weathers.sort((x, y) => parseDate(x.Date) - parseDate(y.Date));
}

export function sortedPlaceDes(weathers) {
    return weathers.sort((x, y) => x.Place.localeCompare(y.Place));
}

export function sortedPlaceAsc(weathers) {
    return weathers.sort((x, y) => y.Place.localeCompare(x.Place));
}

export function sortedHumDes(weathers) {
    return weathers.sort(function (x, y) {
        if (parseInt(x.Humidity) < parseInt(y.Humidity)) {
            return -1;
        }

        if (parseInt(x.Humidity) > parseInt(y.Humidity)) {
            return 1;
        }

        return 0;
    });
}

export function sortedHumAsc(weathers) {
    return weathers.sort(function (x, y) {
        if (parseInt(x.Humidity) > parseInt(y.Humidity)) {
            return -1;
        }

        if (parseInt(x.Humidity) < parseInt(y.Humidity)) {
            return 1;
        }

        return 0;
    });
}

export function sortedTempDes(weathers) {
    return weathers.sort(function (x, y) {
        if (parseInt(x.Temperature) < parseInt(y.Temperature)) {
            return -1;
        }

        if (parseInt(x.Temperature) > parseInt(y.Temperature)) {
            return 1;
        }

        return 0;
    });
}

export function sortedTempAsc(weathers) {
    return weathers.sort(function (x, y) {
        if (parseInt(x.Temperature) > parseInt(y.Temperature)) {
            return -1;
        }

        if (parseInt(x.Temperature) < parseInt(y.Temperature)) {
            return 1;
        }

        return 0;
    });
}

export function sortedWindDes(weathers) {
    return weathers.sort(function (x, y) {
        if (parseInt(x.Wind) < parseInt(y.Wind)) {
            return -1;
        }

        if (parseInt(x.Wind) > parseInt(y.Wind)) {
            return 1;
        }

        return 0;
    });
}

export function sortedWindAsc(weathers) {
    return weathers.sort(function (x, y) {
        if (parseInt(x.Wind) > parseInt(y.Wind)) {
            return -1;
        }

        if (parseInt(x.Wind) < parseInt(y.Wind)) {
            return 1;
        }

        return 0;
    });
}


function parseDate(date) {
    const dateParts = date.split(/[\/ :]/);

    const trueDate = new Date();
    trueDate.setDate(dateParts[0]);
    trueDate.setMonth(dateParts[1] - 1);
    trueDate.setFullYear(dateParts[2]);
    trueDate.setHours(dateParts[3]);
    trueDate.setMinutes(dateParts[4]);

    return trueDate;
}