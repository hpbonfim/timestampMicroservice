"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PORT = process.env.PORT || 3210;
const express = require("express");
const app = express();
const cors = require("cors");
const options = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: "localhost",
    preflightContinue: false
};
app.use(cors(options));

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
});
app.get("/api/timestamp/:date_string?", (req, res) => {
    console.log(req.params.date_string);
    console.log(typeof req.params.date_string);
    let date;
    let unix;
    let utc;
    if (!req.params.date_string) {
        date = new Date();
        unix = date.getTime();
        utc = date.toUTCString();
    }
    else {
        date = new Date(req.params.date_string);
        if (isNaN(date.getTime())) {
            date = new Date(Number(req.params.date_string));
        }
        if (isNaN(date.getTime())) {
            res.json({
                error: "Invalid Date"
            });
        }
        unix = date.getTime();
        utc = date.toUTCString();
    }
    res.json({
        unix: unix,
        utc: utc
    });
});
// listen for requests :)
const listener = app.listen(PORT, function () {
    console.log("Your app is listening on port " + listener.address().port);
});
