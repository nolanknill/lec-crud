const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));

router.get("/", (req, res) => {
  const query = knex
    .select("*")
    .from("player");

    // Only get the captain if requested
    if (!!req.query.captain) {
        query.where({ is_captain: true });
    }

    query.then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(500).send("Couldn't retrieve player data");
    });
});

router.get("/:id", (_req, res) => {
  res.send("Endpoint not implemented yet");
});

module.exports = router;
