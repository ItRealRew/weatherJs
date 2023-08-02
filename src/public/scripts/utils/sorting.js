export function sortedDateDes(weathers) {
    return weathers.sort((x, y) => x.Date.localeCompare(y.Date));
}

export function sortedDateAsc(weathers) {
    return weathers.sort((x, y) => y.Date.localeCompare(x.Date));
}

export function sortedPlaceDes(weathers) {
    return weathers.sort((x, y) => x.Place.localeCompare(y.Place));
}

export function sortedPlaceAsc(weathers) {
    return weathers.sort((x, y) => y.Place.localeCompare(x.Place));
}

export function sortedTempDes(weathers) {
    return weathers.sort(function (x, y) {
        if (x.Temperature < y.Temperature) {
            return -1;
        }

        if (x.Temperature > y.Temperature) {
            return 1;
        }

        return 0;
    });
}

export function sortedTempAsc(weathers) {
    return weathers.sort(function (x, y) {
        if (x.Temperature > y.Temperature) {
            return -1;
        }

        if (x.Temperature < y.Temperature) {
            return 1;
        }

        return 0;
    });
}