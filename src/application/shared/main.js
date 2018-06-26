exports.toHtml = function toHtml(structureToConvert) {
  const htmlToReturn =
    "\n<html>" + convertArrayToHtml(structureToConvert, 0) + "</html>";
  return htmlToReturn;
};

function convertArrayToHtml(htmlArray, indentLevel) {
  const adjustedIndentLevel = indentLevel + 2;
  return htmlArray.reduce(function(accumulatedString, elementArray) {
    return (
      accumulatedString +
      convertElementToHtml(adjustedIndentLevel, elementArray)
    );
  }, "\n");
}

function convertElementToHtml(indentLevel, elementArray) {
  if (elementArray.length === 1) {
    const elementTag = elementArray[0];
    return makeStringElement(elementTag, indentLevel);
  } else {
    const elementTag = elementArray[0];
    const elementBody = elementArray[1];

    if (typeof elementBody === "string") {
      const innerElement =
        "\n" +
        fillWhiteSpace(indentLevel + 2) +
        elementBody +
        "\n" +
        fillWhiteSpace(indentLevel);
      return makeStringElement(elementTag, indentLevel, innerElement);
    } else if (Array.isArray(elementBody)) {
      const innerElement =
        "\n" +
        convertElementToHtml(indentLevel + 2, elementBody) +
        fillWhiteSpace(indentLevel);
      return makeStringElement(elementTag, indentLevel, innerElement);
    }
  }
}

function makeStringElement(elementTag, indentLevel, innerElement) {
  if (!innerElement) innerElement = "";
  return (
    fillWhiteSpace(indentLevel) +
    `<${elementTag}>` +
    innerElement +
    `</${elementTag}>\n`
  );
}

function fillWhiteSpace(indentLevel) {
  return " ".repeat(indentLevel);
}
