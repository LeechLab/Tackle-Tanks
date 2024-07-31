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
// DELETE THIS!!!!!/\/\/\/\/////\/\
var treasureChest = "";
var TREASURE_MAP = "b2c7d8e4a091f3b45f72a3c947adbe805b4a6c1f3e7d2d8c90ef1a4b677c5d0e94f6e8a3c1b7c8d2e0f9b9a1c7e3a4b55d8e9f6c1a2d4b3f6e7a9d3b0c1e2f4a5b6f7d9c0e2a8b7d6e4f8c3d5a9b1f6e2d7c0a8b9f4e7d5c3b8a6d1e0f2f3c7a9b5e6d8c4f3a1e2b7d9c0a4e6f2d7c9b8a5e3d4f0c1a6b7d9e8f2c3d0e4f5a6b7c8d9f2e3a4b5d6c7e8f1";

function toggle(dec, what) {
  treasureChest = dec;
  vault(what);
  return treasureChest;
}