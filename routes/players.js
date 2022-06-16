const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../knexfile"));

router
  .route("/")
  .get((req, res) => {
    const query = knex("player");

    // Only get the captain if requested
    if (!!req.query.captain) {
      query.where({ is_captain: true });
    }

    query
      .then((players) => {
        res.status(200).json(players);
      })
      .catch(() => {
        res.status(500).send("Couldn't retrieve player data");
      });
  })
  .post((req, res) => {
    // Endpoint: POST /players json in the body
    // validate first
    // name, is_captain
    if (!req.body.name) {
      return res.status(400).json({
        statusCode: 400,
        errorMessage: "Name is a required field",
      });
    }

    // if is_captain is missing -> default to 0
    const isCaptain = !!req.body.is_captain || false;

    knex("player")
      .insert({
        name: req.body.name,
        is_captain: isCaptain,
      })
      .then((newPlayerId) => {
        return knex.select("*").from("player").where({ id: newPlayerId });
      })
      .then((players) => {
        res.status(201).json(players);
      });
  });

// Endpoint: /players/1  (1, 2, or 3 as options for id)
router
  .route("/:id")
  .get((req, res) => {
    knex
      .select("*")
      .from("player")
      .where({ id: req.params.id })
      .then((players) => {
        res.status(200).json(players);
      });
  })
  .put((req, res) => {
    knex("player")
      .where({ id: req.params.id })
      .update({
        name: req.body.name,
        is_captain: req.body.is_captain,
      })
      .then((players) => {
        console.log(players);
        res.status(200).json(players);
      });
  })
  .delete((req, res) => { //Endpoint: DELETE /players/:id 
    knex("player")
      .where({ id: req.params.id })
      .del()
      .then((data) => {
        res.sendStatus(204);
      })
      .catch((error) => {
        console.log("CATCH");
        res.status(400).json({
          statusCode: 400,
          errorMessage: "Unable to delete player"
        })
      });
  })

// How can we get a player's quotes?
// Use the quote table -> look for player_id -> return matching records

// Endpoint: /players/1/quotes
router.get("/:id/quotes", (req, res) => {
  // check if player does not exist -> if so, send 404 (player not found)
  // select player where id = req.params.id -> then if this returns empty array
  // return a 404 status

  knex
    .select("*")
    .from("quote")
    .where({ player_id: req.params.id })
    .then((quotes) => {
      res.status(200).json(quotes);
    })
    .catch(() => {
      res.status(400).json({
        statusCode: 400,
        errorMessage: "Error finding quotes for player " + req.params.id,
      });
    });
});

module.exports = router;
