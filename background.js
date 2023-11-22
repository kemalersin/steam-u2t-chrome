const updateFrequency = 10;
const apiUrl = "https://api.genelpara.com/embed/doviz.json";

chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  if (reason !== "install") {
    return;
  }

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

  await chrome.alarms.create("update", {
    delayInMinutes: 0,
    periodInMinutes: updateFrequency,
  });  
});
