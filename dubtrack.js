$("head").append('<style src="https://rawgit.com/Netox005/Test/master/dubtrack.css"/>');

$("head").append('<style>.no-selection,#vidEditDiv{webkit-user-select:none;user-select:none;-moz-user-select:none;-ms-user-select:none;}.left_section:not(fullscreenLeft),#vidEditDiv{position:fixed!important;}#vidEditDiv{cursor:pointer;}</style>');
$(".user-header-menu").prepend('<li><button id="vidEditBtn" style="font-size:1em;height:32px;margin-right:16px;border-radius:0.1875em;z-index:999998;" onclick="videoEdit()">Video Edit</button></li>');
$("#main-room").append('<div id="vidEditDiv" style="background:rgba(255, 190, 0, 0.7);top:0;left:0;display:none;"></div>')

$("#main-menu-left").css("z-index", 999998); // hü3

var video = $(".left_section"), vidEditBtn = $("#vidEditBtn"), vidEditDiv = $("#vidEditDiv");
var editMode = false;

vidEditDiv.css("left", video.offset().left);
vidEditDiv.css("top", video.offset().top);
vidEditDiv.width(video.outerWidth());
vidEditDiv.height(video.outerHeight());

function videoEdit(e) {
    if(editMode) $(document).click();

    $("#vidEditBtn").css("background", editMode ? "inherit" : "white");
    $("#vidEditBtn").css("color", editMode ? "inherit" : "black");
    vidEditDiv.css("display", editMode ? "none" : "block");

    editMode = !editMode;
    console.log("editMode = " + editMode);
}

/* Drag */
var mousePress = false, wasMoved = false;
var lastMousePos = { x: -1, y: -1 };
$(document).mousemove(function(e) {
    if(!editMode) return;
    if(!wasMoved) return;

    var vidPos = video.position();
    var x = vidPos.left + (e.pageX - lastMousePos.x), y = vidPos.top + (e.pageY - lastMousePos.y);

    video.css("left", x + "px");
    video.css("top", y + "px");
    vidEditDiv.css("left", video.offset().left);
    vidEditDiv.css("top", video.offset().top);

    lastMousePos.x = e.pageX;
    lastMousePos.y = e.pageY;
});
vidEditDiv.mousemove(function(e) {
    if(!editMode) return;
    if(!mousePress) return;
    wasMoved = true;
});
vidEditDiv.mousedown(function(e) {
    if(!editMode) return;
    mousePress = true;
    lastMousePos.x = e.pageX;
    lastMousePos.y = e.pageY;
});
$(document).mouseup(function(e) {
    if(!editMode) return;
    mousePress = false;
    wasMoved = false;
});
