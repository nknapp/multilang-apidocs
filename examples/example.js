var multilangApiDocs = require('../');
var fs = require("fs");

var apidocs = multilangApiDocs(fs.readFileSync("fixture.js","utf8"), {
  filename: "fixture.js"
}).join("\n")

console.log(apidocs);

