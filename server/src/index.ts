import * as express from 'express';
import * as mysql from 'mysql';

const server = express();
const port = 8080;

const mysql_host = "database";

const connect = mysql.createConnection({
    host: mysql_host,
    user: 'root',
    password: 'hipages',
    database: 'hipages'
});

connect.connect();

/* Set headers to prevent cors errors */

server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

server.get('/jobs', function(req, res, next) {
    connect.query("SELECT * FROM jobs WHERE status = 'new'", function (error, resultData, fields) {
        console.log("Error: ", error);
        console.log("Data: ", resultData);
        console.log("Fields: ", fields);
        res.send(resultData);
    });
});

server.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
