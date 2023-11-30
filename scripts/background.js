const DELAY_IN_MINUTES = 0;
const PERIOD_IN_MINUTES = 10;

const API_URL = "https://api.genelpara.com/embed/doviz.json";

chrome.alarms.onAlarm.addListener(() =>
  fetch(API_URL, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) =>
      chrome.storage.local.set({ usdRate: response.USD.satis })
    )
);

chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.get("alarm", (alarm) => {
    if (!alarm) {
      chrome.alarms.create("alarm", {
        delayInMinutes: DELAY_IN_MINUTES,
        periodInMinutes: PERIOD_IN_MINUTES,
      });
    }
  });
});
