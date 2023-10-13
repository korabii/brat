require("dotenv").config();
const express = require('express');
const port = 3000;
const { connect } = require('./util/db')


// connect top db
connect();
const app = express();
app.use(express.json());

app.post('/home', (req, res) => {

    const {name} = req.body;

    res.status(404).send("home")

})


app.listen(port, () => {
    console.log(`Application running on port ${port}`)
})