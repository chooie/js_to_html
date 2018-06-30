const util = require("./util.js");

exports.toHtml = function toHtml(structureToConvert) {
  const htmlToReturn =
    "\n<!DOCTYPE html>\n" + convertElementToHtml(0, structureToConvert);
  return htmlToReturn;
};

function convertElementToHtml(indentLevel, elementArray, arrayContext) {
  if (!Array.isArray(elementArray)) {
    const dataString = JSON.stringify(elementArray, null, 2);
    const dataType = typeof elementArray;
    throw new Error(
      `Expected an element array but got '${dataString}' of type '${dataType}'.`
    );
  }
  if (isEmpty(elementArray)) {
    const contextString = JSON.stringify(arrayContext, null, 2);
    const errorMessage = util.stripMargin`
      |Empty arrays are not a valid input.
      |Context: ${contextString}
      |`;
    throw new Error(errorMessage);
  }
  if (isAnEmptyElement(elementArray)) {
    return handleEmptyElement(indentLevel, elementArray);
  } else {
    return handleNestedElement(indentLevel, elementArray);
  }
}

function isEmpty(array) {
  return array.length === 0;
}

function isAnEmptyElement(elementArray) {
  return (
    elementArray.length === 1 || isAnEmptyElementWithAttributes(elementArray)
  );

  function isAnEmptyElementWithAttributes(elementArray) {
    const secondElement = second(elementArray);
    elementArray.length === 2 &&
      secondElement &&
      typeof secondElement === "object" &&
      !Array.isArray(elementArray);
  }
}

function handleEmptyElement(indentLevel, elementArray) {
  const elementTag = first(elementArray);
  return makeStringElement(elementTag, indentLevel);
}

function handleNestedElement(indentLevel, elementArray) {
  const elementTag = first(elementArray);
  let remainingElements = rest(elementArray);
  const firstRemaining = first(remainingElements);
  let accumulatedString = fillWhiteSpace(indentLevel) + `<${elementTag}`;

  if (typeof firstRemaining === "object" && !Array.isArray(firstRemaining)) {
    remainingElements = rest(remainingElements);
    const keys = Object.keys(firstRemaining);
    keys.forEach(function(key) {
      accumulatedString += " " + key + '="' + firstRemaining[key] + '"';
    });
  }

  accumulatedString += ">\n";
  accumulatedString += convertElementsToHtml(
    accumulatedString,
    remainingElements,
    indentLevel,
    elementArray
  );
  return accumulatedString + fillWhiteSpace(indentLevel) + `</${elementTag}>\n`;
}

function convertElementsToHtml(
  accumulatedString,
  remainingElements,
  indentLevel,
  arrayContext
) {
  return remainingElements.reduce(function(accumulatedString, element) {
    if (typeof element === "string") {
      return (
        accumulatedString + fillWhiteSpace(indentLevel + 2) + element + "\n"
      );
    }
    return (
      accumulatedString +
      convertElementToHtml(indentLevel + 2, element, arrayContext)
    );
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

function second(array) {
  return array[1];
}

function rest(array) {
  return array.slice(1);
}
