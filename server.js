var express = require("express");

var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});

require("./routes/api_route")(app);
require("./routes/html_route")(app);
