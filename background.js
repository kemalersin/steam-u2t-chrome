const updateFrequency = 10;
const apiUrl = "https://api.genelpara.com/embed/doviz.json";

function setAlarm() {
  chrome.storage.local.get("updateFrequency", (result) => {
    chrome.alarms.clear("update");

    chrome.alarms.create("update", {
      periodInMinutes: result.updateFrequency || updateFrequency,
    });
  });
}

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

chrome.runtime.onInstalled.addListener((details) => {
  chrome.alarms.onAlarm.addListener((alarm) => getExchangeRate());

  setAlarm();
  getExchangeRate();
});

chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.updateAlarm) {
    setAlarm();
  }
});
