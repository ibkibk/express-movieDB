var express = require("express");
var router = express.Router();

const movieDetails = require("../data/movieDetails");

function requireJSON(req, res, next) {
  if (!req.is("application/json")) {
    res.json({ msg: "content type must be application/json" });
  } else {
    next();
  }
}

router.param("movieId", (req, res, next) => {
  console.log("someone play the wild card");
  next();
});
/* GET movie page. */
// /movie/

// get /movie/top_rated
router.get("/top_rated", (req, res, next) => {
  let page = req.query.page;
  if (!page) {
    page = 1;
  }
  const results = movieDetails.sort((a, b) => {
    return b.vode_average - a.vode_average;
  });
  const indexToStart = page - 1 * 20;
  res.json(results.slice(indexToStart, indexToStart + 20));
});

// get /movie/movieId
router.get("/:movieId", (req, res, next) => {
  const movieId = req.params.movieId;
  const results = movieDetails.find((movie) => {
    return movie.id == movieId;
  });
  if (!results) {
    res.json({});
  } else {
    res.json(results);
  }
});
// post /movie/{movie_id}/rating

router.post("/:movieId/rating", requireJSON, (req, res, next) => {
  const movieId = req.params.movieId;
  const userRating = req.body.value;
  if (userRating < 0.5 || userRating > 10) {
    res.json("rating must be between 0.5 to 10");
  } else {
    res.json({ msg: "thank you for your rating", status: 200 });
  }
});
// delete /movie/{movie_id}/rating
router.delete("/:movieId/rating", requireJSON, (req, res, next) => {
  res.json({ msg: "reatng deleted" });
});
module.exports = router;
