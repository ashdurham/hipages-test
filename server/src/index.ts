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

/* Set headers to prevent cors errors */

server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/* Get data endpoints */

server.get('/invited-jobs', function(req, res) {
    connect.query("SELECT j.*, s.name AS suburb_name, c.name AS category_name FROM jobs j LEFT JOIN suburbs s ON j.suburb_id = s.id LEFT JOIN categories c ON j.category_id = c.id WHERE j.status = 'new'", function (error, resultData, fields) {
        if (error) {
            res.send(error);
        } else {
            res.send(resultData);
        }
    });
});

server.get('/accepted-jobs', function(req, res) {
    connect.query("SELECT j.*, s.name AS suburb_name, c.name AS category_name FROM jobs j LEFT JOIN suburbs s ON j.suburb_id = s.id LEFT JOIN categories c ON j.category_id = c.id WHERE j.status = 'accepted'", function (error, resultData, fields) {
        if (error) {
            res.send(error);
        } else {
            res.send(resultData);
        }
    });
});

/* Set data endpoints */

server.get('/update-status', function(req, res) {
    const valid_statuses = ['accepted', 'declined'];
    if (req.query.hasOwnProperty("id") && req.query.hasOwnProperty("status") && valid_statuses.indexOf(req.query.status) > -1) {
        connect.query("UPDATE jobs SET status = '"+req.query.status+"' WHERE id = '"+req.query.id+"'", function (error, resultData, fields) {
            if (error) {
                res.send(error);
            } else {
                res.send(resultData);
            }
        });
    } else {
        res.send({error: "ERROR: Data not supplied correctly"});
    }
});

server.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
