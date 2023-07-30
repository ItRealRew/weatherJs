import express from 'express';
import bodyParser from 'body-parser';

import WeatherController from './server/controllers/weather.controller'

const app = express();
const consolidate = require('consolidate');
const ejs = require('ejs');

const weatherController = new WeatherController();

app.set('views', './src/views');
app.set('view engine', 'html');

app.use(express.static('./src/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('html', consolidate.ejs);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/api/getdata', (req, res) => {
  res.send(weatherController.getActual());
});

app.post('/api/create', (req, res) => {
  weatherController.createWeather(req.body);
  res.send('Ok');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});