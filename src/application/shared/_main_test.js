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

  it("handles text in element", function() {
    const structureToConvert = [["head"], ["body", "Hello, world!"]];
    const convertedStructure = main.toHtml(structureToConvert);
    const expectedHtml = util.stripMargin`
      |<html>
      |  <head></head>
      |  <body>
      |    Hello, world!
      |  </body>
      |</html>`;
    assert.equal(convertedStructure, expectedHtml);
  });

  it("handles a paragraph element in an element", function() {
    const structureToConvert = [["head"], ["body", ["p", "Hello, world!"]]];
    const convertedStructure = main.toHtml(structureToConvert);
    const expectedHtml = util.stripMargin`
      |<html>
      |  <head></head>
      |  <body>
      |    <p>
      |      Hello, world!
      |    </p>
      |  </body>
      |</html>`;
    assert.equal(convertedStructure, expectedHtml);
  });
});
