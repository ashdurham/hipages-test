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

/* Function */

const checkStatus = (id) => {
    return new Promise((res, rej) => {
        connect.query("SELECT status, accept_count FROM jobs WHERE id = '"+id+"'", function (error, resultData, fields) {
            if (error) {
                rej(error);
            } else {
                res(resultData);
            }
        });
    });
}

const updateStatus = (id, status, jobCount) => {
    return new Promise((res, rej) => {
        connect.query("UPDATE jobs SET status = '"+status+"', accept_count = '"+jobCount+"' WHERE id = '"+id+"'", function (error, resultData, fields) {
            if (error) {
                rej(error);
            } else {
                res(resultData);
            }
        });
    });
}

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

server.get('/waitlisted-jobs', function(req, res) {
    connect.query("SELECT j.*, s.name AS suburb_name, c.name AS category_name FROM jobs j LEFT JOIN suburbs s ON j.suburb_id = s.id LEFT JOIN categories c ON j.category_id = c.id WHERE j.status = 'waitlisted'", function (error, resultData, fields) {
        if (error) {
            res.send(error);
        } else {
            res.send(resultData);
        }
    });
});

/* Set data endpoints */

server.get('/check-status', function(req, res) {
    const valid_statuses = ['accepted', 'declined', 'waitlisted'];
    if (req.query.hasOwnProperty("id") && req.query.hasOwnProperty("status") && valid_statuses.indexOf(req.query.status) > -1) {
        let jobCount, status;
        checkStatus(req.query.id).then((result) => {
            const jobData = result[0];
            status = req.query.status;
            jobCount = jobData.accept_count;
            
            if (status === 'accepted') {
                if (jobCount < 3) {
                    jobCount++;
                    updateStatus(req.query.id, status, jobCount).then((result) => {
                        res.send(result);
                    });
                } else {
                    res.send({confirm: true});
                }
            } else {
                updateStatus(req.query.id, status, jobCount).then((result) => {
                    res.send(result);
                });
            }
        });
    } else {
        res.send({error: "ERROR: Data not supplied correctly"});
    }
});

server.get('/update-status', function(req, res) {
    const valid_statuses = ['accepted', 'declined', 'waitlisted'];
    if (req.query.hasOwnProperty("id") && req.query.hasOwnProperty("status") && valid_statuses.indexOf(req.query.status) > -1) {
        // TODO: Get count from DB - jobCount
        let jobCount, status;
        checkStatus(req.query.id).then((result) => {
            const jobData = result[0];
            status = req.query.status;
            jobCount = jobData.accept_count + 1;

            updateStatus(req.query.id, status, jobCount).then((result) => {
                res.send(result);
            });
        });
        
    } else {
        res.send({error: "ERROR: Data not supplied correctly"});
    }
});

server.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
