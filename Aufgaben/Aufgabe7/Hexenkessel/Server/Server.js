"use strict";
exports.__esModule = true;
var Http = require("http");
var Url = require("url");
var mongo = require("mongodb");
var uri = "mongodb+srv://PottersPotion:CsRFendSUNizzLRg@cluster0.9cfzs.mongodb.net/Hexenkessel?retryWrites=true&w=majority";
var client = new mongo.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var recipes;
client.connect(function (err) {
    console.log("test");
    recipes = client.db("Hexenkessel").collection("recipes");
});
var server = Http.createServer();
var port = process.env.PORT;
if (port == undefined)
    port = 5001;
console.log("Server starting on port:" + port);
server.listen(port);
server.addListener("request", handleRequest);
function handleRequest(_request, _response) {
    console.log("What's up?");
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.setHeader("Access-Control-Allow-Origin", "*");
    if (_request.url) {
        var url = Url.parse(_request.url, true);
        var recipe = JSON.parse(url.query["recipe"]);
        recipes.insertOne(recipe);
        var jsonString = JSON.stringify(recipe);
        _response.write(jsonString);
    }
    _response.end();
}
function isJson(str) {
    try {
        JSON.parse(str);
    }
    catch (e) {
        return false;
    }
    return true;
}
