const express = require('express');
const app = express();
const port = 3000;

const {message} = require('./message');

app.get('/message', (req, res) => {
    message()
        .then((body) => {
        const { text } = body;
        res.send(text);
    })
});

app.listen(port, () => {
    console.log("Server is listening");
})
