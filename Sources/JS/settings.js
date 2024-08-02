var Settings;
var unsaved = true;
var click = new Audio("HTML_images/Click.wav");
function reset(){
    const response = confirm("WARNING:\n    > Resetting to default will get rid of ALL YOUR SETTINGS DATA!\n    > This action is unchangeable. No turning back!\n Are you sure you want to do this?");
    if (response){
        Settings ={
            "Screen-Shake":true,
            "Dim-Flashbang":false,
            "Anonymized-Usernames":false,
            "SFX":50,
            "Show-FPS": true,
            "Effects": true,
            "Particles": true,
            "Image-Quality":"Medium",
            "Object-Limit":0,
            "Move-Up":"w",
            "Move-Down":"s",
            "Move-Left":"a",
            "Move-Right": "d",
            "Reverse":"SHIFT",
            "Shoot":"SPACE",
            "Left-PU":"q",
            "Right-PU":"e",
            "Detonate":"x",
            "Hide-Chat":"t",
            "Chat":"ENTER",
            "Menu":"g",
        }
        document.getElementById("resetr").innerText = "RESETTING...";
        setTimeout(function(){
            SAVE_LINE("Settings", Settings);
            window.location.href="settings.html";
        }, 500);
    }

}
function reset_all(){
    var clearA = confirm("WARNING:\n    > YOU WANT TO GET RID OF ALL USER DATA?!\n    > This action is UNCHANGEABLE! You will lose your Skins, Stats, Coins, even your Username!\n\nAre you sure you want to do this!?");
    if (clearA){
        var clearB = confirm("Are you positive?");
        if (clearB){
            localStorage.removeItem("TT_Data");
            window.location.href="index.html";
        }
    }
}
async function change_key(id) {
    click.play();
    var original = document.getElementById(id).innerText;
    document.getElementById(id).innerText = "PRESS A KEY...";
    await waitingKeypress(id,original);
}
function waitingKeypress(id, original){
    return new Promise((resolve) => {
        document.addEventListener('keydown', onKeyHandler);
        document.addEventListener("mousedown", function(){
            document.getElementById(id).innerText = original;
            document.removeEventListener('keydown', onKeyHandler);
        });
        function onKeyHandler(e) {
            document.removeEventListener('keydown', onKeyHandler);
            var key = e.key.toUpperCase();
            if (key == " "){
                key = "SPACE";
            }
            if (key.length < 2) {
                key = key.toLowerCase();
            }
            if (key == "CAPSLOCK") {
                key = "CAPS";
            }
            if (key == "SCROLLOCK") {
                key = "SCRLK";
            }
            if (key == "BACKSPACE") {
                key = "BACK";
            }
            if (key == "NUMLOCK") {
                key = "NMLK";
            }
            if (key == "CONTROL") {
                key = "CTRL";
            }
            if (key == "F1") {
                key = "FONE";
            }
            if (key == "F2") {
                key = "FTWO";
            }
            if (key == "F3") {
                key = "FTHREE";
            }
            if (key == "F4") {
                key = "FFOUR";
            }
            if (key == "F5") {
                key = "FFIVE";
            }
            if (key == "F6") {
                key = "FSIX";
            }
            if (key == "F7") {
                key = "FSEVEN";
            }
            if (key == "F8") {
                key = "FEIGHT";
            }
            if (key == "F9") {
                key = "FNINE";
            }
            if (key == "F10") {
                key = "FTEN";
            }
            if (key == "F11") {
                key = "FELEVEN";
            }
            if (key == "F12") {
                key = "FTWELVE";
            }
            if(e.keyCode!=27&&Settings["Move-Down"] != key && Settings["Reverse"] != key && Settings["Move-Up"] != key && Settings["Move-Left"] != key && Settings["Move-Right"] != key && Settings["Shoot"] != key && Settings["Left-PU"] != key && Settings["Right-PU"] != key && Settings["Hide-Chat"] != key && Settings["Chat"] != key && Settings["Menu"] != key && Settings["Detonate"] != key && "ARROWUP" != key && "ARROWDOWN" != key&& "ARROWLEFT" != key&& "ARROWRIGHT" != key&& "ESCAPE" != key){
                document.getElementById(id).innerText= key;
                Settings[id] = key;
                original = document.getElementById(id).innerText;
            }else{
                document.getElementById(id).innerText = original;
            };
            if (document.getElementById(id).innerText.length <2){
                Settings[id] = Settings[id].toLowerCase();
                document.getElementById(id).innerText = document.getElementById(id).innerText.toLowerCase();
            }
            resolve();
        }
    });
}
document.getElementById("Object-Limit").addEventListener("change", function() {
    if (document.getElementById("Object-Limit").value < 1000 || document.getElementById("Object-Limit").value > 2000){
        document.getElementById("Object-Limit").value = 0;
    }
});
document.getElementById("Image-Quality").addEventListener("click", function() {
     if (Settings["Image-Quality"] == "High"){
        Settings["Image-Quality"] = "Low";
    }
    else if (Settings["Image-Quality"] == "Medium"){
        Settings["Image-Quality"] = "High";
    }
    else if(Settings["Image-Quality"] == "Low"){
        Settings["Image-Quality"] = "Medium";
    }
    document.getElementById("Image-Quality").innerText =Settings["Image-Quality"];
});
function changePage(path) {
    click.play();
    Settings["Object-Limit"] = document.getElementById("Object-Limit").value;
    SAVE_LINE("Settings", Settings);
    console.log(GET_FILE("Settings"));
    window.location.href=path;
}
function edit(id) {
    click.play();
    if(Settings[id]){
        Settings[id] = false;
    }else{
        if(!Settings[id]){
            Settings[id] = true;
        }
    }
    if (!Settings["Screen-Shake"]){
        document.getElementById("Screen-Shake").innerText = "Disabled";
    }else{
        document.getElementById("Screen-Shake").innerText = "Enabled";
    }
    if (!Settings["Dim-Flashbang"]){
        document.getElementById("Dim-Flashbang").innerText = "Disabled";
    }else{
        document.getElementById("Dim-Flashbang").innerText = "Enabled";
    }
    if (!Settings["Effects"]){
        document.getElementById("Effects").innerText = "Disabled";
    }else{
        document.getElementById("Effects").innerText = "Enabled";
    }
    if (!Settings["Particles"]){
        document.getElementById("Particles").innerText = "Disabled";
    }else{
        document.getElementById("Particles").innerText = "Enabled";
    }
    if (!Settings["Anonymized-Usernames"]){
        document.getElementById("Anonymized-Usernames").innerText = "Disabled";
    }else{
        document.getElementById("Anonymized-Usernames").innerText = "Enabled";
    }
    if (!Settings["Show-FPS"]){
        document.getElementById("Show-FPS").innerText = "Hide";
    }else{
        document.getElementById("Show-FPS").innerText = "Show";
    }
}

