/* eslint-disable quotes */
// eslint-disable-next-line quotes
const router = require("express").Router();
const Movie = require("../db");

router.get("/getAll", async (req, res, next) => {
  try {
    const movie = await Movie.find();
    return res.json(movie);
  } catch (err) {
    return next({ status: 400, message: err.message });
  }
});

router.get("/get/:id", async ({ params: { id } }, res, next) => {
  try {
    const found = await Movie.findById(id);
    if (!found) return next({ status: 404, message: `No movie with this id: ${id}` });
    return res.send(found);
  } catch (error) {
    return next({ status: 400, message: error.message });
  }
});

router.post("/create", ({ body: movie }, res, next) => {
  new Movie(movie)
    .save()
    .then(() => {
      res.status(201).send("Successfully created");
    })
    .catch((err) => next({ staus: 400, message: err.message }));
});

router.put(
  "/replace/:id",
  async ({ query: newMovie, params: { id } }, res, next) => {
    try {
      await Movie.findByIdAndUpdate(id, newMovie);
      const updatedMovie = await Movie.findById(id);
      return res.status(202).send(updatedMovie);
    } catch (error) {
      return next({ status: 400, message: error.message });
    }
  },
);

router.delete("/remove/:id", ({ params: { id } }, res, next) => {
  Movie.findByIdAndDelete(id, (err) => {
    if (err) return next({ status: 400, mesage: err.message });
    return res.sendStatus(204);
  });
});

module.exports = router;
