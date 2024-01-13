//VARIABLES
var click = new Audio("HTML_images/Click.wav");//click.play();
var host_data = {
    "com": "mapvote",
    "ms": "small",
    "sm":"grasslands",
    "gm":"teamdeathmatch",
    "tl":15,
    "noppt": 50,
    "syt":true,
    "at":"101112131415161718192021222324",
    "bots":true,
    "ds":false,
    "hm": true,
    "ppg": true,
    "supposed_2_B_peer": false,
    "room_name": "",
};
var RM = "";
var was = false;
var ch = "small";
document.getElementById("time-limit").value = 15;
document.getElementById("numofplayers").value = 50;
//EVENT LISTENERS
document.getElementById('mapvote').onchange = (event) => {
    click.play();
    host_data["com"] = document.getElementById('mapvote').value;
    change_sm(document.getElementById('mapvote').value);
}
document.getElementById('startmap').onchange = (event) => {
    click.play();
    host_data["sm"] = document.getElementById('startmap').value;
    document.getElementById('select').src = 'HTML_images/'+document.getElementById('startmap').value+'.png';
}
document.getElementById('mapsize').onchange = (event) => {
    click.play();
    host_data["ms"] = document.getElementById('mapsize').value;
}
document.getElementById('gamemode').onchange = (event) => {
    click.play();
    host_data["gm"] = document.getElementById('gamemode').value;
    change_ms(document.getElementById('gamemode').value);
    change_mp(document.getElementById('gamemode').value);
    if (document.getElementById('gamemode').value != "zombies" && was){
        document.getElementById('select').src = 'HTML_images/grasslands.png';
    }
    if (document.getElementById('gamemode').value == "teamdeathmatch" || document.getElementById('gamemode').value == "capturebases"){
        if (document.getElementById("numofplayers").value % 2 == 1) {
            document.getElementById("numofplayers").value -= -1;
        }
        if (document.getElementById("numofplayers").value < 8) {
            document.getElementById("numofplayers").value = 8;
        }
        if (document.getElementById("numofplayers").value > 100) {
            document.getElementById("numofplayers").value = 100;
        }
    } else if(document.getElementById('gamemode').value == "zombies"){
        if (document.getElementById("numofplayers").value < 1) {
            document.getElementById("numofplayers").value = 1;
        }
        if (document.getElementById("numofplayers").value > 10) {
            document.getElementById("numofplayers").value = 10;
        }
    } else {
        if (document.getElementById("numofplayers").value < 2) {
            document.getElementById("numofplayers").value = 2;
        }
        if (document.getElementById("numofplayers").value > 4) {
            document.getElementById("numofplayers").value = 4;
        }
    }
    if (document.getElementById('gamemode').value == "zombies"){ 
        document.getElementById("time-limit").value = 0;
    } else {
        if (document.getElementById("time-limit").value < 1) {
            document.getElementById("time-limit").value = 1;
        }
        if (document.getElementById("time-limit").value > 60) {
            document.getElementById("time-limit").value = 60;
        }
    }
}
document.getElementById("time-limit").addEventListener("change", function () {
    click.play();
    if (document.getElementById('gamemode').value == "zombies"){ 
        document.getElementById("time-limit").value = 0;
    } else {
        if (document.getElementById("time-limit").value < 1) {
            document.getElementById("time-limit").value = 1;
        }
        if (document.getElementById("time-limit").value > 60) {
            document.getElementById("time-limit").value = 60;
        }
    }
});
document.getElementById("numofplayers").addEventListener("change", function () {
    click.play();
    if (document.getElementById('gamemode').value == "teamdeathmatch" || document.getElementById('gamemode').value == "capturebases"){
        if (document.getElementById("numofplayers").value % 2 == 1) {
            document.getElementById("numofplayers").value -= -1;
        }
        if (document.getElementById("numofplayers").value < 8) {
            document.getElementById("numofplayers").value = 8;
        }
        if (document.getElementById("numofplayers").value > 100) {
            document.getElementById("numofplayers").value = 100;
        }
    } else if(document.getElementById('gamemode').value == "zombies"){
        if (document.getElementById("numofplayers").value < 1) {
            document.getElementById("numofplayers").value = 1;
        }
        if (document.getElementById("numofplayers").value > 10) {
            document.getElementById("numofplayers").value = 10;
        }
    } else {
        if (document.getElementById("numofplayers").value < 2) {
            document.getElementById("numofplayers").value = 2;
        }
        if (document.getElementById("numofplayers").value > 4) {
            document.getElementById("numofplayers").value = 4;
        }
    }
});
//FUNCTION
function GET_FILE(id){
    var data = JSON.parse(localStorage.getItem("TT_Data"));
    return data[id];
}
function changePage(path) {
    click.play();
    if (path == "play.html") {
        RM = GET_FILE("Username") + " ";
        let rand = Math.floor((Math.random() * 13))+1;
        if (document.getElementById('gamemode').value == "teamdeathmatch") {         
            if (rand == 1) {
                RM += "Battle";
            }
            if (rand == 2) {
                RM += "War";
            }
            if (rand == 3) {
                RM += "Clash";
            }
            if (rand == 4) {
                RM += "Bettlefeild";
            }
            if (rand == 5) {
                RM += "Deathmatch";
            }
            if (rand == 6) {
                RM += "Warfare";
            }
            if (rand == 7) {
                RM += "Crusade";
            }
            if (rand == 8) {
                RM += "Struggle";
            }
            if (rand == 9) {
                RM += "Squabble";
            }
            if (rand == 10) {
                RM += "Skirmish";
            }
            if (rand == 11) {
                RM += "Blast";
            }
            if (rand == 12) {
                RM += "Brawl";
            }
            if (rand == 13) {
                RM += "Ruckus";
            }
        }
        if (document.getElementById('gamemode').value == "capturebases") {      
            if (rand == 1) {
                RM += "Seige";
            }
            if (rand == 2) {
                RM += "Conquest";
            }
            if (rand == 3) {
                RM += "Domination";
            }
            if (rand == 4) {
                RM += "Overpower";
            }
            if (rand == 5) {
                RM += "Capture The Bases";
            }
            if (rand == 6) {
                RM += "Rumble";
            }
            if (rand == 7) {
                RM += "Quest";
            }
            if (rand == 8) {
                RM += "Rumble-Bumble";
            }
            if (rand == 9) {
                RM += "Mission";
            }
            if (rand == 10) {
                RM += "Vanquish";
            }
            if (rand == 11) {
                RM += "Fracas";
            }
            if (rand == 12) {
                RM += "Sweep";
            }
            if (rand == 13) {
                RM += "Seize";
            }
        }
        if (document.getElementById('gamemode').value == "miniarena") {         
            if (rand == 1) {
                RM += "Arena";
            }
            if (rand == 2) {
                RM += "Showdown";
            }
            if (rand == 3) {
                RM += "Faceoff";
            }
            if (rand == 4) {
                RM += "Contest";
            }
            if (rand == 5) {
                RM += "Fiesta";
            }
            if (rand == 6) {
                RM += "Duel";
            }
            if (rand == 7) {
                RM += "Mini";
            }
            if (rand == 8) {
                RM += "Scuffle";
            }
            if (rand == 9) {
                RM += "Pandemonium";
            }
            if (rand == 10) {
                RM += "Rumpus";
            }
            if (rand == 11) {
                RM += "Solos";
            }
            if (rand == 12) {
                RM += "Royale";
            }
            if (rand == 13) {
                RM += "Coliseum";
            }
        }
        if (document.getElementById('gamemode').value == "zombies") {
            if (rand == 1) {
                RM += "Apocalypse";
            }
            if (rand == 2) {
                RM += "Zombocalypse";
            }
            if (rand == 3) {
                RM += "Undead";
            }
            if (rand == 4) {
                RM += "Zombies";
            }
            if (rand == 5) {
                RM += "Nightmare";
            }
            if (rand == 6) {
                RM += "Hordes";
            }
            if (rand == 7) {
                RM += "Corpses";
            }
            if (rand == 8) {
                RM += "Chaos";
            }
            if (rand == 9) {
                RM += "Living Dead";
            }
            if (rand == 10) {
                RM += "Terror";
            }
            if (rand == 11) {
                RM += "Hell";
            }
            if (rand == 12) {
                RM += "Curse";
            }
            if (rand == 13) {
                RM += "Horror";
            }
            host_data["com"] == "random";
        }
        if (host_data['ds'] == true){
            RM += " (24/7)";
        }
        host_data["room_name"] = RM;
        if (host_data["gm"] != "teamdeathmatch" && host_data["gm"] != "capturebases") {
            host_data["ds"] = false;
        }
        if (host_data["ppg"] == false) {
            host_data["room_name"] = makeid(8);
        }
        host_data["tl"] = document.getElementById("time-limit").value;
        host_data["noppt"] = document.getElementById("numofplayers").value;
        var change = JSON.parse(localStorage.getItem("TT_Data"));
        change["host_data"] = host_data;
        localStorage.setItem("TT_Data", JSON.stringify(change));
    }
    window.location.href=path;
}
function clicked(id) {
    click.play();
    var change = document.getElementById(id);
    if(change.innerHTML =='<h4>Enabled</h4>'){
        change.innerHTML="<h4>Disabled</h4>";
        host_data[id] = false;
    }else{
        change.innerHTML = "<h4>Enabled</h4>";
        host_data[id] = true;
    }
};
function clickedB(id) {
    click.play();
    var change = document.getElementById(id);
    if(change.innerHTML =='<h4>Public</h4>'){
        change.innerHTML="<h4>Private</h4>";
        host_data[id] = false;
    }else{
        change.innerHTML = "<h4>Public</h4>";
        host_data[id] = true;
    }
};
function handleChange(checkbox) {
    click.play();
    if(checkbox.checked == true){
        if (!host_data["at"].includes((parseInt(checkbox.id.substring(2)) + 10).toString())){
            host_data["at"] += (parseInt(checkbox.id.substring(2)) + 10).toString();
        }
    }else{
        if (host_data["at"].includes((parseInt(checkbox.id.substring(2)) + 10).toString())){
            host_data["at"] = host_data["at"].replace((parseInt(checkbox.id.substring(2)) + 10).toString(), '');
        }
    }
    if (host_data["at"] == "") {
        host_data["at"] = (parseInt(checkbox.id.substring(2)) + 10).toString();
        checkbox.checked = true;
    }
}
function change_sm(what){
    
    if (what !="random" && what != "mapvote"){
        document.getElementById('startmap').value = what;
        document.getElementById('startmap').disabled = true;
        document.getElementById('select').src = 'HTML_images/'+what+'.png';
        host_data["sm"] = what;
    }else{
        document.getElementById('startmap').disabled=false;
    }
}
function change_ms(what){
    if (what =="miniarena"){
        document.getElementById('mapsize').disabled=true;
        host_data["ms"] = "mini";
    } else {
        if (what =="lms"){
            document.getElementById('mapsize').disabled=true;
            host_data["ms"] = "massive";
        }else{
            document.getElementById('mapsize').value = "small";
            host_data["ms"] = "small";
            document.getElementById('mapsize').disabled=false;
        }
    }
}
function change_mp(what){
    if (what == "zombies") {
        was = false;
        document.getElementById('select').src = 'HTML_images/Dead Terror.png';
        document.getElementById('mapsize').disabled = true;
        document.getElementById('startmap').disabled = true;
        document.getElementById('mapvote').disabled = true;
    } else {
        was = true;
        document.getElementById('startmap').disabled = false;
        document.getElementById('mapvote').disabled = false;
        document.getElementById('mapsize').disabled = false;
    }
}
function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
