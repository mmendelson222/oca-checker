var express = require('express');
var os = require('os');
var app = express();
var path = require('path');
app.use(express.cookieParser());
app.use(express.session({secret: 'kliu2348&873&5'}));
app.use(express.json());
app.use(express.urlencoded());


app.use(function (error, req, res, next) {
    if (!error) {
        req.session.maxAge = 1000 * 60 * 25;
        next();
    } else {
        console.error(error.stack);
        res.send(500);
    }
});

/// routing for web services
app.post(/^\/service\/calculate.*$/i, function (req, res) {
    LogVisit(req);
    calculate(req, res);
});
app.post(/^\/service\/authenticate.*$/i, function (req, res) {
    LogVisit(req);
    authenticate(req, res);
});

app.use(express.favicon(path.join(__dirname, '/app/img/favicon.ico')));
app.use(express.static(__dirname + '/app'));

app.listen(process.env.PORT || 3000);

function calculate(req, res, now) {
    if (!now) res.writeHead(200, { "Content-Type": "application/json" });
    if (!req.session.authenticate) {
        res.end(JSON.stringify({ status: "notloggedin", errorMessage: "No session or session timed out.", servertime: new Date()}));
        return;
    }

    if (!req.body.receiptsCard || !req.body.receiptsTotal || !req.body.transactionCount || !req.body.mcc || !req.body.zip) {
        res.end(JSON.stringify({ status: "error", errorMessage: "At least one input item is missing.", servertime: new Date()}));
        return;
    }

    if (req.body.mcc == 0) {
        res.end(JSON.stringify({ status: "error", errorMessage: "Error message for testing purposes.", servertime: new Date() }));
    } else if (req.body.mcc < 100) {
        res.end(JSON.stringify({ status: "low", servertime: new Date() }));
    } else {
        res.end(JSON.stringify({ status: "typical", servertime: new Date() }));
    }

	//res.end(JSON.stringify({ success: false, errorMessage: "Number of checker calls exceeds the maximum  " + OneMinuteCalls + " calls per minute.", servertime: new_now }));


    //res.end(JSON.stringify({ success: false, errorMessage: err.message, servertime: new Date() }));
}

function authenticate(req, res) {
    res.writeHead(200, { "Content-Type": "application/json" });
    req.session.authenticate = false;
    req.session.ptin = null;
    var falseString = JSON.stringify({ authenticated: false, servertime: new Date() });
    if (!req.body.ptin || !req.body.code) {
        res.end(falseString);
        return;
    }
    if (req.body.ptin == '' || req.body.code == '') {
        res.end(falseString);
        return;
    }
    if (req.body.ptin == 'P00000000') {
        //YES
        req.session.authenticate = true;
        req.session.ptin = req.body.ptin;
        res.end(JSON.stringify({ authenticated: true, servertime: new Date() }));
    } else {
        res.end(falseString);
    }
}

function LogVisit(req) {
    var date = new Date();
    var logContent = {
//        id: uuid.v4(),
        visit_date: date,
        source_ip:   req.headers['x-forwarded-for'] || 
                     req.connection.remoteAddress || 
                     req.socket.remoteAddress ||
                     req.connection.socket.remoteAddress,
        url: req.url,
        method: req.method,
        ptinbody: req.body.ptin,
        ptinsession: req.session.ptin,
        isloggedin: req.authenticate,
        hostname: os.hostname()
    };
    console.log(logContent);
}


