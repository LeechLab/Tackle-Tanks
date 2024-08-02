// VARIABLES
document.getElementById("username-error").style.visibility = "hidden";
// EVENTS
var click = new Audio("HTML_images/Click.wav");//click.play();
document.addEventListener("DOMContentLoaded", function () {
    var pointer = document.getElementById("pointer");
    pointerBox = pointer.getBoundingClientRect(),
        centerPoint = window.getComputedStyle(pointer).transformOrigin,
        centers = centerPoint.split(" ");

    function rotatePointer(e) {
        var pointerEvent = e;
        if (e.targetTouches && e.targetTouches[0]) {
            e.preventDefault();
            pointerEvent = e.targetTouches[0];
            mouseX = pointerEvent.pageX;
            mouseY = pointerEvent.pageY;
        } else {
            mouseX = e.clientX,
                mouseY = e.clientY;
        }

        var centerY = pointerBox.top + parseInt(centers[1]) - window.pageYOffset,
            centerX = pointerBox.left + parseInt(centers[0]) - window.pageXOffset,
            radians = Math.atan2(mouseX - centerX, mouseY - centerY),
            degrees = (radians * (180 / Math.PI) * -1) + 180;
        pointer.style.transform = 'rotate(' + degrees + 'deg)';
    }

    window.addEventListener('mousemove', rotatePointer);
    window.addEventListener('touchmove', rotatePointer);
    window.addEventListener('touchstart', rotatePointer);
});
document.getElementById("Username").addEventListener("focusout", function () {
    if (error(document.getElementById("Username").value)=="null"){
        document.getElementById("username-error").style.visibility = "hidden";
        SAVE_LINE("Username",document.getElementById("Username").value);
    } else {
        document.getElementById("username-error").innerHTML = error(document.getElementById("Username").value);
        document.getElementById("username-error").style.visibility = "visible";
    }
});
document.getElementById('server').onchange = (event) => {
    click.play();
    SAVE_LINE("Server", document.getElementById('server').value);
}

// FUNCIONS
function changePage(path) {
    click.play();
    if (path == "lobby.html" && (error(document.getElementById("Username").value)!="null")){
        document.getElementById("username-error").style.visibility = "visible";
        document.getElementById("username-error").innerHTML = error(document.getElementById("Username").value);
    }else{
        window.location.href=path;
    }
}
function SAVE_LINE(id, data) {
    try {
        var change = JSON.parse(toggle(localStorage.getItem("TT_Data"),true));
        change[id] = data;
        localStorage.setItem("TT_Data", toggle(JSON.stringify(change),false));
    } catch (error) {
        localStorage.removeItem("TT_Data");
        checkTTDATA()
    }
}
function GET_FILE(id) {
    try {
        var data = JSON.parse(toggle(localStorage.getItem("TT_Data"),true));
        return data[id];
    } catch (error) {
        localStorage.removeItem("TT_Data");
        checkTTDATA()
    }
}
function error(nou) {
    if (nou.length < 4) {
        return "You must have more than 3 characters in your username!";
    } else if (nou.length > 15) {
        return "You must have less than 16 characters in your username!";
    } else if (nou.includes("{") || nou.includes("}")||nou.includes("[") || nou.includes("]") || nou.includes('"') || nou.includes("'")|| nou.includes(",")|| nou.includes(".")|| nou.includes(":")|| nou.includes(";")|| nou.includes("/")|| nou.indexOf('\\') >= 0){
        return "Username contains an invalid symbol!";
    } else {
        return "null";
    }
}
checkTTDATA()
var ss = GET_FILE("Score");
if (ss < 1) {
    document.getElementById("scraps").innerHTML = 0;
} else {
    document.getElementById("scraps").innerHTML = ss;
}
var server_error = GET_FILE("host_data")["room_name"];
if (server_error != undefined){
    if (server_error.includes("[X] Error")){
        document.getElementById("username-error").style.visibility = "visible";
        document.getElementById("username-error").innerHTML = server_error;
    }
}
var equiped_skin = GET_FILE("Equipped-Skin");
if (equiped_skin == 59 || equiped_skin > 78) {
    document.getElementById("skin").src = "HTML_images/Skins/" + equiped_skin + ".gif";
} else {
    document.getElementById("skin").src = "HTML_images/Skins/" + equiped_skin + ".svg";
}
function checkTTDATA() {
    if (localStorage.getItem("TT_Data") == null) {
        var userData = {
            "Username": null,
            "Server": "americas",
            "Score": 0,
            "Skins": [0],
            "Equipped-Skin": "0",
            "Settings": {
                "Screen-Shake": true,
                "Dim-Flashbang": false,
                "Anonymized-Usernames": false,
                "SFX": 50,
                "Show-FPS": true,
                "Effects": true,
                "Particles": true,
                "Image-Quality": "Medium",
                "Object-Limit": 0,
                "Move-Up": "w",
                "Move-Down": "s",
                "Move-Left": "a",
                "Move-Right": "d",
                "Reverse": "SHIFT",
                "Shoot": "SPACE",
                "Left-PU": "q",
                "Right-PU": "e",
                "Detonate": "x",
                "Hide-Chat": "t",
                "Chat": "ENTER",
                "Menu": "TAB",
            },
            "host_data": {
                "com": "mapvote",
                "ms": "small",
                "sm": "grasslands",
                "gm": "teamdeathmatch",
                "tl": 15,
                "noppt": 100,
                "syt": true,
                "at": "101112131415161718192021222324",
                "bots": true,
                "ds": false,
                "hm": true,
                "ppg": true,
                "supposed_2_B_peer": false,
            }
        };
        localStorage.setItem("TT_Data", toggle(JSON.stringify(userData),false));
    } else {
        document.getElementById('server').value = GET_FILE("Server");
        document.getElementById("Username").value = GET_FILE("Username");
    }
}
