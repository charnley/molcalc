var osrtan = "998353712";
var pageloaded = 0;
var brMSIE = document.all;
var brOK = document.getElementById;
var brNS = document.getElementById && !document.all;
var brOP = window.opera && window.print;
var queryNum;
var debugOn = false;
var jme1 = "jmeApplet01";
var visPop = "";
var calcEntry = "";
var typSc = 0;

function nullFunction() {
}

function trim(str) {
    if (str != null) { return str.replace(/^\s+|\s+$/g, ""); }
}

function trimAll(str) {
    return str.replace(/\s/g, "");
}

function isNumeric(sText) {
    if (sText == null) { return false; }
    var ValidChars = "0123456789.";
    var IsNumber = true;
    var Char;
    for (var i = 0; i < sText.length && IsNumber == true; i++) {
        Char = sText.charAt(i);
        if (ValidChars.indexOf(Char) == -1) {
            IsNumber = false;
        }
    }
    return IsNumber;
}

function getURL() {
    var callingURL = "";
    var rtnValue = "";
    if (parent.document.location) { callingURL = parent.document.location; }
    if (parent.document.URL) { callingURL = parent.document.URL; }
    rtnValue = callingURL;
    if (callingURL.indexOf('?') != -1) {
        callingURL = unescape(callingURL.substring(callingURL.indexOf('?') + 1, callingURL.length));
        queryNum = callingURL.split('&');
        for (var i = 0; i < queryNum.length; i++) {
            queryNum[i] = queryNum[i].substring(queryNum[i].indexOf('=') + 1, queryNum[i].length);
        }
    }
    return rtnValue;
}

function showPopMod(objId) {
    if (objId == 0) { return; }
    hide("credits"); hide("credits2");
    hidePop();
    var X = 0;
    var Y = 0;
    var adj = 0;
    var obj = document.getElementById('shim');
    typSc = objId;
    while (obj != null) {
        X += obj.offsetLeft;
        Y += obj.offsetTop;
        obj = obj.offsetParent;
    }
    if (isNumeric(objId)) { objId = "popObj" + objId; adj = 6; }
    X = X;
    Y = Y + adj;
    shiftTo(objId, X, Y); changeVis(objId, "visible");
    visPop = objId;
}

function hidePop() {
    typSc = 0;
    if (visPop != "") { hide(visPop); }
}

function getObj(objId) {
    if (isNumeric(objId)) { objId = "mvObj" + objId; }
    if (document.getElementById && document.getElementById(objId)) {
        return document.getElementById(objId).style;
    }
    return false;
}

function changeVis(objId, newVis) {
    var object = getObj(objId);
    if (object) {
        object.visibility = newVis;
    }
}

function show(objId) {
    var object = getObj(objId);
    changeVis(objId, "visible");
}

function hide(objId) {
    changeVis(objId, "hidden");
}

function shiftTo(objId, X, Y) {
    var object = getObj(objId);
    if (object) {
        object.left = "" + X + "px";
        object.top = "" + Y + "px";
    }
}

function objColor(objId, color) {
    var object = getObj(objId);
    if (object.bgColor) {
        object.bgColor = color;
    } else if (typeof object.backgroundColor != "undefined") {
        object.backgroundColor = color;
    }
}

function change(objId, b) {
    if (isNumeric(objId)) { objId = "mvObj" + objId; }
    if (brOK) {
        var thObj = document.getElementById(objId);
        if (thObj) {
            thObj.innerHTML = b;
        }
    }
}

function feedback(txt, fbn) {
    var opArg = (!fbn) ? "" : fbn
    var outTxt = (!txt) ? "" : txt
    var fbId = "feedback" + opArg
    change(fbId, outTxt)
}

function globalInit() {
    if (getURL().toLowerCase().indexOf("localhost") > -1) { debugOn = true; }
    localInit();
}

function chrCk(sTxt, vTxt) {
    var validChrs = vTxt;
    var isValid = true;
    var Char;
    for (var i = 0; i < sTxt.length && isValid == true; i++) {
        Char = sTxt.charAt(i);
        if (validChrs.indexOf(Char) == -1) {
            isValid = false;
        }
    }
    return isValid;
}

function right(str, n) {
    if (n <= 0)
        return "";
    else if (n > String(str).length)
        return str;
    else {
        var iLen = String(str).length;
        return String(str).substring(iLen, iLen - n);
    }
}

function left(str, n) {
    if (n <= 0)
        return "";
    else if (n > String(str).length)
        return str;
    else
        return String(str).substring(0, n);
}

function nlToBar(dataStr) {
    return dataStr.replace(/(\r\n|[\r\n])/g, "|");
}

