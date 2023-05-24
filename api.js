const express = require("express");
const bodyP = require("body-parser");
const compiler = require("compilex");


const options = { stats: true };
const app = express();
compiler.init(options);


app.use(bodyP.json());
app.use("/codemirror-5.65.13", express.static("D:/Codes/Vacations'23/Online Code Editor/codemirror-5.65.13"));
app.use("/script.js", express.static("D:/Codes/Vacations'23/Online Code Editor/script.js"));
app.use("/style.css", express.static("D:/Codes/Vacations'23/Online Code Editor/style.css"));

app.get("/", function (req, res) {
    compiler.flush(function () {
        console.log("deleted");
    })
    res.sendFile("D:/Codes/Vacations'23/Online Code Editor/index.html");
});

app.post("/compile", function (req, res) {
    var code = req.body.code;
    var input = req.body.input;
    var lang = req.body.lang;
    try {

        if (lang == "Cpp") {
            if (!input) {
                var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; // (uses g++ command to compile )
                compiler.compileCPP(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                });
            }
            else {
                var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; // (uses g++ command to compile )
                compiler.compileCPPWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                });
            }
        }
        else if (lang == "Python") {
            if (!input) {
                var envData = { OS: "windows" };
                compiler.compilePython(envData, code, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                });
            }
            else {
                var envData = { OS: "windows" };
                compiler.compilePythonWithInput(envData, code, input, function (data) {
                    if (data.output) {
                        res.send(data);
                    }
                    else {
                        res.send({ output: "error" })
                    }
                });
            }
        }
    }
    catch (e) {
        console.log("error");
    }
})

app.listen(8000);