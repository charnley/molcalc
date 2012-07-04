function errorHandler(msg, URL, lineNum) {
    if (debugOn) {
        alert(msg + " " + lineNum + " " + URL)
    }
    else {
        document.getElementById("calcDisplay").value = "Calculator Entry Error";
    }
    return true
}

window.onerror = errorHandler

function upcase(check) {
    var upcase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ(";
    for (var i = 0; i < upcase.length; i++)
        if (check == upcase.charAt(i)) { return true; }
    return false;
}

function digit(check) {
    var digit = "1234567890";
    for (var i = 0; i < digit.length; i++)
        if (check == digit.charAt(i)) { return true; }
    return false;
}

function operate(check) {
    var operate = "*/+-[]";
    for (var i = 0; i < operate.length; i++)
        if (check == operate.charAt(i)) { return true; }
    if (check == "") { return true; }
    if (check == null) { return true; }
    return false;
}

function docalc(formula) {
    var H = 1.008
    var He = 4.003
    var Li = 6.941
    var Be = 9.012
    var B = 10.81
    var C = 12.01
    var N = 14.01
    var O = 16.00
    var F = 19.00
    var Ne = 20.18
    var Na = 22.99
    var Mg = 24.30
    var Al = 26.98
    var Si = 28.09
    var P = 30.97
    var S = 32.07
    var Cl = 35.45
    var Ar = 39.95
    var K = 39.10
    var Ca = 40.08
    var Sc = 44.96
    var Ti = 47.88
    var V = 50.94
    var Cr = 52.00
    var Mn = 54.94
    var Fe = 55.85
    var Co = 58.93
    var Ni = 58.69
    var Cu = 63.55
    var Zn = 65.39
    var Ga = 69.72
    var Ge = 72.61
    var As = 74.92
    var Se = 78.96
    var Br = 79.90
    var Kr = 83.80
    var Rb = 85.47
    var Sr = 87.62
    var Y = 88.91
    var Zr = 91.22
    var Nb = 92.91
    var Mo = 95.94
    var Tc = 98.91
    var Ru = 101.1
    var Rh = 102.9
    var Pd = 106.4
    var Ag = 107.9
    var Cd = 112.4
    var In = 114.8
    var Sn = 118.7
    var Sb = 121.8
    var Te = 127.6
    var I = 126.9
    var Xe = 131.3
    var Cs = 132.9
    var Ba = 137.3
    var La = 138.9
    var Ce = 140.1
    var Pr = 140.9
    var Nd = 144.2
    var Pm = 144.9
    var Sm = 150.4
    var Eu = 152.0
    var Gd = 157.2
    var Tb = 158.9
    var Dy = 162.5
    var Ho = 164.9
    var Er = 167.3
    var Tm = 168.9
    var Yb = 173.0
    var Lu = 175.0
    var Hf = 178.5
    var Ta = 180.9
    var W = 183.8
    var Re = 186.2
    var Os = 190.2
    var Ir = 192.2
    var Pt = 195.1
    var Au = 197.0
    var Hg = 200.6
    var Tl = 204.4
    var Pb = 207.2
    var Bi = 209.0
    var Po = 210.0
    var At = 210.0
    var Rn = 222.0
    var Fr = 223.0
    var Ra = 226.0
    var Ac = 227.0
    var Th = 232.0
    var Pa = 231.0
    var U = 238.0
    var Np = 237.0
    var Pu = 244.0
    var Am = 243.0
    var Cm = 247.0
    var Bk = 247.0
    var Cf = 251.0
    var Es = 252.0
    var Fm = 257.0
    var Md = 258.0
    var No = 259.0
    var Lr = 260.0
    var Av = 6.0221415e23
    var Pi = Math.PI
    var Pk = 6.626068e-34
    var Ai = 28.97
    var formulainfo = false
    var parcap = ""
    var newformula = "";
    for (var i = 0; i < formula.length; i++) {
        if (upcase(formula.charAt(i))) { formulainfo = true }
        if (operate(formula.charAt(i))) { formulainfo = false; parcap = "" }
        if (formulainfo) {
            if (operate(formula.charAt(i + 1))) { parcap = ")" }
            if (i == 0) { newformula += "(" + formula.charAt(i) + parcap; continue }
            if (operate(formula.charAt(i - 1))) { newformula += "(" + formula.charAt(i) + parcap }
            else if (formula.charAt(i - 1) == "(") { newformula += formula.charAt(i) + parcap }
            else if (upcase(formula.charAt(i))) { newformula += "+" + formula.charAt(i) + parcap }
            else if (digit(formula.charAt(i - 1))) { newformula += formula.charAt(i) + parcap }
            else if (digit(formula.charAt(i))) { newformula += "*" + formula.charAt(i) + parcap }
            else { newformula += formula.charAt(i) + parcap }
        }
        else {
            if (formula.charAt(i) == "[") { newformula += "(" }
            else if (formula.charAt(i) == "]") { newformula += ")" }
            else { newformula += formula.charAt(i) }
        }
    }
    return roundnum(eval(newformula), 6);
}

function roundnum(num, decs) {
    if (num < 0.01) { return Math.toScientific(num, 7); }
    if (num > 100000) { return Math.toScientific(num, 7); }
    return "" + Math.round(eval(num) * Math.pow(10, decs)) / Math.pow(10, decs);
}

function doStoich() {
    var formula = document.getElementById("calcDisplay").value;
    if (formula != "") {
        var output = docalc(formula);
        document.getElementById("calcDisplay").value = output;
    }
    else { document.getElementById("calcDisplay").value = ""; }
}

function update() {
    if (document.getElementById("calcDisplay").value.substring(0, 1) == "j") {
        eval(document.getElementById("calcDisplay").value.substring(1, document.getElementById("calcDisplay").value.length));
    }
    else {
        calcEntry = document.getElementById("calcDisplay").value;
        doStoich();
    }
}

Math.formatDecimals = function (num, digits) {
    if (digits <= 0)
        return String(Math.round(num));
    if (num < 0) {
        var isNegative = true;
        num *= -1;
    }
    var tenToPower = Math.pow(10, digits);
    var cropped = String(Math.round(num * tenToPower));
    if (num < 1) {
        while (cropped.length < digits + 1)
            cropped = "0" + cropped;
    }
    if (isNegative) cropped = "-" + cropped;
    var roundedNumStr = cropped.slice(0, -digits) + "." + cropped.slice(-digits);
    return roundedNumStr;
}

Math.toScientific = function (num, sigDigs) {
    num = Number(num);
    if (isNaN(num)) return num;
    var exponent = Math.floor(Math.log(Math.abs(num)) / Math.LN10);
    if (num == 0) exponent = 0;
    var tenToPower = Math.pow(10, exponent);
    var mantissa = num / tenToPower;
    mantissa = Math.formatDecimals(mantissa, sigDigs - 1);
    var output = mantissa;
    if (exponent != 0) {
        output += "e" + exponent;
    }
    return (output);
}
