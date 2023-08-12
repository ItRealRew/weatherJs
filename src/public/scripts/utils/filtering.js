export function filtedByClody(weathers) {
    return weathers.filter((x) => x.Cloud === true);
}

export function filtedByNotClody(weathers) {
    return weathers.filter((x) => x.Cloud !== true);
}

export function filtedBySunny(weathers) {
    return weathers.filter((x) => x.Sunshine === true);
}

export function filtedByNotSunny(weathers) {
    return weathers.filter((x) => x.Sunshine !== true);
}

export function filtedByTemp(weathers, min, max) {
    return weathers.filter(weather => {
        return weather.Temperature >= min && weather.Temperature <= max;
    });
}

export function filtedByHum(weathers, min, max) {
    return weathers.filter(weather => {
        return weather.Humidity >= min && weather.Humidity <= max;
    });
}

export function filtedByWind(weathers, min, max) {
    return weathers.filter(weather => {
        return parseInt(weather.Wind) >= min && parseInt(weather.Wind) <= max;
    });
}

export function filtedByCyclone(weathers) {
    return weathers.filter((x) => x.Cyclone === true);
}

export function filtedByAntyCyclone(weathers) {
    return weathers.filter((x) => x.AntiCyclone === true);
}

export function searchByAuthor(weathers, searchStr) {
    return weathers.filter(weather => weather.Author.toLowerCase().includes(searchStr.toLowerCase()));
}

export function searchByPlace(weathers, searchStr) {
    return weathers.filter(weather => weather.Place.toLowerCase().includes(searchStr.toLowerCase()));
}

export function searchByDate(weathers, startDate, finishDate) {
    return weathers.filter(weather => {
        const date = parseDate(weather.Date);
        return date >= startDate && date <= finishDate;
    });
}

function parseDate(date) {
    const dateParts = date.split(/[\/ :]/);

    const trueDate = new Date();
    trueDate.setDate(dateParts[0]);
    trueDate.setMonth(dateParts[1]-1);
    trueDate.setFullYear(dateParts[2]);
    trueDate.setHours(dateParts[3]);
    trueDate.setMinutes(dateParts[4]);

    return trueDate;
}