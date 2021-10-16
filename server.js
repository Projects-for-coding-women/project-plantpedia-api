const express = require('express');
const app = express();

let plantList = [
    {
        id: "1",
        name: "Kalanchoe",
        family: "Crassulaceae"
    },
    {
        id: "2",
        name: "Chinese Money Plant",
        family: "Urticaceae"
    },
    {
        id: "3",
        name: "Echeveria elegans",
        family: "Succulents"
    },
]

app.use(express.json());

app.get('/', (req, res) => {
    res.redirect('/plants')
});

app.get('/plants', (req, res) => {
    res.send(plantList)
});

app.get("/plant/:id", (req, res) => {
    const plant = plantList.filter(plant => plant.id === req.params.id)[0];
    res.send(plant)
});

app.post("/plant", function (req, res) {
    const plantId = plantList.length + 1

    plantList.push({
        id: plantId.toString(),
        name: req.body.name,
        family: req.body.family
    })

    res.status(200).send(plantList)
});

app.put("/plant/:id", function (req, res) {
    const plant = plantList.filter(plant => plant.id === req.params.id)[0];

    if (req.body.name) {
        plant.name = req.body.name
    }

    if (req.body.family) {
        plant.family = req.body.family
    }

    res.status(200).send(plantList)
});

app.delete("/plant/:id", function (req, res) {
    plantList = plantList.filter(plant => plant.id !== req.params.id)
    res.status(200).send(plantList)
});

app.listen(3000, () => console.log("Server is up and running"))