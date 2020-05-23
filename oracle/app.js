
var oracledb = require('oracledb');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.autoCommit = true;


//connection 
let connection;
(async function () {
    try {
        connection = await oracledb.getConnection({
            user: 'system',
            password: '1234',
            connectString: 'localhost:1521/ORCL1'

        });
        console.log("Successfully connected to Oracle!")
    } catch (err) {
        console.log("Error while connection: ", err);
    }
})()

//create table
app.get("/create", async function (req, res) {
    try {
        var result = await connection.execute(`CREATE TABLE student(id NUMBER, name VARCHAR2(50), email VARCHAR2(100) )`);
        res.send(result);
        console.log("Table created!");

    } catch (error) {
        console.log("Error while creating table: ", error);

    }

})

//insert data
app.post("/insert", async function (req, res) {
    var id = req.body.id;
    var name = req.body.name;
    var email = req.body.email;
    var result = await connection.execute(`INSERT into student (id,name,email) values (${id},'${name}','${email}')`);
    res.send(result);
});

// read data
app.get("/read", async function (req, res) {
    var result = await connection.execute('SELECT * FROM student', (err, rows, fields) => {
        if (!err) {
            console.log(rows);
            res.send(rows);
        }
        else {
            console.log("error while reading data", err);
        }
        res.send(result);
    })
})

// read specific data
app.get("/read/:id", async function (req, res) {
    const id = req.params.id;
    var result = await connection.execute(`SELECT * FROM student WHERE id =${id}`, (err, rows, fields) => {
        if (!err) {
            console.log(rows);
            res.send(rows);
        }
        else {
            console.log("error while reading data", err);
        }
        res.send(result);
    })
})

// delete data
app.delete("/delete/:id", async function (req, res) {
    const id = req.params.id;
    var result = await connection.execute(`DELETE FROM student WHERE id =${id}`, (err, rows, fields) => {
        if (!err) {
            res.send("Delete successfully");
        }
        else {
            console.log("error while reading data", err);
        }
        res.send(result);
    })
})

app.put("/update/:id", async function (req, res) {
    const id = req.params.id;
    var name = req.body.name;
    var email = req.body.email;
    var result = await connection.execute('UPDATE student SET name = :1 ,email =:1 where ID = :1', [`${name}`, `${email}`, `${id}`], (err) => {
        if (!err) {
            res.send(result);
            console.log("data updated");
            res.send("data updated");
        }
        else {
            console.log(err);
        }
    });

})

app.get("/", function (req, res) {
    res.end("<h1>hello this is oracle</h1>");
})

app.listen(1009, function () {
    console.log("Server is runnning on port 1009")
})
