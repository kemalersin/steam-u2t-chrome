function convertHTMLSelectors() {
  var seperator = `:not(.${CUSTOM_HTML_SIGN})`;
  return STEAM_HTML_SELECTORS.join(seperator + ",") + seperator;
}

function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

function getLocalizedPrice(price, fractionDigits) {
  return price.toLocaleString("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}

function getRotationModifier(element) {
  return () =>
    (element.textContent =
      element.textContent === element.dataset.multipliedPrice
        ? element.dataset.originalPrice
        : element.dataset.multipliedPrice);
}
