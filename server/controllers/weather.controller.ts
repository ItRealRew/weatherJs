import Weather from '../models/weather.model'

export default class WeatherController {
    constructor() { }

    public weathers: Weather[] = [];

    public getActual(): string {
        const myObject = {
            name: 'John',
            age: 30,
            city: 'New York'
        };
        return JSON.stringify(myObject);
    }
}