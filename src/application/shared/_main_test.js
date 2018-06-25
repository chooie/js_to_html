const assert = require("_assert");
const main = require("./main.js");

describe("SHARED: Main", function() {
  it("gets valid html", function() {
    const structureToConvert = [];
    const expectedHtml =
          "<html>" + "\n" +
          "</html>";
    assert.equal(main.toHtml(structureToConvert), expectedHtml);
  });
});
