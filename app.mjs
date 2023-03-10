const port = 5000;
const host = "127.0.0.1";
import * as page from 'fs';
import * as http from 'http';
import * as netUser from 'net-user'

http.createServer(async function (request,response) {
   
    if (request.url != "/") {
        response.statusCode = 404;
        response.end("Not Found");
        return;
    }

    if (request.method == "GET") {
        page.readFile("form.html", "utf8", function(error, data){
            response.statusCode = 200;
            response.end(data);
        })
        return;
    } 

    if (request.method == "POST") {

        const buffers = [];
        for await (const chunk of request) {
            buffers.push(chunk);
        }
        const data = Buffer.concat(buffers).toString().trim();
        let user = data.substring(data.indexOf("=") + 1).trim();

        netUser.get(user, function (err, data) {
            if (data === undefined) {
                page.readFile("negative.html", "utf8", function(error, data){
                    response.statusCode = 200;
                    response.end(data);
                })
            } else {
                page.readFile("positive.html", "utf8", function(error, data){
                    response.statusCode = 200;
                    response.end(data);
                })
            }

            return;
        });

        return;
    } 

    response.statusCode = 404;
    response.end("Not Found");
    return;

}).listen(port, host, function(){
    console.log("Server running on [http://" + host + ":" + port + "].");
});