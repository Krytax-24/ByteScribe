var editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
    mode: "text/x-c++src",
    theme: "dracula",
    lineNumbers: true,
    autoCloseBrackets: true,
});

var width = window.innerWidth;
var input = document.getElementById("input");
var output = document.getElementById("output");
var run = document.getElementById("run");
var option = document.getElementById("inlineFormSelectPref");
var code;


editor.setSize(0.7 * width, "550");
option.addEventListener("change", function () {
    if (option.value == "python") {
        editor.setOption("mode", "text/x-python")
    }
    else {
        editor.setOption("mode", "text/x-c++src")
    }
});


run.addEventListener("click", async function () {
    code = {
        code: editor.getValue(),
        input: input.value,
        lang: option.value
    }
    console.log(code);
    var oData = await fetch("http://localhost:8000/compile", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(code)
    })
    var d = await oData.json();
    output.value = d.output;
});