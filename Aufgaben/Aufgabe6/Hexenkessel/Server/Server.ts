import * as Http from "http";
// import * as Url from "url"

export namespace Aufgabe6 {
    let server: Http.Server = Http.createServer();
    console.log(server);

    let port: number | string | undefined = process.env.PORT;
    if (port == undefined)
    port = 

    server.listen(port);
    server.addListener("request", handleRequest);

    function handleRequest(): void {
        console.log("What´s up?");
    }

   

}