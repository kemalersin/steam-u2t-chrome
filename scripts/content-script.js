var interval, observer;

chrome.runtime.onMessage.addListener((msg) => {
  if (!msg.update) {
    return;
  }

  if (interval) {
    clearTimeout(interval);
  }

  if (observer) {
    observer.disconnect();
  }

  var elements = document.querySelectorAll(CUSTOM_HTML_SIGN_SELECTOR);

  elements.forEach((element) => {
    element.onmouseover = null;
    element.onmouseout = null;

    element.classList.remove(CUSTOM_HTML_SIGN);
  });

  init(true);
});

function update(data, settings) {
  var selectors = convertHTMLSelectors();
  var elements = document.querySelectorAll(selectors);

  elements.forEach((element) => {
    var originalContent = element.dataset.originalContent || element.textContent;

    var match = originalContent.match(PRICE_REGEX);

    if (match) {
      var usdPrice = parseFloat(match[1]);
      var multipliedPrice = usdPrice * data[STORAGE_KEYS.USD_RATE];
      var fractionDigits = (settings.decimals === DECIMALS.SHOW) ? 2 : 0;
      
      var originalPrice = originalContent.replace(CURRENCY_CODES.USD, "").trim();

      if (settings.commission) {
        multipliedPrice = multipliedPrice * (1 + (settings.commission / 100));
      }      

      multipliedPrice = getLocalizedPrice(multipliedPrice, fractionDigits);

      if (settings.currency === CURRENCIES.TRY) {
        var tmpPrice = multipliedPrice;

        multipliedPrice = originalPrice;
        originalPrice = tmpPrice;
      }

      element.classList.add(CUSTOM_HTML_SIGN);

      element.dataset.originalContent = originalContent;
      element.dataset.originalPrice = originalPrice;
      element.dataset.multipliedPrice = multipliedPrice;

      if (settings.presentation === PRESENTATIONS.SIDE_BY_SIDE) {
        element.innerHTML = `
          ${originalPrice}&nbsp;
          <small>(${multipliedPrice})</small>
          `;
      } else {
        element.textContent = `${originalPrice}`;

        if (settings.presentation === PRESENTATIONS.HOVER) {
          element.style.position = HOVER_STYLE.POSITION;
          element.style.zIndex = HOVER_STYLE.Z_INDEX;

          elementonmouseover = getRotationModifier(element);
          element.onmouseout = getRotationModifier(element);
        }
      }
    }
  });
}

function init(updateData) {
  chrome.storage.local.get(STORAGE_KEYS.USD_RATE).then((data) => {
    if (!data[STORAGE_KEYS.USD_RATE]) {
      return;
    }

    chrome.storage.local
      .get(DEFAULT_OPTIONS)
      .then((settings) => {
        if (settings.presentation === PRESENTATIONS.ROTATIVE) {
          interval = setInterval(() => {
            var elements = document.querySelectorAll(CUSTOM_HTML_DATA_SELECTOR);

            elements.forEach((el) => hover(el)());
          }, ROTATION_TIMEOUT);
        }

        if (updateData) {
          update(data, settings);
        }

        observer = new MutationObserver(() => update(data, settings));

        observer.observe(document, { childList: true, subtree: true });
      });
  });
}

init();
