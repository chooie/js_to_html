const assert = require("_assert");
const main = require("./main.js");

describe("SHARED: Main", function() {
  it("gets valid html", function() {
    const structureToConvert = [
      ["head"],
      ["body"],
    ];
    const expectedHtml =
          "<html>" + "\n" +
          "  <head></head>" + "\n" +
          "  <body></body>" + "\n" +
          "</html>";
    assert.equal(main.toHtml(structureToConvert), expectedHtml);
  });
});
