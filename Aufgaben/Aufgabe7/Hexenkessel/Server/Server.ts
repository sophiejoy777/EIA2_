
import * as Http from "http";
import * as Url from "url";
import * as mongo from "mongodb";


const uri = "mongodb+srv://PottersPotion:CsRFendSUNizzLRg@cluster0.9cfzs.mongodb.net/Hexenkessel?retryWrites=true&w=majority";
const client = new mongo.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let recipes: mongo.Collection;
client.connect(err => {
console.log("test");
recipes = client.db("Hexenkessel").collection("recipes");
});


let server: Http.Server = Http.createServer();

let port: number | string | undefined = process.env.PORT;
if (port == undefined)
    port = 5001;

console.log("Server starting on port:" + port);

server.listen(port);
server.addListener("request", handleRequest);

function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
    console.log("What's up?");

    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.setHeader("Access-Control-Allow-Origin", "*");

    if (_request.url) {
        let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);

        let recipe: any = JSON.parse(<string>url.query["recipe"]);
        recipes.insertOne(recipe);

        let jsonString: string = JSON.stringify(recipe);
        _response.write(jsonString);
    }

    _response.end();
}

function isJson(str:any) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
