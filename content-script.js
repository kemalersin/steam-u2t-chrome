const observer = new MutationObserver((mutationList) =>
  mutationList.forEach((m) => {
    chrome.storage.local.get("usdRate").then((result) => {
      if (!result.usdRate) {
        return;
      }

      var regex = /\$([0-9,]+\.\d{2})\s*(USD)?/;
      var elements = document.querySelectorAll(
        ".price, .discount_final_price, .game_purchase_price, .game_area_dlc_price, .your_price div, " +
          ".salepreviewwidgets_StoreSalePriceBox_Wh0L8"
      );

      elements.forEach((element) => {
        if (element.matches(".u2t")) {
          return;
        }

        var match = element.textContent.match(regex);

        if (match) {
          var usdPrice = parseFloat(match[1]);
          var multipliedPrice = usdPrice * result.usdRate;

          var formattedMultipliedPrice = multipliedPrice.toLocaleString(
            "tr-TR",
            {
              style: "currency",
              currency: "TRY",
            }
          );

          element.classList.add("u2t");
          element.textContent += ` (${formattedMultipliedPrice})`;
        }
      });
    });
  })
);

observer.observe(document, { childList: true, subtree: true });
