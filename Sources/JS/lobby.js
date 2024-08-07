var game_list = [];
var game_to_join = 0;
var click = new Audio("HTML_images/Click.wav"); //click.play();
document.getElementById("ERROR").style.display = "none";
document.getElementById("load").style.display = "block";
document.getElementById("noone").style.display = "none";
function changePage(path) {
  if (path == "play.html") {
    var host_data = {
      'com': '0',
      'ms': '0',
      'sm':'0',
      'gm':'0',
      'tl':0,
      'noppt': 0,
      'nobts': 0,
      'syt':true,
      'at': '0',
      'changeTanks': true,
      'ds':false,
      'hm': true,
      'ppg': true,
      'supposed_2_B_peer': true,
      'room_name':
        game_list[game_to_join][0].toString() +
        "," +
        game_list[game_to_join][1].toString() +
        "," +
        game_list[game_to_join][2].toString() +
        "," +
        game_list[game_to_join][3].toString() +
        "," +
        game_list[game_to_join][4].toString() +
        "," +
        game_list[game_to_join][5].toString(),
    };
    var change = JSON.parse(toggle(localStorage.getItem("TT_Data"),true));
    change["host_data"] = host_data;
    localStorage.setItem("TT_Data", toggle(JSON.stringify(change)));
  }
  window.location.href = path;
}
const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDM;
const DBDeleteRequest = indexedDB.deleteDatabase("c3-localstorage-7d0thul63rw");

