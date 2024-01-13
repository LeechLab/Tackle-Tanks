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
function SAVE_LINE(id, data){
    var change = JSON.parse(localStorage.getItem("TT_Data"));
    change[id] = data;
    localStorage.setItem("TT_Data", JSON.stringify(change));
}
function GET_FILE(id){
    var data = JSON.parse(localStorage.getItem("TT_Data"));
    return data[id];
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
if (localStorage.getItem("TT_Data") == null) {
    var userData = {
        "Username": null,
        "Server": "americas",
        "Score": 0,
        "Skins": [0],
        "Equipped-Skin": "0",
        "Settings": {
            "Screen-Shake":true,
            "Dim-Flashbang":false,
            "Anonymized-Usernames":false,
            "SFX":75,
            "Show-FPS": true,
            "Effects": true,
            "Particles": true,
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
            "Menu":"TAB",
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
            "room_name" ="";
        }
    };
    localStorage.setItem("TT_Data", JSON.stringify(userData));
} else {
    document.getElementById('server').value = GET_FILE("Server");
    document.getElementById("Username").value = GET_FILE("Username");
}
document.getElementById("scraps").innerHTML = GET_FILE("Score");
if (GET_FILE("Equipped-Skin") == 59 || GET_FILE("Equipped-Skin") > 78) {
    document.getElementById("skin").src = "HTML_images/Skins/" + GET_FILE("Equipped-Skin") + ".gif";
} else {
    document.getElementById("skin").src = "HTML_images/Skins/" + GET_FILE("Equipped-Skin") + ".svg";
}
let a = GET_FILE("host_data");
document.getElementById("username-error").style.visibility = "visible";
document.getElementById("username-error").innerHTML = a["room_name"];
