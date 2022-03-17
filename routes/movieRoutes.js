const router = require("express").Router();
const { findByIdAndUpdate } = require("../db");
const Movie = require("../db");

const data = [];

router.get("/getAll", (req, res, next) =>{
    Movie.find((err, movie) =>{
        if(err)
        return next({status: 400, message: err.message});
        else
        return res.json(movie);
    })
});

router.get("/get/:id", (req, res, next) => {
    const id = req.params.id;
    Movie.findById(id, (err, found) => {
    if (err)
        return next ({status: 400, message: err.message});
    else if (!found)
        return next({ status: 404, message: "No movie with this id: " + id});
    else
        return res.send(found);

    });
})

router.post("/create", (req, res, next) => {
    const movie = req.body;
    new Movie(movie).save().then(() => {
        res.status(201).send("Successfully created");
    }).catch(err => next({staus: 400, message: err.message}))
});

router.put("/replace/:id", (req, res) => {
    const newMovie = req.query;
    const id = req.params.id;
    Movie.findByIdAndUpdate(id, newMovie, (err, replaced) =>
    {
        if (err)
        return next ({status: 400, message: err.message});
        else
        return res.status(202).send(replaced);
    })  
});

router.delete("/remove/:id", (req, res, next) => {
    const id = req.params.id;
    Movie.findByIdAndDelete(id,(err) => {
        if (err)
            return next({status: 400, mesage: err.message});
        else
            return res.sendStatus(204);
    })
});

module.exports = router;
