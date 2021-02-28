const express = require("express");
const router = express.Router();
const movies = require("../data/movies");
const people = require("../data/people");

const queryRequired = (req, res, next) => {
  const searchTerm = req.query.query;
  if (!searchTerm) {
    res.json({ msg: "query is required" });
  } else {
    next();
  }
};

router.use(queryRequired);

// get /search/movie
router.get("/movie", (req, res, next) => {
  const searchTerm = req.query.query;
  const results = movies.filter((movie) => {
    found =
      movie.overview.includes(searchTerm) || movie.title.includes(searchTerm);
    return found;
  });
  res.json({ results });
});

// get /search/person
router.get("/person", (req, res, next) => {
  const searchTerm = req.query.query;
  const results = people.filter((person) => {
    found = person.name.includes(searchTerm);
    return found;
  });
  res.json({ results });
});

module.exports = router;
