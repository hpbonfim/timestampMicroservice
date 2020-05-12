// server.js
// where your node app starts
const PORT: any = process.env.PORT || 3210
// init project
import express = require('express')
const app: express.Application = express()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
import cors = require("cors")

const options: cors.CorsOptions = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: "localhost", //API_URL
    preflightContinue: false
}

app.use(cors(options)) // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req: any, res: any) {
    res.sendFile(__dirname + "/views/index.html")
})

app.get("/api/timestamp/:date_string?", (req: any, res: any) => {
    console.log(req.params.date_string)
    console.log(typeof req.params.date_string)
    let date: any
    let unix: any
    let utc: any

    if (!req.params.date_string) {
        date = new Date()
        unix = date.getTime()
        utc = date.toUTCString()
    } else {
        date = new Date(req.params.date_string)
        if (isNaN(date.getTime())) {
            date = new Date(Number(req.params.date_string))
        }
        if (isNaN(date.getTime())) {
            res.json({
                error: "Invalid Date"
            })
        }

        unix = date.getTime()
        utc = date.toUTCString()
    }

    res.json({
        unix: unix,
        utc: utc
    })
})

// listen for requests :)
const listener: any = app.listen(PORT, function () {
    console.log("Your app is listening on port " + listener.address().port)
})