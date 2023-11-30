function convertHTMLSelectors() {
    return STEAM_HTML_SELECTORS.join(`:not(.${CUSTOM_HTML_SIGN}),`)
}

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

function getLocalizedPrice(price, fractionDigits) {
  return price.toLocaleString("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })
}

function getRotationModifier(element) {
    return () =>
      (element.textContent =
        element.textContent === element.dataset.multipliedPrice
          ? element.dataset.originalPrice
          : element.dataset.multipliedPrice);
  }  