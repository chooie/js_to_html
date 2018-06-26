exports.toHtml = function toHtml(structureToConvert) {
  const htmlToReturn =
    "\n<!DOCTYPE html>\n" + convertElementToHtml(0, structureToConvert);
  return htmlToReturn;
};

function convertElementToHtml(indentLevel, elementArray) {
  if (isAnEmptyElement(elementArray)) {
    return handleEmptyElement(indentLevel, elementArray);
  } else {
    return handleNestedElement(indentLevel, elementArray);
  }
}

function isAnEmptyElement(elementArray) {
  return elementArray.length === 1;
}

function handleEmptyElement(indentLevel, elementArray) {
  const elementTag = first(elementArray);
  return makeStringElement(elementTag, indentLevel);
}

function handleNestedElement(indentLevel, elementArray) {
  const elementTag = first(elementArray);
  const remainingElements = rest(elementArray);
  let accumulatedString = fillWhiteSpace(indentLevel) + `<${elementTag}>\n`;
  accumulatedString += convertElementsToString(
    accumulatedString,
    remainingElements,
    indentLevel
  );
  return accumulatedString + fillWhiteSpace(indentLevel) + `</${elementTag}>\n`;
}

function convertElementsToString(
  accumulatedString,
  remainingElements,
  indentLevel
) {
  return remainingElements.reduce(function(accumulatedString, element) {
    if (typeof element === "string") {
      return (
        accumulatedString + fillWhiteSpace(indentLevel + 2) + element + "\n"
      );
    }
    return accumulatedString + convertElementToHtml(indentLevel + 2, element);
  }, "");
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

function first(array) {
  return array[0];
}

function rest(array) {
  return array.slice(1);
}
