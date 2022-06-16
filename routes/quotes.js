const express = require('express');
const router = express.Router();
const knex = require("knex")(require("../knexfile"));

router.get("/", (_req, res) => {
    knex
        .select("*")
        .from("quote")
        .join("player", "player.id", "quote.player_id")
        .then(quotes => {
            res.status(200).json(quotes);
        })
        .catch((_error) => {
            res.status(400).json({
                statusCode: 400,
                errorMessage: "Unable to retrieve all quotes"
            })
        })
});

router.get("/:id", (_req, res) => {
    knex
        .select("*")
        .from("quote")
        .join("player", "player.id", "quote.player_id")
        .where({ id: req.params.id })
        .then(quotes => {
            res.status(200).json(quotes);
        })
        .catch((_error) => {
            res.status(400).json({
                statusCode: 400,
                errorMessage: "Unable to retrieve all quotes"
            })
        })
});

module.exports = router;