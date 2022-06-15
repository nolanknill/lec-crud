const express = require("express");
const knex = require("knex")(require("./knexfile"));
require("dotenv").config();

const app = express();
const PORT = process.env.PORT ?? 8080;

app.use(express.json());

app.get("/players", (req, res) => {
  console.log(req.query);
  const isCaptain = !!req.query.captain;

  // SELECT * FROM player
  knex
    .select("*")
    .from("player")
    .where({ is_captain: isCaptain })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).send("Couldn't retrieve player data");
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
