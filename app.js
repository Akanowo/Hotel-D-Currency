const expres = require('express');

const app = expres();

const PORT = process.env.PORT || 3000;

app.use(expres.static('public'));

app.get('/', (req, res) => {
    return res.sendFile(__dirname + '/index.html')
});

app.listen(PORT, () => {
    console.log(`App started on ${PORT}`);
})

