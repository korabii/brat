require("dotenv").config();
const express = require('express');
const port = 3000;
const { connect } = require('./util/db')
const { brat, backbrat } = require('./brat')


// connect to db
connect();
const app = express();
app.use(express.json());

/*
return last meal time and energy
*/
app.get('/energy', (req, res) => {

    res.status(200).json({
        energy: getEnergy()
    })

})

app.get('/feed', (req, res) => {
    const oldEnergy = getEnergy();
    const energyFromFood = 5;

    // upate energy and last meal tiem
    backbrat.state.energy = oldEnergy + energyFromFood;
    backbrat.lastMeal.time = Date.now();
    // if update successful
    res.status(200).json({
        energy: backbrat.state.energy
    })

})

const getEnergy  = () => {
    // Current time in millis from epoch
    const now = Date.now();
    // past time in millis from epoch
    const past = backbrat.lastMeal.time; 

    // work out time past
    const diffMillis = now - past;
    // convert into hours (base 10, not 6.)
    const diffHours = diffMillis / (1000 * 3600);
    // work out energy left
    return backbrat.state.energy - diffHours
}




app.listen(port, () => {
    console.log(`Application running on port ${port}`)
})