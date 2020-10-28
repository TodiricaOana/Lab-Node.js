const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require ('body-parser');
const jwt = require('jsonwebtoken');

const config = {
    secretKey : 'SuperSecretKey'
} 

app.use(bodyParser.json());

const authenticationMiddleware = (req, res, next) => {
    const  { authorization } = req.headers;
    if(!authorization) {
        return res.status(401).send({
            status: "not ok",
        });
    }

    const jwtToken = authorization.replace("Bearer ", "");
    jwt.verify(jwtToken, config.secretKey, (err, decoded) => {
        if(err) {
            return res.status(401).send({
                status: "not ok",
            });
        }
        else {
            return next();
        }
    });
}

app.post('/grapfql', authenticationMiddleware, (req, res) => {
    res.send({
    status: 'ok'
    }); 
});

app.post('/graphql/public', (req,res) => {
    const { body } = req;
    if (user === "Gogu" && pass === "P@rOLA") {
        jwt.sign({}, config.secretKey, (err, token) => {
            res.send({
                token,
            });
        });
    }
    else {
        res.status(401).send({
        status: 'not ok'
        }); 
    }
});

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
