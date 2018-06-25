const assert = require("_assert");
const main = require("./main.js");
const util = require("./util.js");

describe("SHARED: Main", function() {
  it("gets valid html", function() {
    const structureToConvert = [["head"], ["body"]];
    const convertedStructure = main.toHtml(structureToConvert);
    const expectedHtml = util.stripMargin`
      |<html>
      |  <head></head>
      |  <body></body>
      |</html>`;
    assert.equal(convertedStructure, expectedHtml);
  });
});
