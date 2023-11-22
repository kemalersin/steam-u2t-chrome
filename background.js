const delayInMinutes = 0;
const periodInMinutes = 1;

const apiUrl = "https://api.genelpara.com/embed/doviz.json";

chrome.alarms.onAlarm.addListener(() =>
  fetch(apiUrl, {
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
        delayInMinutes,
        periodInMinutes,
      });
    }
  });
});
