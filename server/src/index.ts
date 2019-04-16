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

const checkStatus = (id, cb) => {
    connect.query("SELECT status, accept_count FROM jobs WHERE id = '"+id+"'", function (error, resultData, fields) {
        if (error) {
            cb('error', error);
        } else {
            cb('success', resultData);
        }
    });
}

const updateStatus = (id, status, jobCount, cb) => {
    connect.query("UPDATE jobs SET status = '"+status+"', accept_count = '"+jobCount+"' WHERE id = '"+id+"'", function (error, resultData, fields) {
        if (error) {
            cb('error', error);
        } else {
            cb('success', resultData);
        }
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
        checkStatus(req.query.id, function(status, result) {
            //res.send(resultData);
            const jobData = result[0];
            status = req.query.status;
            jobCount = jobData.accept_count;
            
            if (status === 'accepted') {
                if (jobCount < 3) {
                    jobCount++;
                    updateStatus(req.query.id, status, jobCount, function(status, result) {
                        // if (status == 'error') {
                        //     res.send(result);
                        // } else {
                        //     res.send(result);
                        // }
                        res.send(result);
                    });
                } else {
                    res.send({confirm: true});
                }
            } else {
                updateStatus(req.query.id, status, jobCount, function(status, result) {
                    // if (status == 'error') {
                    //     res.send(result);
                    // } else {
                    //     res.send(result);
                    // }
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
        checkStatus(req.query.id, function(s, result) {
            const jobData = result[0];
            status = req.query.status;
            jobCount = jobData.accept_count + 1;

            updateStatus(req.query.id, status, jobCount, function(status, result) {
                // if (status == 'error') {
                //     res.send(result);
                // } else {
                //     res.send(result);
                // }
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
