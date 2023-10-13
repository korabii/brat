require("dotenv").config();
const express = require('express');
const port = 3000;
const { connect } = require('./util/db')
const {brat, backbrat} = require('./brat')


// connect top db
connect();
const app = express();
app.use(express.json());

/*
return last meal time
*/
app.get('/energy', (req, res) => {

    const {name} = req.body;

    const diff = new Date() - backbrat.lastMeal.time;

    console.log(new Date())
    console.log(backbrat.lastMeal.time)

    res.status(200).json({
        message: diff
    })

})


app.listen(port, () => {
    console.log(`Application running on port ${port}`)
})