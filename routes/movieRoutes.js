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
    const id = Number.parseInt(req.params.id);

    if(id == null || undefined || id === NaN)
        return next({ status: 400, message: "Invalid id"});
    else if (id > data.length)
        return next({ status: 404, message: "No movie found with id" + id});
    
    res.json(data[id]);
})

router.post("/create", (req, res, next) => {
    const movie = req.body;
    new Movie(movie).save().then(() => {
        res.status(201).send("Successfully created");
    }).catch(err => next({staus: 400, message: err.message}))
});

router.put("/replace/:id", (req, res) => {
    movie.findByIdAndUpdate(req.params.id, req.body, (err, movie) => {
        if (err) {
            return res
            .send(err)
        };
        res.send(movie);
    });
    // const newMovie = req.query;
    // const id = req.params.id;
    // data.splice(id, 1, newMovie);
    // res.status(202).json(data[id]);   
});

router.delete("/remove/:id", (req, res, next) => {
    const id = Number.parseInt(req.params.id);
    data.splice(id, 1);
    res.sendStatus(204);
});

module.exports = router;