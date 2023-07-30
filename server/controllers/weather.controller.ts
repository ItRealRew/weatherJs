import fs from 'fs';
import path from 'path';

import Weather from '../models/weather.model';

export default class WeatherController {
    constructor() { }

    public getActual(): string {
        const data = fs.readFileSync(path.join(__dirname, '../data/Weather.json'), 'utf8');
        const weathers: Weather [] = JSON.parse(data);
        return JSON.stringify(weathers);
    }

    public createWeather(body: string) {
        const weather: Weather = JSON.parse(JSON.stringify(body));

        const data = fs.readFileSync(path.join(__dirname, '../data/Weather.json'), 'utf8');
        const weathers: Weather [] = JSON.parse(data);

        weathers.push(weather);

        fs.writeFileSync(path.join(__dirname, '../data/Weather.json'), JSON.stringify(weathers))
      }
}