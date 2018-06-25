exports.toHtml = function toHtml(structureToConvert) {
  const htmlToReturn =
    "<html>" + convertArrayToHtml(structureToConvert, 0) + "</html>";
  return htmlToReturn;
};

function convertArrayToHtml(htmlArray, indentLevel) {
  const adjustedIndentLevel = indentLevel + 2;
  return htmlArray.reduce(function(accumulatedString, elementArray) {
    if (elementArray.length === 1) {
      const elementTag = elementArray[0];
      return (
        accumulatedString +
        " ".repeat(adjustedIndentLevel) +
        `<${elementTag}></${elementTag}>\n`
      );
    }
  }, "\n");
}
