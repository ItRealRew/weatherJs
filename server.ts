import express from 'express';

const app = express();
const consolidate = require('consolidate');
const ejs = require('ejs');

app.set('views', './src/views');
app.set('view engine', 'html');
app.use(express.static('./src/public'));

app.engine('html', consolidate.ejs);

app.get('/', (req, res) => {
    res.render('index');
  });

app.listen(3000, () => {
    console.log('Server started on port 3000');
});