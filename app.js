const express = require('express');
const path = require('path')
require('dotenv').config();

const apiRoutes = require('./routes/');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use('/assets', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    return res.render('index');
});

app.use('/api', apiRoutes())

app.listen(PORT, () => {
    console.log(`App started on ${PORT}`);
})

