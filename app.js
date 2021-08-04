const expres = require('express');
const path = require('path')

const app = expres();

const PORT = process.env.PORT || 3000;

app.use(expres.json());
app.use(expres.urlencoded({ extended: false }))
app.use(expres.static(path.join(__dirname + '/public')));

app.get('/', (req, res) => {
    return res.sendFile(__dirname + '/index.html')
});

app.listen(PORT, () => {
    console.log(`App started on ${PORT}`);
})

