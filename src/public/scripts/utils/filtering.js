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