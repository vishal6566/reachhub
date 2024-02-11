const express = require("express");
const playersRoute=require("./routes/playersRoute")
// const cors = require("cors");
const app = express();

app.use(express.json());
// app.use(cookieParser());
// app.use(cors());


app.use("/",playersRoute)

module.exports = app;