//SAVE FILE
function SAVE_LINE(id, data){
    var change = JSON.parse(toggle(localStorage.getItem("TT_Data"),true));
    change[id] = data;
    localStorage.setItem("TT_Data", toggle(JSON.stringify(change),false));
}
function GET_FILE(id){
    var data = JSON.parse(toggle(localStorage.getItem("TT_Data"),true));
    return data[id];
}
if (localStorage.getItem("TT_Data") != null) {
    Settings = GET_FILE("Settings");
    console.log(Settings);
    if (!Settings["Screen-Shake"]){
        document.getElementById("Screen-Shake").innerText = "Disabled";
    }
    if (!Settings["Dim-Flashbang"]){
        document.getElementById("Dim-Flashbang").innerText = "Disabled";
    }
    if (!Settings["Anonymized-Usernames"]){
        document.getElementById("Anonymized-Usernames").innerText = "Disabled";
    }
    if (!Settings["Dim-Flashbang"]){
        document.getElementById("Dim-Flashbang").innerText = "Disabled";
    }
    if (!Settings["Particles"]){
        document.getElementById("Particles").innerText = "Disabled";
    }
    if (!Settings["Effects"]){
        document.getElementById("Effects").innerText = "Disabled";
    }
    if (!Settings["Show-FPS"]){
        document.getElementById("Show-FPS").innerText = "Hide";
    }
    document.getElementById("Image-Quality").innerText = Settings["Image-Quality"];
    document.getElementById("Object-Limit").value = Settings["Object-Limit"];
    document.getElementById("Move-Up").innerText = Settings["Move-Up"];
    document.getElementById("Move-Down").innerText = Settings["Move-Down"];
    document.getElementById("Move-Left").innerText = Settings["Move-Left"];
    document.getElementById("Move-Right").innerText = Settings["Move-Right"];
    document.getElementById("Reverse").innerText = Settings["Reverse"];
    document.getElementById("Shoot").innerText = Settings["Shoot"];
    document.getElementById("Left-PU").innerText = Settings["Left-PU"];
    document.getElementById("Right-PU").innerText = Settings["Right-PU"];
    document.getElementById("Detonate").innerText = Settings["Detonate"];
    document.getElementById("Hide-Chat").innerText = Settings["Hide-Chat"];
    document.getElementById("Chat").innerText = Settings["Chat"];
    document.getElementById("Menu").innerText = Settings["Menu"];
}else{
    Settings ={
        "Screen-Shake":true,
        "Dim-Flashbang":false,
        "Anonymized-Usernames":false,
        "SFX":50,
        "Show-FPS": true,
        "Effects": true,
        "Particles": true,
        "Image-Quality":"Medium",
        "Object-Limit":0,
        "Move-Up":"w",
        "Move-Down":"s",
        "Move-Left":"a",
        "Move-Right": "d",
        "Reverse":"SHIFT",
        "Shoot":"SPACE",
        "Left-PU":"q",
        "Right-PU":"e",
        "Detonate":"x",
        "Hide-Chat":"t",
        "Chat":"ENTER",
        "Menu":"g",
    }
    SAVE_LINE("Settings", Settings);
}
