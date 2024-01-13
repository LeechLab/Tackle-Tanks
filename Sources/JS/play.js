var host_data = {
  com: "mapvote",
  ms: "small",
  sm: "grasslands",
  gm: "teamdeathmatch",
  tl: 15,
  noppt: 100,
  syt: true,
  at: "101112131415161718192021222324",
  bots: true,
  ds: false,
  hm: true,
  ppg: true,
  supposed_2_B_peer: false,
  room_name: "",
};
const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDM;
const DBDeleteRequest = indexedDB.deleteDatabase("c3-localstorage-29j20n49g4z");
const DBDeleteRequest2 = indexedDB.deleteDatabase(
  "c3-localstorage-7d0thul63rw"
);

DBDeleteRequest.onsuccess = function (event) {
  const request = indexedDB.open("c3-localstorage-29j20n49g4z", 2);
  var data = JSON.parse(localStorage.getItem("TT_Data"));
  var data = JSON.stringify(data).replace(/\"/g, "'");
  request.onerror = function (event) {};
  request.onupgradeneeded = function (event) {
    const db = request.result;
    db.createObjectStore("keyvaluepairs", {
      autoIncrement: false,
    });
  };
  request.onsuccess = function () {
    const db = request.result;
    const transaction = db.transaction("keyvaluepairs", "readwrite");
    const store = transaction.objectStore("keyvaluepairs");
    store.add(data, "a1");
    transaction.oncomplete = function () {
      db.close();
    };
  };
};
function ScrapAdder() {
  return new Promise(function (resolve) {
    var open = indexedDB.open("c3-localstorage-29j20n49g4z", 2);
    open.onsuccess = function () {
      const db = open.result;
      const transaction = db.transaction("keyvaluepairs", "readwrite");
      const store = transaction.objectStore("keyvaluepairs");
      store.get("Scraps").onsuccess = function (event) {
        store.delete("Scraps");
        return resolve(GET_FILE("Score") + event.target.result);
      };
      transaction.oncomplete = function () {
        db.close();
      };
    };
  });
}
function Leave() {
  var open = indexedDB.open("c3-localstorage-29j20n49g4z", 2);
  open.onsuccess = function () {
    const db = open.result;
    const transaction = db.transaction("keyvaluepairs", "readwrite");
    const store = transaction.objectStore("keyvaluepairs");
    store.get("Leave").onsuccess = function (event) {
      return event.target.result;
    };
    transaction.oncomplete = function () {
      db.close();
    };
  };
}
function SAVE_LINE(id, data) {
  var change = JSON.parse(localStorage.getItem("TT_Data"));
  change[id] = data;
  localStorage.setItem("TT_Data", JSON.stringify(change));
}
function GET_FILE(id) {
  var data = JSON.parse(localStorage.getItem("TT_Data"));
  return data[id];
}
async function endless_checker() {
  while (true) {
    await new Promise((resolve) => setTimeout(resolve, 50));
    let data = await ScrapAdder();
    SAVE_LINE("Score", data);
    let leave = await Leave();
    if (leave != undefined) {
      if (leave.includes("disconnect")) {
        host_data["room_name"] = "Disconnected from Signaling Server";
        SAVE_LINE("host_data", host_data);
        window.location.href = "index.html";
      } else if (leave.includes("error")) {
        host_data["room_name"] = "Some form of Error Occurred";
        window.location.href = "index.html";
      } else if (leave.includes("own volition")) {
        window.location.href = "index.html";
      } else if (leave.includes("host new game not detected")) {
        host_data["room_name"] = "Host new game not detected (Rare Error!)";
        window.location.href = "index.html";
      }
    }
  }
}
document.getElementById("wrapper").src = "Game/game.html";
endless_checker();