function rand(l, u) {
    return Math.floor((Math.random() * (u - l + 1)) + l);
}

var req = null;
var isMSIE = false;
var ajaxReturnTxt = "";
var ajaxFocus = "nih";
var xhrTimeout;
function loadXmlData(url, data, data2, async) {
    xhrTimeout = setTimeout("ajaxTimeout();", 20000);
    var mime = "application/x-www-form-urlencoded; charset=UTF-8";
    if (data2 != null) { mime = "application/x-www-form-urlencoded; charset=UTF-8"; }
    try {
        if (window.XMLHttpRequest) {
            req = new XMLHttpRequest();
        } else {
            isMSIE = true
            req = new ActiveXObject("Microsoft.XMLHTTP");
        }
        req.open("POST", url + "?" + data, async);
        if (async == true) {
            req.onreadystatechange = processStateChange;
        }
        req.setRequestHeader("Content-Type", mime);
        req.send(data2);
        if (async == false) {
            ajaxReturnTxt = req.responseText; ajaxDataAction();
        }
    } catch (e) {
        alert(e);
    }
}

function ajaxTimeout() { req.abort(); nihLoadedAction = "timeout"; ajaxReturnTxt = ""; ajaxDataAction(); }

function processStateChange() {
    if (req.readyState != 4) { return; }
    if (req.status != 200) { return; }
    ajaxReturnTxt = req.responseText; ajaxDataAction();
}

function processStateChange2() {
    if (req.readyState != 4) { return; }
    if (req.status != 200) { return; }
    ajaxReturnTxt = req.responseText; ajaxDataAction2();
}

function ajaxDataAction() {
    clearTimeout(xhrTimeout);
    if (ajaxFocus == "nih") { nihDataAction(); }
}

function ajaxDataAction2() {
    if (ajaxFocus == "nih") { nihDataAction(); }
}

function loadXmlData2(url) {
    try {
        if (window.XMLHttpRequest) {
            req = new XMLHttpRequest();
        } else {
            isMSIE = true
            req = new ActiveXObject("Microsoft.XMLHTTP");
        }
        req.open("GET", url, true);
        req.onreadystatechange = processStateChange2;
        req.setRequestHeader("Accept", "text/xml");
        req.send(null);
    } catch (e) {
        alert(e);
    }
}

function createCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

Array.prototype.max = function () {
    var max = this[0];
    var len = this.length;
    for (var i = 1; i < len; i++) if (this[i] > max) max = this[i];
    return max;
}

Array.prototype.min = function () {
    var min = this[0];
    var len = this.length;
    for (var i = 1; i < len; i++) if (this[i] < min) min = this[i];
    return min;
}

function processPress(num) {
    //var key = e.keyCode || e.which;
    var key = num;
    var scpt = "";
    if (keyAction == "calc") {
        update();
    }
    //left up right down i o
    if ((key == 37 || key == 38 || key == 39 || key == 40 || key == 73 || key == 79) && nudgeTyp != "" && parseInt(jmolGetPropertyAsArray("modelInfo.modelCount")) == 1) {
        if (key == 37) { nudgeIt('-1/8 0 0', 'x -5'); return; }
        if (key == 38) { nudgeIt('0 1/8 0 ', 'y 5'); return; }
        if (key == 39) { nudgeIt('1/8 0 0', 'x 5'); return; }
        if (key == 40) { nudgeIt('0 -1/8 0', 'y -5'); return; }
        if (key == 73) { nudgeIt('0 0 -1/8', 'z -5'); return; }
        if (key == 79) { nudgeIt('0 0 1/8', 'z 5'); return; }
    }
    if ((key == 37 || key == 39) && parseInt(jmolGetPropertyAsArray("modelInfo.modelCount")) > 1) {
        var frmArr = jmolGetPropertyAsArray("animationInfo");
        var frmM1 = frmArr.lastModelIndex + 1;
        var frmN1 = frmArr.displayModelIndex + 1;
        if (key == 37) { if (frmN1 == 1) { return; } scpt = "frame " + (frmN1 - 1) + "; var x=" + (frmN1 - 1) + ";echo @x"; }
        if (key == 39) { if (frmN1 == frmM1) { return; } scpt = "frame " + (frmN1 + 1) + "; var x=" + (frmN1 + 1) + ";echo @x"; }
        jmolScript(scpt);
    }
}

document.onkeyup = function keyPress(event) {
    if (typeof event == "undefined") event = window.event;
    wkey = event.keyCode;
    if (document.layers) wkey = event.which;
    processPress(wkey, 6);
}