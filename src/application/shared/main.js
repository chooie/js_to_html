exports.toHtml = function toHtml(structureToConvert) {
  const htmlToReturn =
    "\n<html>" + convertArrayToHtml(structureToConvert, 0) + "</html>";
  return htmlToReturn;
};

function convertArrayToHtml(htmlArray, indentLevel) {
  const adjustedIndentLevel = indentLevel + 2;
  return htmlArray.reduce(function(accumulatedString, elementArray) {
    if (elementArray.length === 1) {
      const elementTag = elementArray[0];
      return makeStringElement(
        accumulatedString,
        elementTag,
        adjustedIndentLevel
      );
    } else {
      const elementTag = elementArray[0];
      const elementBody = elementArray[1];
      const innerElement =
        "\n" +
        fillWhiteSpace(adjustedIndentLevel + 2) +
        elementBody +
        "\n" +
        fillWhiteSpace(adjustedIndentLevel);
      return makeStringElement(
        accumulatedString,
        elementTag,
        adjustedIndentLevel,
        innerElement
      );
    }
  }, "\n");
}

function makeStringElement(
  stringToAppend,
  elementTag,
  indentLevel,
  innerElement
) {
  if (!innerElement) innerElement = "";
  return (
    stringToAppend +
    fillWhiteSpace(indentLevel) +
    `<${elementTag}>` +
    innerElement +
    `</${elementTag}>\n`
  );
}

function fillWhiteSpace(indentLevel) {
  return " ".repeat(indentLevel);
}
