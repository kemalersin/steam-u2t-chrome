const updateFrequency = 10;
const apiUrl = "https://api.genelpara.com/embed/doviz.json";

function getExchangeRate() {
  fetch(apiUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) =>
      chrome.storage.local.set({ usdRate: response.USD.satis })
    );
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("update", {
    periodInMinutes: updateFrequency,
  });

  chrome.alarms.onAlarm.addListener(() => getExchangeRate());

  getExchangeRate();
});

