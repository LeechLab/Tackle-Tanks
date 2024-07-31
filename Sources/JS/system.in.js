function vault(slide) {
  var x = 1;
  for (var i = 0; i < treasureChest.length; i++) {
    var l = parseInt(TREASURE_MAP[x - 1] + TREASURE_MAP[x], 16);
    if (slide) {
      var j = treasureChest.charCodeAt(i) - l;
    } else {
      var j = treasureChest.charCodeAt(i) + l;
    }
    thatsit = false;
    treasureChest = treasureChest.split("");
    treasureChest[i] = String.fromCharCode(j);
    treasureChest = treasureChest.join("");
    x += 1;
    if (x > 255) {
      x = 1;
    }
  }
}
var treasureChest = "";
var TREASURE_MAP = TT_EHK;
function toggle(dec, what) {
  treasureChest = dec;
  vault(what);
  return treasureChest;
}
