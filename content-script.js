const regex = /\$([0-9,]+\.\d{2})\s*(USD)?/;

const selectors = ".price:not(.u2t), .discount_final_price:not(.u2t), " +
"#search_suggestion_contents .match_subtitle:not(.u2t), " +
".game_purchase_price:not(.u2t), .game_area_dlc_price:not(.u2t), " +
".your_price div:not(.u2t), .salepreviewwidgets_StoreSalePriceBox_Wh0L8:not(.u2t)";

chrome.storage.local.get("usdRate").then((result) => {
  if (!result.usdRate) {
    return;
  }

  const observer = new MutationObserver(() => {
    var elements = document.querySelectorAll(selectors);

    elements.forEach((element) => {
      var match = element.textContent.match(regex);

      if (match) {
        var usdPrice = parseFloat(match[1]);
        var multipliedPrice = usdPrice * result.usdRate;

        var formattedMultipliedPrice = multipliedPrice.toLocaleString("tr-TR", {
          style: "currency",
          currency: "TRY",
        });

        element.classList.add("u2t");

        element.textContent = `${element.textContent.replace(
          "USD",
          ""
        )} (${formattedMultipliedPrice})`;
      }
    });
  });

  observer.observe(document, { childList: true, subtree: true });
});
