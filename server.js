//------------------------------------------------
// require

var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require(`${__dirname}/middleware/db`));

//app.use(httpMiddleware);
//app.use(awsMiddleware);
// app.use(require(`${__dirname}/middleware/googleapi`));
// app.use(require(`${__dirname}/middleware/appsyncExcuter`));

// // router

app.get("/",async function (req, res) {
  
    res.send("Hello XY----");
});

app.post("/",async function (req, res) {
    const aaa = req.body.aaa;
    res.json({ success_yn: true, msg: "success" ,aaa });
});
function isNull(data, replace) {
    return data === undefined || data === "" ? replace : data;
}


app.post("/sms-insert",async function (req, res) {
    let insertQuery1;
    console.log("req.body",req.body);
    const orig_addr = isNull(req.body.params.orig_addr,"");
    const dest_addr = req.body.params.dest_addr;
    const call_back = req.body.params.call_back;
    const sms_message = req.body.params.sms_message;
    const user_id = req.body.params.user_id;

    if ( dest_addr == null ||call_back == null ||sms_message == null ||user_id == null ) {
        res.status(401).send({ success_yn: false, msg: "bad parameter" });
        return;
    }
    insertQuery1 = req.mybatisMapper.getStatement(
        "SMS",
        "SMS_INSERT.INSERT",
        {
            user_id,
            orig_addr,
            dest_addr,
            call_back,
            sms_message,
        },
        { language: "sql", indent: "  " }
    );
    try {
        var result = await req.sequelize.query(insertQuery1, {
            type: req.sequelize.QueryTypes.INSERT,
        });

        res.json({ success_yn: true, msg: "success"  });
    } catch (error) {
        res.status(403).send({ success_yn: false, error: error });
        console.log("query: error", error);
        return;
    }
});

app.post("/sms-test",async function (req, res) {
    let insertQuery1;
    console.log("req.body",req.body);
    const orig_addr = isNull(req.body.orig_addr,"");
    const dest_addr = req.body.dest_addr;
    const call_back = req.body.call_back;
    const sms_message = req.body.sms_message;
    const user_id = req.body.user_id;

    if ( dest_addr == null ||call_back == null ||sms_message == null ||user_id == null ) {
        res.status(401).send({ success_yn: false, msg: "bad parameter" });
        return;
    }
    insertQuery1 = req.mybatisMapper.getStatement(
        "SMS",
        "SMS_INSERT.INSERT",
        {
            user_id,
            orig_addr,
            dest_addr,
            call_back,
            sms_message,
        },
        { language: "sql", indent: "  " }
    );
    try {
        var result = await req.sequelize.query(insertQuery1, {
            type: req.sequelize.QueryTypes.INSERT,
        });
        console.log("result",result);
        res.json({ success_yn: true, msg: "success"  });
    } catch (error) {
        res.status(403).send({ success_yn: false, error: error });
        console.log("query: error", error);
        return;
    }
});



app.listen(3000, function () {
  console.log("App started");
});

module.exports = app;

