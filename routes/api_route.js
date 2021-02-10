var path = require("path");
var fs = require("fs");
var { v4: uuidv4 } = require('uuid');
var storedArray = require("../db/db.json");


module.exports = app => {

    app.get("/api/notes", function (req, res) {

        fs.readFile("./db/db.json", { encoding: "utf-8" }, (err, data) => {
            if (err) throw err; 
            data = JSON.parse(data)
            res.send(data)
        })
    });

    app.post("/api/notes", function (req, res) {

        var storedNotes = path.join(__dirname, "../db/db.json");
        storedArray.push(req.body);

        var uuid = uuidv4()
        req.body.id = uuid


        fs.writeFileSync(storedNotes, JSON.stringify(storedArray), (err) => {
            if (err) throw err;
        });

        res.send(uuid)

    });

    app.delete("/api/notes/:id", function (req, res) {

        // id off params
        var id = req.params.id

        // read the file and get notes
        fs.readFile("./db/db.json", { encoding: "utf-8" }, (err, data) => {
            if (err) throw err;

            data = JSON.parse(data)

            console.log("before", data)
            console.log(typeof data)
            // delete the note
            var index = data.findIndex( note => note.id === id)
            data.splice(index, 1)
            console.log("after", data)

      // rewrite db.json file
            fs.writeFileSync("./db/db.json", JSON.stringify(data), (err) => {
                if (err) throw err;
            });

        })


        res.status(200).send("deleted note successfully")

    }


    )
};