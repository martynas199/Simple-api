var express = require("express");
const port = process.env.PORT || 3000;
var app = express();
var request = require("request");

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
  res.render("search");
});

app.get("/results", function(req, res) {
  var query = req.query.search;
  var link = "http://www.omdbapi.com/?s=";
  var api = "&apikey=c291ab9";
  var ur = link + query + api;
  console.log(ur);

  request(ur, function(error, response, body) {
    var data = JSON.parse(body);
    if (!data["Error"] && response.statusCode == 200) {
      res.render("results", { data: data });
    } else {
      res.redirect("/404");
    }
  });
});

app.get("/404", function(req, res) {
  res.render("404");
});



console.log("working");

// starts the app on port 3000 (can start on different port)

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
