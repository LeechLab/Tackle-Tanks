var SKIN;
var RAND;
var click = new Audio("HTML_images/Click.wav");//click.play();
var bout = new Audio("HTML_images/Buy.wav");//click.play();
const skin_name = [
    "Basic",
    "Battle Trained",
    "Support",
    "Point Fighter",
    "Squad Leader",
    "Frontlines",
    "Welcome to Tackle Tanks",
    "Veins",
    "Scoreboard",
    "Cold As Ice",
    "Handicapped",
    "LITTERally Trash",
    "Toy Tank",
    "Burger Tank",
    "Turkey Tank",
    "Pixel - Yellow",
    "Pixel - Blue",
    "Mosaic - White",
    "Mosaic - Black",
    "Team Medic",
    "Team Grenadier",
    "Stripes of Valor",
    "Splinter - Sky",
    "Splinter - Clouds",
    "Splinter - Aerosols",
    "Making Scraps",
    "Gems",
    "Zombie Splatters",
    "Plunder Yee Booty",
    "Fear the Corrosive",
    "Fear the Napalm",
    "Cracks - Avacado",
    "Cracks - Polar",
    "Cracks - Rose Gold",
    "Race Tank",
    "Night Trolley",
    "Camo - Fog",
    "Camo - Winter",
    "Camo - Party",
    "Demo Man",
    "Boat Tank",
    "Desert Cover",
    "Jungle Cover",
    "Tropical Ghillie",
    "Grasslands Ghillie",
    "RC Tank",
    "Zombie Tear",
    "APC - Moss",
    "APC - Stome",
    "Ripple - Coral",
    "Ripple - Serenity",
    "Ripple - Sahara",
    "Tracked Armor - Platinum",
    "Tracked Armor - Rust",
    "Fear the Mini",
    "Box - Shipping",
    "Box - Astro",
    "Parts - Bare",
    "Parts - Plastic Cover",
    "Holo Tank",
    "Rover - Deep Space",
    "Rover - Deep Sea",
    "Hexed - Cool",
    "Hexed - Warm",
    "Hexed - Neutral",
    "Voltaic - Lavender",
    "Voltaic - Leather",
    "Voltaic - Cyber",
    "M1 Abrams",
    "T14 Armata",
    "Stridsvagn 103",
    "Buggy",
    "BearCat G3",
    "Shipyard Constructions",
    "Old Ironclad",
    "Glass Vectors - Diamond",
    "Glass Vectors - Bronze",
    "Hover Tank",
    "Cherry Blossoms - 50000 Checkpoint",
    "Battle Tested",
    "Tackle Tank",
    "Coolant System",
    "Whirlpool - Infinite",
    "Fear the Missile ( Swarm Loader )",
    "Protect the FOB",
    "MASTERY - 100000 Checkpoint"
];
const price = [
    0,
    500,
    500,
    500,
    500,
    500,
    1000,
    1500,
    1500,
    1500,
    1750,
    1750,
    1750,
    2250,
    2250,
    2500,
    2500,
    3000,
    3000,
    3500,
    3500,
    4000,
    5000,
    5000,
    5000,
    6500,
    7000,
    7500,
    8000,
    8500,
    8500,
    9000,
    9000,
    9000,
    9500,
    9500,
    10000,
    10000,
    10000,
    10500,
    10500,
    11000,
    11000,
    11500,
    11500,
    12000,
    13000,
    14000,
    14000,
    14500,
    14500,
    14500,
    15000,
    15000,
    16500,
    17750,
    17750,
    18000,
    18000,
    19500,
    20000,
    20000,
    22500,
    22500,
    22500,
    25000,
    25000,
    25000,
    30000,
    30000,
    30000,
    35000,
    37500,
    40000,
    42500,
    45000,
    45000,
    47500,
    50000,
    60000,
    70000,
    75000,
    80000,
    90000,
    95000,
    100000,

];
function changePage(path) {
    window.location.href=path;
}
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
function changeSkin(skin) {
    click.play();
    document.getElementById("skin").src = skin;
    SKIN = skin;
    document.getElementById("base").classList.remove("equippedSkin");
    document.getElementById("base").classList.remove("hasSkin");
    document.getElementById("base").classList.remove("skinButton");
    document.getElementById("skin_name").innerHTML = skin_name[parseInt(skin.replace("HTML_images/Skins/", "").replace(".svg", "").replace(".gif", ""))];
    if (GET_FILE("Score") >= price[parseInt(skin.replace("HTML_images/Skins/", "").replace(".svg", "").replace(".gif", ""))]) {
        document.getElementById("buy").innerHTML = "BUY FOR " + price[parseInt(skin.replace("HTML_images/Skins/", "").replace(".svg", "").replace(".gif", ""))] + "?";
        document.getElementById("buy").className = "Buy";
    } else {
        document.getElementById("buy").innerHTML = "NOT ENOUGH SCRAPS! (" + price[parseInt(skin.replace("HTML_images/Skins/", "").replace(".svg", "").replace(".gif", ""))] + ")";
        document.getElementById("buy").className = "noBuy";
    }
    document.getElementById("base").classList.add(document.getElementById("Skin_" + skin.replace("HTML_images/Skins/", "").replace(".svg", "").replace(".gif", "")).className);
    if (document.getElementById("base").className.includes("hasSkin")) {
        change_button_type("equip");
    } else if (document.getElementById("base").className.includes("equippedSkin")) {
        change_button_type("equipped");
    } else {
        change_button_type("buy");
    }
}
function buy() {
    bout.play();
    if (GET_FILE("Score") >= price[skin_name.indexOf(document.getElementById("skin_name").innerHTML).toString()]) {
        const response = confirm("This skin has a cost of " + price[skin_name.indexOf(document.getElementById("skin_name").innerHTML).toString()] + " Scraps.\n\nAre you sure you want to buy this skin?");
        if (response) {
            let array = GET_FILE("Skins");
            array[array.length] = skin_name.indexOf(document.getElementById("skin_name").innerHTML);
            SAVE_LINE("Score", GET_FILE("Score") - price[skin_name.indexOf(document.getElementById("skin_name").innerHTML).toString()]);
            SAVE_LINE("Skins", array);
            document.getElementById("scraps").innerHTML = GET_FILE("Score");
            equip();
        }
    }
}
function equip() {
    document.getElementById("Skin_" + GET_FILE("Equipped-Skin")).className = "hasSkin";
    SAVE_LINE("Equipped-Skin", skin_name.indexOf(document.getElementById("skin_name").innerHTML).toString());
    change_button_type("equipped");
    document.getElementById("base").classList.remove("equippedSkin");
    document.getElementById("base").classList.remove("hasSkin");
    document.getElementById("base").classList.remove("skinButton");
    document.getElementById("base").classList.add("equippedSkin");
    document.getElementById("Skin_" + skin_name.indexOf(document.getElementById("skin_name").innerHTML).toString()).className = "equippedSkin";
}
function change_button_type(Class) {
    document.getElementById("equip").style.visibility = "hidden";
    document.getElementById("buy").style.visibility = "hidden";
    document.getElementById("equipped").style.visibility = "hidden";
    if (Class == "equip") {
        document.getElementById("button_grid").style.gridTemplateRows = "100% 0% 0%";
    } else if(Class == "equipped"){
        document.getElementById("button_grid").style.gridTemplateRows = "0% 100% 0%";
    } else {
        document.getElementById("button_grid").style.gridTemplateRows = "0% 0% 100%";
    }
    document.getElementById(Class).style.visibility = "visible";
}
//SAVE FILE
function SAVE_LINE(id, data){
    var change = JSON.parse(localStorage.getItem("TT_Data"));
    change[id] = data;
    localStorage.setItem("TT_Data", JSON.stringify(change));
}
function GET_FILE(id){
    var data = JSON.parse(localStorage.getItem("TT_Data"));
    return data[id];
}
if (localStorage.getItem("TT_Data") != null) {
    if (GET_FILE("Equipped-Skin") == 59 || GET_FILE("Equipped-Skin") > 78) {
        document.getElementById("skin").src = "HTML_images/Skins/" + GET_FILE("Equipped-Skin") + ".gif";
    } else {
        document.getElementById("skin").src = "HTML_images/Skins/" + GET_FILE("Equipped-Skin") + ".svg";
    }
    saved_skins = GET_FILE("Skins");
    document.getElementById("scraps").innerHTML = GET_FILE("Score");
    scraps = GET_FILE("Score");
    document.getElementById("button_grid").style.gridTemplateRows = "0% 100% 0%";
    document.getElementById("equip").style.visibility = "hidden";
    document.getElementById("buy").style.visibility = "hidden";
    document.getElementById("equipped").style.visibility = "visibile";
    for (let i = 0; i <= 85; i++){
        let ima = document.createElement("img");
        if (i.toString() == GET_FILE("Equipped-Skin")) {
            ima.className = "equippedSkin";
        } else {
            if (GET_FILE("Skins").includes(i)) {
                ima.className = "hasSkin";
            } else {
                ima.className = "skinButton";
            }
        }
        ima.id = "Skin_"+i.toString();
        document.getElementById("grid_stretch").appendChild(ima);
        if (i != 59 && i < 79) {
            ima.src = "HTML_images/Skins/" + i.toString() + ".svg";
            ima.onclick = function(){ changeSkin("HTML_images/Skins/" + i.toString() + ".svg"); };
        } else {
            ima.src = "HTML_images/Skins/" + i.toString() + ".gif";
            ima.onclick = function(){ changeSkin("HTML_images/Skins/" + i.toString() + ".gif"); };
        }
        if (i % 5 == 0) {
            document.getElementById("grid_stretch").style.gridTemplateRows += " 17%";
        }
    }
}else{
    changePage("index.html");
}