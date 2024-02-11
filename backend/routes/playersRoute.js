const express = require("express");


const { topPlayers } = require("../controller/playersController");

const router = express.Router();


router.route("/top-players").get(topPlayers);

module.exports = router;