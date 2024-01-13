document.getElementById("vertical-menu").scrollTop = 0;
var click = new Audio("HTML_images/Click.wav");//click.play();
function maintopic(who) {
    click.play();
    if (document.getElementById(who+"sub").className == "SubOpen") {
        document.getElementById(who + "sub").className = "SubClose";
        document.getElementById(who).children[0].style.transform = "rotate(0deg)";
    } else {
        document.getElementById(who + "sub").className = "SubOpen";
        document.getElementById(who).children[0].style.transform = "rotate(90deg)";
    }
}
function changeHeader(id) {
    click.play();
    var myElement = document.getElementById(id);
    var topPos = myElement.offsetTop;
    document.getElementById('container1').scrollTop = topPos;
}