setTimeout(function () {
  endless_checker();
  async function endless_checker() {
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const request = indexedDB.open("c3-localstorage-7d0thul63rw", 2);
      request.onerror = function (event) {
        document.getElementById("ERROR").style.display = "block";
        document.getElementById("load").style.display = "none";
      };
      request.onsuccess = function () {
        const db = request.result;
        const transaction = db.transaction("keyvaluepairs", "readonly");
        const store = transaction.objectStore("keyvaluepairs");
    
        const idQuery = store.getAll();
        idQuery.onsuccess = function () {
          load_all(idQuery.result);
        };
        idQuery.onerror = function () {
          document.getElementById("ERROR").style.display = "block";
          document.getElementById("load").style.display = "none";
        };
        transaction.oncomplete = function () {
          db.close();
        };
      };
    }
  }
}, 5000);
var deleteAll = 0;
endless_checker();
function load_all(array) {
  lessthanzero = true;
  document.getElementById("pg").classList.remove("off3");
  document.getElementById("pg").onclick = function () {
    private();
  };
  document.getElementById("load").style.display = "none";
  document.getElementById("ERROR").style.display = "none";
  players_online = 0;
  deleteAll += 1;
  if (deleteAll > 20){
    deleteAll = 0;
    if (array.length < 1){
      document.getElementById("list").textContent = "";
    }
  }
  for (let i = 0; i < array.length; i++) {
    document.getElementById("list").textContent = "";
    game_list[i] = array[i].replace(/\[|\]/g, "").split(",");
    if (game_list[i].length > 5){
      var li = document.createElement("li");
      li.id = i.toString();
      var sserv = GET_FILE("Server");
      let w = sserv == "americas" && game_list[i][8] == 0;
      let a = sserv == "europe" && game_list[i][8] == 1;
      let s = sserv == "asia" && game_list[i][8] == 2;
      let d = sserv == "africa" && game_list[i][8] == 3;
      let e = game_list[i][4] == 0;
      if ((w || a || s || d) && e) {
        lessthanzero = false;
        game_list[i][0] = game_list[i][0].replace("?","'");
        let HMP =
          "[" +
          (game_list[i][7] - 500).toString() +
          "/" +
          (game_list[i][6] - 500).toString() +
          "]";
        s = "5";
        players_online += game_list[i][7] - 500;
        if (game_list[i][7] == game_list[i][6]) {
          s = "6";
        }
        li.innerHTML =
          '<div class="list_grid"><h' +
          s +
          ">" +
          game_list[i][0]+
          "</h" +
          s +
          "><h" +
          s +
          ' class="player_count_area">' +
          HMP +
          "</h" +
          s +
          "></div>";
        li.onclick = function () {
          changeGame(i.toString());
        };
        document.getElementById("list").appendChild(li);
      }
    }
  }
  document.getElementById("po").innerHTML =
    "Players Online: " + players_online.toString();
  if (lessthanzero) {
    document.getElementById("noone").style.display = "block";
  } else {
    document.getElementById("noone").style.display = "none";
  }
}
function changeGame(n) {
  click.play();
  n = parseInt(n);
  game_to_join = parseInt(n);
  document.getElementById("h4").style.visibility = "hidden";
  document.getElementById("jg").classList.remove("off");
  document.getElementById("jg").classList.remove("on2");
  document.getElementById("picture").classList.add("on2");
  document.getElementById("potg").innerHTML =
    "Total Players: " +
    (game_list[n][7] - 500).toString() +
    "/" +
    (game_list[n][6] - 500).toString();
  document.getElementById("map").innerHTML = "MAP: ";
  document.getElementById("title").innerHTML = game_list[n][0];
  select = "";
  if (game_list[n][1] == 0) {
    select = "td";
    document.getElementById("gamemode").innerHTML = "Team Deathmatch";
  }
  if (game_list[n][1] == 1) {
    select = "ma";
    document.getElementById("gamemode").innerHTML = "Mini Arena";
  }
  if (game_list[n][1] == 2) {
    select = "cb";
    document.getElementById("gamemode").innerHTML = "Capture The Bases";
  }
  if (game_list[n][1] == 3) {
    select = "z";
    document.getElementById("gamemode").innerHTML = "Zombies";
  }
  if (game_list[n][2] == 0) {
    document.getElementById("map").innerHTML += "Grasslands";
    select += "g";
  }
  if (game_list[n][2] == 1) {
    document.getElementById("map").innerHTML += "Mudlands";
    select += "m";
  }
  if (game_list[n][2] == 2) {
    document.getElementById("map").innerHTML += "Desert";
    select += "d";
  }
  if (game_list[n][2] == 3) {
    document.getElementById("map").innerHTML += "Tropical";
    select += "b";
  }
  if (game_list[n][2] == 4) {
    document.getElementById("map").innerHTML += "Shipyard";
    select += "s";
  }
  if (game_list[n][2] == 5) {
    document.getElementById("map").innerHTML += "Nighttime";
    select += "n";
  }
  if (game_list[n][2] == 7) {
    document.getElementById("map").innerHTML += "Dead Terror";
  }
  if (game_list[n][1] == 3) {
    select = "z";
    document.getElementById("gamemode").innerHTML = "Zombies";
  }
  if (select.includes("td")){
    select += Math.ceil(Math.random() * 2).toString();
  }
  if (select.includes("z")){
    select += Math.ceil(Math.random() * 3).toString();
  }
  if (select.includes("ma")){
    select += "1";
  }
  document.getElementById("picture").style.backgroundImage = "url('Sources/CSS/lobby_images/" + select + ".png')";
  if (game_list[n][1] != 3) {
    if (game_list[n][1] == 1) {
      document.getElementById("map").innerHTML += " (mini)";
    } else {
      if (game_list[n][3] == 0) {
        document.getElementById("map").innerHTML += " (small)";
      }
      if (game_list[n][3] == 1) {
        document.getElementById("map").innerHTML += " (medium)";
      }
      if (game_list[n][3] == 2) {
        document.getElementById("map").innerHTML += " (large)";
      }
    }
  }
  
  if (game_list[n][7] != game_list[n][6]) {
    document
      .getElementById("jg")
      .setAttribute("onClick", "javascript: changePage('play.html')");
    document.getElementById("jg").classList.add("on");
  } else {
    document.getElementById("jg").setAttribute("onClick", "");
    document.getElementById("jg").classList.add("off");
  }
  if (game_list[n][1] != 3) {
    if (game_list[n][5] == 0) {
      document.getElementById("map").innerHTML += " / Map Vote";
    }
    if (game_list[n][5] == 1) {
      document.getElementById("map").innerHTML += " / Random Maps";
    }
    if (game_list[n][5] == 2) {
      document.getElementById("map").innerHTML += " / Grasslands Only";
    }
    if (game_list[n][5] == 3) {
      document.getElementById("map").innerHTML += " / Mudlands Only";
    }
    if (game_list[n][5] == 4) {
      document.getElementById("map").innerHTML += " / Desert Only";
    }
    if (game_list[n][5] == 5) {
      document.getElementById("map").innerHTML += " / Tropical Only";
    }
    if (game_list[n][5] == 6) {
      document.getElementById("map").innerHTML += " / Shipyard Only";
    }
    if (game_list[n][5] == 7) {
      document.getElementById("map").innerHTML += " / Nighttime Only";
    }
  }
}
function GET_FILE(id){
  var data = JSON.parse(toggle(localStorage.getItem("TT_Data"),true));
  return data[id];
}
if (localStorage.getItem("TT_Data") == null) {
  click.play();
  changePage("index.html");
}
function private() {
  var room_found = false;
  const response = prompt(
    "PRIVATE ROOM:\n- If you clicked here by mistake, click cancel\n- If you want to create your own private game, click 'Host Game'\n- Otherwise,\nENTER ROOM CODE:"
  );
  for (let i = 0; i < game_list.length; i++) {
    if (game_list[i][0].includes(response)) {
      game_to_join = i;
      room_found = true;
      break;
    }
  }
  if (room_found) {
    changePage("play.html");
  } else {
    alert(
      "ROOM NOT FOUND / INVALID ROOM CODE\n\nCheck the following:\n- No lowercase\n- No symbols, just letters and numbers\n- Eight total characters, no less, no more"
    );
  }
}
