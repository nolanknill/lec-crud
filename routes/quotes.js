const express = require('express')
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Endpoint not implemented yet");
});

router.get("/:id", (req, res) => {
    res.send("Endpoint not implemented yet");
});

module.exports = router;