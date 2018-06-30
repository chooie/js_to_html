const assert = require("_assert");
const main = require("./main.js");
const util = require("./util.js");

describe("SHARED: Main", function() {
  it("gets valid html", function() {
    const structureToConvert = ["html", ["head"], ["body"]];
    const convertedStructure = main.toHtml(structureToConvert);
    const expectedHtml = util.stripMargin`
      |<!DOCTYPE html>
      |<html>
      |  <head></head>
      |  <body></body>
      |</html>
      |`;
    assert.equal(convertedStructure, expectedHtml);
  });

  it("handles text in element", function() {
    const structureToConvert = ["html", ["head"], ["body", "Hello, world!"]];
    const convertedStructure = main.toHtml(structureToConvert);
    const expectedHtml = util.stripMargin`
      |<!DOCTYPE html>
      |<html>
      |  <head></head>
      |  <body>
      |    Hello, world!
      |  </body>
      |</html>
      |`;
    assert.equal(convertedStructure, expectedHtml);
  });

  it("handles a paragraph element in an element", function() {
    const structureToConvert = [
      "html",
      ["head"],
      ["body", ["p", "Hello, world!"]]
    ];
    const convertedStructure = main.toHtml(structureToConvert);
    const expectedHtml = util.stripMargin`
      |<!DOCTYPE html>
      |<html>
      |  <head></head>
      |  <body>
      |    <p>
      |      Hello, world!
      |    </p>
      |  </body>
      |</html>
      |`;
    assert.equal(convertedStructure, expectedHtml);
  });

  it("handles nested elements", function() {
    const structureToConvert = [
      "html",
      ["head"],
      ["body", ["div", ["p", "Hello, world!"]]]
    ];
    const convertedStructure = main.toHtml(structureToConvert);
    const expectedHtml = util.stripMargin`
      |<!DOCTYPE html>
      |<html>
      |  <head></head>
      |  <body>
      |    <div>
      |      <p>
      |        Hello, world!
      |      </p>
      |    </div>
      |  </body>
      |</html>
      |`;
    assert.equal(convertedStructure, expectedHtml);
  });

  it("handles multiple nested elements", function() {
    const structureToConvert = [
      "html",
      ["head"],
      ["body", ["div", ["h1", "Hello, world!"], ["p", "Goodbye, world!"]]]
    ];
    const convertedStructure = main.toHtml(structureToConvert);
    const expectedHtml = util.stripMargin`
      |<!DOCTYPE html>
      |<html>
      |  <head></head>
      |  <body>
      |    <div>
      |      <h1>
      |        Hello, world!
      |      </h1>
      |      <p>
      |        Goodbye, world!
      |      </p>
      |    </div>
      |  </body>
      |</html>
      |`;
    assert.equal(convertedStructure, expectedHtml);
  });

  it("errors when information is missing or non-array is passed", function() {
    const wrongDataType = "Wrong";
    assert.exception(
      () => main.toHtml(wrongDataType),
      "Expected an element array but got '\"Wrong\"' of type 'string'."
    );
    const emptyArray = ["html", ["div", []]];
    assert.exception(
      () => main.toHtml(emptyArray),
      util.stripMargin`
      |Empty arrays are not a valid input.
      |Context: [
      |  "div",
      |  []
      |]
      |`
    );
  });

  it("handles html attributes for empty elements", function() {
    const structureToConvert = [
      "html",
      ["head"],
      ["body", ["div", ["h1", { class: "class1" }], ["p", { class: "class2" }]]]
    ];
    const convertedStructure = main.toHtml(structureToConvert);
    const expectedHtml = util.stripMargin`
      |<!DOCTYPE html>
      |<html>
      |  <head></head>
      |  <body>
      |    <div>
      |      <h1 class="class1">
      |      </h1>
      |      <p class="class2">
      |      </p>
      |    </div>
      |  </body>
      |</html>
      |`;
    assert.equal(convertedStructure, expectedHtml);
  });

  it("handles html attributes for nested elements", function() {
    const structureToConvert = [
      "html",
      ["head"],
      [
        "body",
        [
          "div",
          ["h1", { class: "class1" }, ["span", "Hello, world!"]],
          ["p", { class: "class2" }, ["span", "Goodbye, world!"]]
        ]
      ]
    ];
    const convertedStructure = main.toHtml(structureToConvert);
    const expectedHtml = util.stripMargin`
      |<!DOCTYPE html>
      |<html>
      |  <head></head>
      |  <body>
      |    <div>
      |      <h1 class="class1">
      |        <span>
      |          Hello, world!
      |        </span>
      |      </h1>
      |      <p class="class2">
      |        <span>
      |          Goodbye, world!
      |        </span>
      |      </p>
      |    </div>
      |  </body>
      |</html>
      |`;
    assert.equal(convertedStructure, expectedHtml);
  });
});
