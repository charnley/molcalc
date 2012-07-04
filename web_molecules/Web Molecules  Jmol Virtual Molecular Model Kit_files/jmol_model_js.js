var atomColor = "cpk";
var jmolDebugOn = false;
var bkgdColor = "black";
var rotationPicOn = false;
var colorPicOn = false;
var measPicOn = false;
var deletePicOn = false;
var memVar1 = "";
var memVar2 = "";
var memVar3 = "";
var loadScpt = "color label pink;select formalCharge <> 0;label %C;set echo top left;font echo 16 sansserif;color echo yellow;select *;";
var atomPicState = "11aC";
var bondPicState = "15qp";
var altSmiles = "";
var jmolSmiles = "";
var nihSmiles = "";
var nihName = "";
var calcWinTxt = "";
var nihLoadedAction = "nothing";
var loadAppend = "";
var moData = false;
var animData = false;
var animCounter = 0;
var animHolder = "";
var animActive = false;
var kitid = "";
var picDataString = "";
var picSz = "300";
var picType = 0;
var replAtom = "I";
var tempLoaded = false;
var dbMfNow = "";
var uffoff = false;
var readInfo = "";
var readAction = 0;
var pauseMode = 1;
var remoteLoad = "";
var promptMol = "acetic acid";
var mepOn = false;
var mepsData = false;
var nCap = false;
var keyAction = "";

function osrScript(script) {
    script = (!script) ? document.getElementById("script").value : script;
    loadAppend = "";
    var scpt = script; var modMove = "";
    var queryStr = ""; var spt; var dataSv = "";
    if (scpt.toLowerCase().indexOf("aka") > -1) { dataConnects(1); return; }
    if (scpt.toLowerCase().indexOf("chemagicanimation") > -1) { frameAnimate(5); return; }
    if (scpt.toLowerCase().indexOf("debug") == 0) { jmolDebugOn = true; feedback(memVar1 + " | " + memVar2, 1); memVar1 = ""; memVar2 = ""; return; }
    if (scpt.toLowerCase().indexOf("templateoff") == 0) { tempLoaded = false; return; }
    if (scpt.toLowerCase().indexOf("appendnih") == 0) { scpt = scpt.replace(/appendnih/i, "loadnih"); loadAppend = "append"; }
    if (scpt.toLowerCase().indexOf("appendvmk") == 0) { scpt = scpt.replace(/appendvmk/i, "loadvmk"); loadAppend = "append"; }
    if (scpt.toLowerCase().indexOf("appendpub") == 0) { scpt = scpt.replace(/appendpub/i, "loadpub"); loadAppend = "append"; }
    if (scpt.toLowerCase().indexOf("appendspi") == 0) { scpt = scpt.replace(/appendspi/i, "loadspi"); loadAppend = "append"; }
    if (scpt.toLowerCase().indexOf("molfile") == 0) { getMolFile(2); return; }
    if (scpt.toLowerCase().indexOf("logon") == 0) {
        if (scpt.toLowerCase().indexOf("logon") == 0) { scpt = (trim(scpt.replace(/logon/i, ""))); }
        if (scpt == "osr") { scpt = "993146506"; }
        if (scpt == "tan") { scpt = "993146505"; }
        if (scpt == "tan0") { scpt = "993146520"; }
        if (scpt == "tan1") { scpt = "993146521"; }
        if (scpt == "tan2") { scpt = "993146522"; }
        if (scpt == "tan3") { scpt = "993146523"; }
        if (scpt == "tan4") { scpt = "993146524"; }
        if (scpt == "tan5") { scpt = "993146525"; }
        if (scpt == "tan6") { scpt = "993146526"; }
        if (scpt == "tan7") { scpt = "993146527"; }
        if (scpt == "tan8") { scpt = "993146528"; }
        if (scpt == "tan9") { scpt = "993146529"; }
        if (scpt == "osr0") { scpt = "993146530"; }
        if (scpt == "osr1") { scpt = "993146531"; }
        if (scpt == "osr2") { scpt = "993146532"; }
        if (scpt == "osr3") { scpt = "993146533"; }
        if (scpt == "osr4") { scpt = "993146534"; }
        if (scpt == "osr5") { scpt = "993146535"; }
        if (scpt == "osr6") { scpt = "993146536"; }
        if (scpt == "osr7") { scpt = "993146537"; }
        if (scpt == "osr8") { scpt = "993146538"; }
        if (scpt == "osr9") { scpt = "993146539"; }
        if (scpt.length == 9 && isNumeric(scpt) == true) {
            eraseCookie("cmkit235"); kitid = "";
            createCookie("cmkit235", scpt, 365); kitid = scpt;
            jmolScript("set echo top left;font echo 16 sansserif;color echo yellow;echo Model kit number " + kitid + " set."); document.getElementById("script").value = ""; return;
        }
        alert("The logon syntax is logon #########. The nine digit number becomes your multi-user model kit number."); return;
    }
    if (scpt.toLowerCase().indexOf("logoff") == 0) { eraseCookie("cmkit235"); kitid = ""; return; }
    if (scpt.toLowerCase().indexOf("smilesvmk") == 0) {
        feedback(jmolSmiles, "3"); return;
    }
    if (scpt.toLowerCase().indexOf("loadnih") == 0) {
        mepsData = false; jmolScript("isosurface delete; set echo top left;font echo 16 sansserif;color echo yellow; echo Please wait.|Contacting database.");
        scpt = trim(scpt.replace(/loadnih/i, ""));
        scpt = smilesEscape(trim(scpt), 1);
        loadMolJmol(scpt, loadAppend, "nih.aspx?smi2sdf=");
        return;
    }
    if (scpt.toLowerCase().indexOf("loadpub") == 0) {
        mepsData = false; jmolScript("isosurface delete; set echo top left;font echo 16 sansserif;color echo yellow; echo Please wait.|Contacting database.");
        scpt = trim(scpt.replace(/loadpub/i, ""));
        if (isNumeric(scpt)) { loadMolJmol(scpt, loadAppend, "nih.aspx?cid2sdf="); return; }
        nihLoadedAction = "pubchem"; loadXmlData("pubchem.aspx", "name2cid=\"" + scpt + "\"[completesynonym] OR \"" + scpt + "\"[iupac] OR \"" + scpt + "\"[InChI] OR \"" + scpt + "\"[InChIKey]", null, false);
        return;
    }
    if (scpt.toLowerCase().indexOf("loadspi") == 0) {
        mepsData = false; jmolScript("isosurface delete; set echo top left;font echo 16 sansserif;color echo yellow; echo Please wait.|Contacting database.");
        scpt = trim(scpt.replace(/loadspi/i, ""));
        if (isNumeric(scpt)) { loadMolJmol(scpt, loadAppend, "pubchem.aspx?csid2sdf="); return; }
        nihLoadedAction = "chemspi"; loadXmlData("pubchem.aspx", "name2csid=\"" + smilesEscape(scpt,1) + "\"", null, false);
        return;
    }
    if (scpt.toLowerCase().indexOf("loadvmk") == 0) {
        scpt = trim(scpt.replace(/loadvmk/i, ""));
        if (isNumeric(scpt)) { qDB("id=" + scpt, 5) } else { qDB("nm=" + scpt, 6) }
        return;
    }
    if (scpt.substring(0, 1) == "~") {
        eval(scpt.substring(1, scpt.length));
        return;
    }
    if (scpt.indexOf("TRIPOS") > -1 || scpt.indexOf("M  END") > -1) {
        clearMessages(); loadFromString(3); return;
    }
    jmolScript(loadScpt);
    jmolScript(scpt);
}

function processMessage(appNum, msg1, msg2) {
    msg1 = "" + msg1 + "";
    msg2 = "" + msg2 + "";
    var num = 50;
    if (msg2.indexOf(") \"C\" {") < 0 || msg2.indexOf("assign connect") > -1) { num = 5; }
    if ((msg2.indexOf("assign connect") > -1 && ckModNum() > 1) || msg2.indexOf("}] \"0\"") > -1) { num = 50; }
    if (msg2.indexOf("assign atom") > -1 || msg2.indexOf("assign connect") > -1 || msg2.indexOf("assign bond") > -1) { mepsData = false; doUFF(num); }
    if (jmolDebugOn) { memVar1 += msg1 + "~"; memVar2 += msg2 + "~"; }
}

function processPick(appNum, msg, indexNum) {
    var scpt = "";
    if (colorPicOn) {
        scpt = "select atomIndex = _atomPicked;color " + atomColor + ";select *;";
        jmolScript(scpt);
    }
    if (rotationPicOn == true) {
        jmolScript("set modelkitMode false;");
        setRot(2);
    }
    if (deletePicOn == true) {
        scpt = 'select within(branch, {atomIndex=1000}, {atomIndex=_atomPicked});delete selected;javascript "getFormula();"';
        jmolScript(scpt); lnkSwitch(1);
    }
    if (nudgeTyp != "") { document.getElementById("script").blur(); document.getElementById("script").focus(); document.getElementById("script").blur(); }
    //if (nudgeTyp != "") {clickHints(15, ''); }
}

function copyMol(x) {
    if (parseInt(jmolGetPropertyAsArray("modelInfo.modelCount")) > 1) {jmolScript("echo This feature will not copy multi-frame animations."); return; }
    var url; var winNm;
    if (x == 1) { memVar3 = getMolFile(4); jmolScript("echo The current model has been copied to the|model clipboard.;delay 3;echo;"); }
    if (x == 2) {
        if (ckIdNum() == true) { getState(); }
    }
}

function pasteMol(x) {
    jmkLnksOff("x");
    jmolScript("select *"); moData = false;
    if (x == 3) { }
    if (x == 2) {
        if (ckIdNum() == true) { putState(); }
    }
}

function getState() {
    var stateData = escape("" + jmolGetPropertyAsString("extractModel") + "");
    var queryStr = "mkid=" + kitid;
    var url = "write.aspx";
    nihLoadedAction = "savefile";
    loadXmlData(url, queryStr, "state=" + stateData, true);
}

function putState() {
    var milliseconds = new Date().getTime();
    loadMol("temp", kitid + ".txt?id=" + milliseconds, "load");
}

function readData(flNm, act) {
    readAction = act
    qDB("fid=" + flNm, 4);
}

function gotData() {
    if (readInfo == "" || readInfo == "Empty") { readInfo = ""; readAction = 0; return; }
    if (readAction == 1) { document.getElementById(jme1).readMolecule(readInfo); readInfo = ""; readAction = 0; jmolScript("echo"); }
}

function resetParam() {
    jmolScript("reset;echo;select all;color cpk;isosurface off;mo off;measure delete;color label pink;background " + bkgdColor + ";")
}

function getPic(sz) {
    var tempStr = "<img width='" + sz + "' height='" + sz + "' src='data:image/jpeg;base64" + "," + picDataString + "' />";
    feedback(tempStr, "2");
}

function takePic() {
    if (picType == 2) {
        var tempStr = "<img width='" + picSz + "' height='" + picSz + "' src='http://cactus.nci.nih.gov/chemical/structure?string=" + smilesEscape(jmolSmiles, 2) + "&representation=image' />";
        feedback(tempStr, "2"); return;
    }
    picDataString = jmolGetPropertyAsString("image", "all");
    if (picType == 1) { getPic(picSz); return; }
}

function setRot(num) {
    if (moData) { return; }
    assignSet('16qrotateBond');
    if (num == 1) { jmolScript("echo Click a bond to select it for rotation. After the bond is|selected, shift/drag empty space to either side|of the bond to rotate branches around the bond axis."); }
}

function doWireFrame() {
    jmolScript("select *; wireframe 0.03; spacefill 1%;");
}

function doBallStick() {
    jmolScript("select *; wireframe 0.15; spacefill 23%;");
}

function mep(num) {
    if (num == 6) { doClean(); mepOn = false; objColor("mep3", "#ffc0cb"); objColor("mep2", "#ffffcc"); objColor("mep1", "#ffffcc"); return; }
    setJsState(); var scpt = ""; var rng = "-.07 .07";
    if (num == 3) { doClean(); calcPartial(); jmolScript('color {*} partialCharge;color label yellow;label %-8.4[partialcharge]'); return; }
    if (num == 4) { doClean(); jmolScript('dipole bonds on; dipole calculate bonds; dipole molecular off'); return; }
    if (num == 5) { doClean(); jmolScript('dipole molecular on; dipole calculate molecular'); return; }
    if (num == 2) { rng = "-.16 .16"; }
    if (jmolEvaluate("{*}.partialCharge.sum") > .9 || jmolEvaluate("{*}.partialCharge.sum") < -.9) { rng = "all"; }
    if (num == 1) { mepOn = true; objColor("mep1", "#ffc0cb"); objColor("mep2", "#ffffcc"); objColor("mep3", "#ffffcc"); calcPartial(); scpt = "select {*}; isosurface resolution 0 vdw color range " + rng + " map mep translucent;"; }
    if (num == 2) { mepOn = true; objColor("mep2", "#ffc0cb"); objColor("mep1", "#ffffcc"); objColor("mep3", "#ffffcc"); calcPartial(); scpt = "select {*}; isosurface resolution 6 vdw 65% color range " + rng + " map MEP opaque;"; }
    jmolScript(scpt);
}

function doClean() {
    jmolScript('measure delete;mo off;isosurface delete;echo;label "";select formalCharge <> 0;label %C;select *;dipole bond delete;dipole molecular delete;color cpk;');
}

function doVdw() {
    var vdw = "echo Calculating...;delay 1;select *;isosurface select {*} resolution 6 MOLECULAR area;isosurface translucent;delay 2;var x = \"vdw surface area = \" + isosurfaceArea[0] % 0 + \" \u212B<sup>2</sup>\";echo @x";
    doClean();
    jmolScript(vdw);
}

function wyfc() {
    var clr = prompt("Enter a common color name to change the model background default color. If the color you enter is too exotic, the background will not change.", "Blue");
    if (clr == "" || clr == null) { clr = bkgdColor; }
    bkgdColor = clr;
    jmolScript("background " + bkgdColor);
}

function doUFF(num) {
    if (moData || uffoff) { return; }
    if (jmolGetPropertyAsArray("modelInfo.modelCount") > 1) { return; }
    num = parseInt(num);
    if (jmolGetPropertyAsArray("modelInfo.models[0].atomCount") > 50) { num = 5; }
    var scpt = "color translucent 2;delay .1;select *;wireframe 0.15;spacefill 23%;boundbox {*};centerat boundbox;";
    if (tempLoaded) { jmolScript('color translucent 2;delay .1;var y = "_" + {atomIndex=1}.element;set minimizationRefresh false;set useMinimizationThread false;minimize fix {@y or connected(@y)} select {*};select {*};wireframe 0.15;spacefill 23%;boundbox {*};centerat boundbox;color opaque;javascript "getFormula()"'); return; }
    scpt += "set minimizationRefresh false;set useMinimizationThread false;";
    scpt += "set minimizationSteps " + num + ";minimize addHydrogens;";
    scpt += "select *;wireframe 0.15;spacefill 23%;boundbox {*};centerat boundbox;echo;calculate hydrogens;color opaque;";
    jmolScript(scpt + loadScpt + 'javascript "getFormula()"');
}

function UffOff() {
    if (uffoff == false) { uffoff = true; objColor("opoff", "#ffc0cb"); return; }
    if (uffoff == true) { uffoff = false; objColor("opoff", "#ffffcc"); return; }
}

function loadFromString(num) {
    clearMessages(); mepsData = false;
    var modStr = ""; var mods; var modMove = ""; var scpt = ""; var jsAppend = "";
    if (num == 1) {
        modStr = getJme(2); mods = modStr.split("|"); var modA = mods[0]; var modB = mods[1];
        scpt = 'mod1 = "' + modA + '";mod2 = "' + modB + '";load "@mod1";' + loadScpt + 'hover off;set appendNew false;load APPEND "@mod2";';
        scpt += 'select *;calculate hydrogens;wireframe 0.15;spacefill 23%;boundbox {*};centerat boundbox;mod1="";mod2="";javascript "getFormula();setJsState();setLnkSwitch()"'
        jmolScript(scpt); return;
    }
    if (num == 2) { modStr = document.getElementById(jme1).jmeFile(); loadAppend = ""; }
    if (num == 7) { modStr = document.getElementById(jme1).jmeFile(); loadAppend = ""; jsAppend = '; resolverAlt()'; }
    if (num == 3) { modStr = document.getElementById("script").value; }
    if (num == 9) { modStr = document.getElementById("state").value; }
    if (num == 8) { modStr = document.getElementById("animHolder").value; jsAppend = '; frameAnimate(4)'; }
    if (num == 10) { modStr = document.getElementById("script").value; jsAppend = '; frameAnimate(7)'; }
    if (num == 6) { modStr = memVar3; if (loadAppend == "append") { modMove = "select *;translateSelected {" + bbMax() + " " + bbMax() + " 0};"; } }
    scpt = modMove + 'set appendNew false;mod1 = "' + modStr + '";load ' + loadAppend + ' "@mod1";' + loadScpt;
    if (num == 10) { scpt += 'hover off;select *;wireframe 0.15;spacefill 23%;boundbox {*};centerat boundbox;mod1="";mod2="";javascript "getFormula();setJsState();setLnkSwitch()' + jsAppend + '"'; jmolScript(scpt); return; }
    scpt += 'hover off;select *;calculate hydrogens;wireframe 0.15;spacefill 23%;boundbox {*};centerat boundbox;calculate partialCharge;mod1="";mod2="";javascript "getFormula();setJsState();setLnkSwitch()' + jsAppend + '"';
    jmolScript(scpt);
}

function getFormula() {
    if (moData == false && mepsData == false) { calcPartial(); }
    var atomArr; var calcHold = ""; var fs = new Array(); var f = new Array(); var j; var appendHold = loadAppend;
    fs = jmolGetPropertyAsArray("moleculeInfo.mf");
    try {
        for (var i = 0; i < fs.length; i++) {
            if (fs[i].indexOf(" ") > -1) {
                atomArr = fs[i].split(" ");
                for (j = 0; j < atomArr.length; j++) {
                    f[j] = atomArr[j];
                }
                if (f[0] == "H" && f[2] == "C") { atomArr[0] = f[2]; atomArr[1] = f[3]; atomArr[2] = f[0]; atomArr[3] = f[1]; }
                fs[i] = atomArr.join(" ") + " ";
                calcHold += fs[i].replace(/ 1 /g, "").split(" ").join("") + "+";
            }
        }
        document.getElementById("calcDisplay").value = calcHold.substring(0, calcHold.length - 1);
        calcWinTxt = calcHold.substring(0, calcHold.length - 1);
        jmolSmiles = jmolEvaluate("{*}.find('SMILES')");
        //osrScript("echo");
        loadAppend = appendHold;
        if (mepOn) { mep(1); }
    }
    catch (e) {
        //alert(e);
        jmolScript("boundbox {*};centerat boundbox;");
    }
}

function lnkSwitch(x) {
    if (animData == true) { loadMol("models", "2-chlorobutane_(R)", "load"); return; }
    uffoff = true;
    document.getElementById("append").checked = false;
    if (atomPicState == "26ainvertStereo" || atomPicState == "22adragMinimize") { atomPicState = "11aC"; }
    x = (!x) ? 1 : x;
    if (moData) { x = 4; jmkLnksOff("x"); }
    if (x == 4) { jmolScript("set picking on;set bondpicking false;axes off;hover off; echo;"); picsOff(); }
    if (x == 1) { jmolScript("set bondpicking true;axes off;hover off; echo;"); picsOff(); jmkLnksOff("x"); setKitDefault(); }
    if (x == 2) { jmolScript("set picking on;set bondpicking false;axes off;hover off; echo;"); picsOff(); colorPicOn = true; }
}

function loadMol(fldr, nm, mode) {
    feedback("&nbsp;", "1"); feedback("&nbsp;", "3"); feedback("&nbsp;", "4");
    if (animData == true) { animData = false; jmolScript("quit;animation off"); }
    var scpt = ""; var filter = "";
    var ldMid = "mid"; if (fldr == "models") { ldMid = "mid2"; }
    if (fldr == "animations") { ldMid = "anim"; }
    if (nm == "") { nm = document.getElementById(ldMid).options[document.getElementById(ldMid).selectedIndex].value; }
    if (nm.indexOf(".txt") < 0 && nm.indexOf(".aspx") < 0) { nm = nm + ".txt"; }
    if (fldr == "meps") { filter = ' filter "ESPCHARGES"'; moData = true; }
    if (fldr == "models") { mepsData = true; }
    if (mode == "append") { mode = "load append"; }
    if (mode == "") { mode = "load"; }
    if (document.getElementById("append").checked) { mode = "load append"; }
    if (mode == "load") {
        scpt = 'set appendNew false; ' + mode + ' "../' + fldr + '/' + nm + '"' + filter + ';' + loadScpt + 'hover off; background ' + bkgdColor + ';';
    }
    else {
        if (animData == true) { jmolScript("echo Files cannot be appended to animations.;delay 2;echo;"); return; }
        if ((fldr == "meps" && moData == false) || (fldr != "meps" && moData == true)) { jmolScript("echo MO and MM Library files cannot be cross appended.;delay 2;echo;"); return; }
        scpt = 'select *;translateSelected {' + bbMax() + ' ' + bbMax() + ' 0};set appendNew false;load append "../' + fldr + '/' + nm + '"' + filter + ';hover off;select *;wireframe 0.15;spacefill 23%;boundbox {*};centerat boundbox;frame all;';
        scpt += loadScpt + ';hover off;select *;wireframe 0.15;spacefill 23%;boundbox {*};centerat boundbox;frame all;';
    }
    jmolScript(scpt + 'javascript "getFormula();setLnkSwitch();setJsState()"');
}

function setLnkSwitch() {
    if (typSc == 2) { lnkSwitch(2); }
    if (typSc == 4) { lnkSwitch(1); }
    if (typSc == 3 || typSc == 0) { lnkSwitch(4); }
    if (typSc == 1) { lnkSwitch(4); }
}

function dupMod() {
    if (moData) { return; }
    if (ckModNum() > 1) { jmolScript("echo This feature is limited to a single model.;delay 3;echo;"); return; }
    var modTxt = 'center;mod1 = "' + jmolGetPropertyAsString("extractModel", "all") + '";javascript "dupMod2()";';
    jmolScript(modTxt);
}

function dupMod2() {
    var scpt = 'echo;set appendNew false;var z=' + bbMax() + ';';
    scpt += 'select *;translateSelected {@z @z 0};load APPEND "@mod1";';
    scpt += 'mod1="";hover off;' + loadScpt + 'select *;wireframe 0.15;spacefill 23%;boundbox {*};centerat boundbox;javascript "getFormula();lnkSwitch()";';
    jmolScript(scpt);
}

function picsOff() {
    rotationPicOn = false; colorPicOn = false; measPicOn = false; deletePicOn = false; arrowPicOn = false;
}

function calculateH() {
    if (moData) { return; }
    jmolScript('delete hydrogen;calculate hydrogens {*};javascript "getFormula()";');
}

function jmolInit() {
    if (remoteLoad != "") {
        if (isNumeric(remoteLoad)) { loadMol("web_molecules", "pubchem.aspx?csid2sdf=" + remoteLoad, "load"); return; }
        if (remoteLoad.toLowerCase().indexOf("cid=") > -1) { remoteLoad = remoteLoad.replace("cid=", ""); }
        if (remoteLoad.toLowerCase().indexOf("smiles=") > -1) { remoteLoad = remoteLoad.replace("smiles=", ""); loadMol("web_molecules", "pubchem.aspx?smi2sdf=" + smilesEscape(remoteLoad, 1), "load"); return; }
        if (remoteLoad.toLowerCase().indexOf("resolver=") > -1) { remoteLoad = remoteLoad.replace("resolver=", ""); loadMol("web_molecules", "pubchem.aspx?smi2sdf=" + smilesEscape(remoteLoad, 1), "load"); return; }
        if (remoteLoad.toLowerCase().indexOf("inchi=") > -1) { osrScript("loadpub " + remoteLoad); }
        if (remoteLoad.toLowerCase().indexOf("inchi=") < 0) { osrScript("loadpub " + remoteLoad); }
    }
    else {
        getFormula();
    }
}

function assignSet(sfx) {
    nudgeTyp = "";
    if (atomPicState == "22adragMinimize") { atomPicState = "11aC"; jmolScript("set minimizationRefresh false;set useMinimizationThread false"); }
    if (moData) { jmolScript("set picking dragmolecule;"); objColor("a25", "#ffc0cb"); return; }
    jmolScript("set modelkitMode false;");
    if (sfx != "16qrotateBond" && bondPicState == "16qrotateBond") { bondPicState = "15qp"; }
    var w = "";
    var idNum = sfx.substring(0, 2);
    var idAlpha = sfx.substring(2, 3);
    var objId = idAlpha + idNum;
    if (idAlpha == "a") { atomPicState = sfx; }
    if (idAlpha == "q") { bondPicState = sfx; }
    var AidNum = atomPicState.substring(0, 2);
    var AidAlpha = atomPicState.substring(2, 3);
    var AobjId = AidAlpha + AidNum;
    var Aact = atomPicState.substring(3, atomPicState.length);
    if (Aact == "dragMinimize" && uffoff == true) { Aact = "dragAtom"; }
    var QidNum = bondPicState.substring(0, 2);
    var QidAlpha = bondPicState.substring(2, 3);
    var QobjId = QidAlpha + QidNum;
    var Qact = bondPicState.substring(3, bondPicState.length);
    jmkLnksOff("x"); objColor(AobjId, "#ffc0cb"); objColor(QobjId, "#ffc0cb");
    picsOff();
    jmolScript("set bondpicking true;axes off;hover off;");
    if (bondPicState == "17qbondpickoff") { jmolScript("set bondpicking false;"); }
    if (Aact == "Q") {
        Aact = prompt("Enter the symbol for the element to be reprented by X.", replAtom);
        if (Aact == "" || Aact == null) { Aact = "I"; }
        replAtom = Aact;
        atomPicState = "11aC";
    }
    if (Qact.indexOf("rotate") > -1) { jmolScript("set picking " + Qact + ";"); rotationPicOn = true; jmkLnksOff("a"); return; }
    if (Qact == "0" || Qact == "1" || Qact == "2" || Qact == "3" || Qact == "p") { jmolScript("set picking assignBond_" + Qact); }
    if (Aact.indexOf("drag") > -1) { jmolScript("set picking " + Aact); if (sfx == "25adragMolecule") { jmolScript("echo Click any 'Atoms:' function to turn off move function.;delay 4;echo;"); } return; }
    if (Aact.indexOf("invert") > -1) { getFormula(); jmolScript("set picking " + Aact); return; }
    jmolScript("set picking assignAtom_" + Aact);
}

function jmkLnksOff(alph) {
    jmolScript("echo");
    alph = (!alph) ? "x" : alph;
    var w = "";
    if (alph == "y") { objColor("a11", "#ffc0cb"); objColor("q15", "#ffc0cb"); return; }
    if (alph == "a" || alph == "x") {
        for (var i = 11; i < 34; i++) {
            w = "a" + i.toString();
            objColor(w, "#ffffcc");
        }
    }
    if (alph == "q" || alph == "x") {
        for (var j = 11; j < 18; j++) {
            w = "q" + j.toString();
            objColor(w, "#ffffcc");
        }
    }
}

function setKitDefault() {
    jmkLnksOff("x"); assignSet(atomPicState); assignSet(bondPicState); uffoff = false;
}

function meas(num) {
    if (moData) { return; }
    var scpt = "Click 2 atoms to mark a distance.";
    if (num == 2) { scpt = "Click 3 atoms to mark an angle."; }
    if (num == 3) { scpt = "Click 4 atoms to mark a torsion."; }
    jmolScript("axes off;hover off;");
    picsOff();
    jmkLnksOff("x");
    measPicOn = true;
    jmolScript("axes off;hover off;showMeasurements = true;echo " + scpt + ";");
}

var nihLoadedActionHold = "";
function nihNm(num) {
    clearMessages(); document.getElementById("script").value = "";
    if (ckModNum() == 1) {
        getFormula();
        feedback('&nbsp;', '1'); nihLoadedActionHold = "getname";
        jmolScript("ius = ''");
        if (num == 1) { qDB("mf=" + calcWinTxt, 3); }
    }
    else { jmolScript("echo The name search can only be done with one model|in the Jmol window."); }
}

function nihSm(num) {
    clearMessages(); document.getElementById("script").value = "";
    if (ckModNum() == 1) {
        getFormula();
        feedback('&nbsp;', '1'); nihLoadedActionHold = "getsmiles";
        jmolScript("ius = ''");
        if (num == 1) { qDB("mf=" + calcWinTxt, 3); }
    }
    else { jmolScript("echo The SMILES search can only be done with one model|in the Jmol window."); }
}

function nihNmSm() {
    var nOrS = ""; var smileJs1; var comID = "";
    if (oChem.models.length == 0) { jmolScript("echo This model was not found in the local vmk database. Click|the command aka to query PubChem for the iupac|name and SMILES.;etv1=''"); return; }
    jmolScript("fnd = '0';etv1='';etv2 = 'This model was not found in the local vmk database. Click|the command aka to query PubChem for the iupac|name and SMILES.'");
    for (var i = 0; i < oChem.models.length; i++) {
        if (oChem.models[i].form == calcWinTxt) {
            smileJs1 = oChem.models[i].smiJ.replace(/\\/g, '\\\\'); comID = oChem.models[i].id; nOrS = oChem.models[i].name;
            if (nihLoadedActionHold == "getsmiles") { nOrS = oChem.models[i].smiJ.replace(/\\/g, '\\\\'); }
            scpt = "cid = '" + comID + "';if (fnd == '0'){var sm2 = '" + smileJs1 + "';";
            scpt += "var cks = {*}.find('SMILES',sm2);if (cks > 1){fnd = '1'; etv1 = '" + nOrS + "';etv2 = etv1 + '|local vmk database id = ' + cid + ius}}";
            jmolScript(scpt);
        }
    }
    jmolScript('echo @etv2;etv2="";if (fnd == 1){javascript "fbLnk()"}');
}

function fbLnk() { fbFilter(jmolEvaluate("etv1")); jmolScript("etv1=''"); }

function checkModel() {
    if (ckModNum() != 2) { return; }
    var scpt = "";
    jmolScript("echo");
    scpt = "var i = {*}.atomIndex.max + 1;var t = {*}.atomIndex.min;select within(branch, {atomIndex = i}, {atomIndex=t});var x = compare({selected}, {not selected}, 'ISOMER');"
    if (tempLoaded) {
        scpt += "var y = 'These models are NOT identical.'; if (x == 'NONE'){y = 'These models do not have the|same molecular formula!';};if (x == 'IDENTICAL'){y = 'These models are IDENTICAL';};echo @y";
    }
    else {
        scpt += "var y = 'These models are ' + x; if (x == 'NONE'){y = 'These models do not have the|same molecular formula!';};y = y.replace('CONFORMATIONAL ','CONFORMATIONAL|').replace('DIASTERIOMERS','DIASTEREOMERS');echo @y"
    }
    jmolScript(scpt);
}

function ckModNum() { return jmolGetPropertyAsArray("moleculeInfo.mf").length; }

function clearMessages() { jmolScript("echo"); feedback("&nbsp;", "1"); feedback("&nbsp;", "3"); feedback("&nbsp;", "4"); }

function clearMessage(num) { num = "" + num; feedback("&nbsp;", num); }

function nihDataAction() {
    if (nihLoadedAction == "aka") { var inchi = ajaxReturnTxt; var akaWindow = window.open("../model2d.aspx?id=" + inchi); akaWindow.focus(); nihLoadedAction = "nothing"; }
    if (nihLoadedAction == "hnmr") { var smi = ajaxReturnTxt; var hnmrWindow = window.open("http://www.nmrdb.org/predictor?smiles=" + smi); hnmrWindow.focus(); nihLoadedAction = "nothing"; }
    if (nihLoadedAction == "chemspi") { var nm = left(ajaxReturnTxt, ajaxReturnTxt.indexOf("|")); loadMolJmol(nm, loadAppend, "pubchem.aspx?csid2sdf="); ; nihLoadedAction = "nothing"; }
    if (nihLoadedAction == "pubchem") { var nm = ajaxReturnTxt; loadMolJmol(nm, loadAppend, "nih.aspx?cid2sdf="); ; nihLoadedAction = "nothing"; }
    if (nihLoadedAction == "drawpub") { var nm = ajaxReturnTxt; nihLoadedAction = "drawpub2"; loadXmlData("nih.aspx", "stdinchi2cid=" + nm, null, false); }
    if (nihLoadedAction == "drawpub2") { var nm = ajaxReturnTxt; loadMolJmol(nm, "", "nih.aspx?cid2sdf="); nihLoadedAction = "nothing"; }
    if (nihLoadedAction == "timeout") { jmolScript("echo The requested data server may be temporarly off line.|Try loading the model again. It may have been|just a brief connection problem.;delay 3;echo;"); nihLoadedAction = "nothing"; }
    if (nihLoadedAction == "savefile") { if (ajaxReturnTxt == "Y") { jmolScript("echo Model Saved.; delay 1;echo;"); nihLoadedAction = "nothing"; } else { jmolScript("echo There is a temporary problem with this|feature. Please try again. If the problem|persists, please contact Otis.;"); nihLoadedAction = "nothing"; } }
    if (nihLoadedAction == "jmefile") { jmolScript("echo"); document.getElementById(jme1).readMolecule(ajaxReturnTxt); nihLoadedAction = "nothing"; if (getJme(1).indexOf("C+") > -1) { jmolScript("echo Well that doesn't look right.|It looks like there's a problem depicting the stereochemistry|of this model. Please try the no stereochemistry option.") } }
    if (nihLoadedAction == "qDB3") { eval(ajaxReturnTxt); dbMfNow = calcWinTxt; nihLoadedAction = "nothing"; nihNmSm(); }
    if (nihLoadedAction == "qDB4") { readInfo = ajaxReturnTxt; nihLoadedAction = "nothing"; gotData(); }
    if (nihLoadedAction == "qDB5") { eval(ajaxReturnTxt); nihLoadedAction = "nothing"; if (oChem.models.length > 0) { loadMol("models_sw", oChem.models[0].file, loadAppend); } else { jmolScript("echo Model Not Found"); } }
    if (nihLoadedAction == "qDB6") { eval(ajaxReturnTxt); nihLoadedAction = "nothing"; if (oChem.models.length > 0) { loadMol("models_sw", oChem.models[0].file, loadAppend); } else { jmolScript("echo Model Not Found"); } }
    //if (nihLoadedAction == "animread") { document.getElementById("script").value = ajaxReturnTxt; alert(ajaxReturnTxt); }
}

function loadAlt(num) {
    clearMessages();
    var ldMod = "load"; var queryStr = ""; var cmdStr = "loadnih "; var dbid = "the NIH Chemical Resolver";
    if (num > 6) { dbid = "the PubChem chemical compound database"; }
    if (num > 8) { dbid = "the ChemSpider chemical compound database"; }
    if ((num == 4 || num == 2 || num > 6) && moData == true) { return; }
    if (num == 4) { ldMod = "append"; cmdStr = "appendnih "; }
    if (num == 7) { ldMod = "load"; cmdStr = "loadpub "; }
    if (num == 8) { ldMod = "append"; cmdStr = "appendpub "; }
    if (num == 9) { ldMod = "load"; cmdStr = "loadspi "; }
    if (num == 10) { ldMod = "append"; cmdStr = "appendspi "; }
    if (num == 3 || num == 4 || num > 6) {
        var qs = prompt("This " + ldMod + " option will query " + dbid + " for any compound name entered below.", promptMol);
        if (trim(qs) != "" && qs != null) { promptMol = trim(qs); osrScript(cmdStr + " " + trim(qs)); }
        return;
    }
    if ((num == 5 || num == 6) && jmolSmiles.indexOf("%") > -1) { jmolScript("echo Oh my.|Jmol and NIH Resolver are having a bit of a disagreement|about the SMILES for this model. I'm afraid we cannot|depict this model."); return; }
    if (num == 2) { getFormula(); if (ckModNum() == 1) { optnih(); } return; }
    if (num == 5) { nihLoadedAction = "jmefile"; jmolScript("echo Downloading JME file..."); queryStr = "smi2jme=" + smilesEscape(trim(jmolSmiles), 1); }
    loadXmlData('nih.aspx', queryStr, null, true);
}

function optnih() { osrScript("loadnih " + smilesEscape(jmolSmiles, 1)); }

function getJme(num) {
    num = (!num) ? 4 : num;
    num = parseInt(num);
    var jmeSmiles = "" + document.getElementById(jme1).smiles() + "";
    if (num == 5 && trim(jmeSmiles) == "") { document.getElementById(jme1).readMolecule("1 0 C 5.04 -3.14"); jmeSmiles = "C"; }
    var smils = jmeSmiles.split("."); jmolScript("smi1 = '" + smils[0].replace(/\\/g, '\\\\') + "';"); var jmeSmiles1 = smils[0];
    if (smils.length > 1) { jmolScript("smi2 = '" + smils[1].replace(/\\/g, '\\\\') + "';"); var jmeSmiles2 = smils[1]; }
    if (num == 1) { return jmeSmiles1; }
    if (num == 2) { return "" + document.getElementById(jme1).jmeFile() + ""; }
    if (num == 3) { return "" + document.getElementById(jme1).molFile() + ""; }
    if (num == 4 && smils.length == 2) { jmolScript("echo;var x = 'The editor drawings are ';var y = compare(smi1, smi2, 'ISOMER');y = y.replace('NONE', 'NOT IDENTICAL').replace('DIASTERIOMERS','DIASTEREOMERS');x = x + y;echo @x;delay 3;echo"); return; }
    if (num == 4) { return; }
    if (smils.length > 2) { alert("You can only load one or two structures from the drawing screen."); return; }
    if (smils.length == 2) {
        loadFromString(1); return;
    }
    loadFromString(2); return;
}

function fbFilter(str) {
    feedback("&nbsp;", "3"); feedback("&nbsp;", "1");
    if (str.indexOf("Sorry") > -1) { str = "The requested information could not be found."; }
    if (str.length < 50) { feedback(str, "3"); } else { feedback("Requested information is in Command Field above.", "3"); document.getElementById("script").value = str; }
}

function qDB(qs, num) {
    if (ckModNum() > 1 && num == 3) { return; }
    if (calcWinTxt == dbMfNow && num == 3 && oChem.models.length > 1) {
        nihNmSm();
    }
    else {
        jmolScript("echo Searching Database...");
        if (num == 3) { nihLoadedAction = "qDB3"; loadXmlData2("j_array.aspx?" + qs); }
        if (num == 4) { nihLoadedAction = "qDB4"; loadXmlData2("../jmol_scripts/read.aspx?" + qs); }
        if (num == 5) { nihLoadedAction = "qDB5"; loadXmlData2("j_array.aspx?" + qs); }
        if (num == 6) { nihLoadedAction = "qDB6"; loadXmlData2("j_array.aspx?" + qs); }
    }
}

function resolverAlt() { qDB("mf=" + calcWinTxt, 7); }

function setJsState() {
    var fn = jmolGetPropertyAsString("fileName");
    moData = false; tempLoaded = false; animData = false;
    if (jmolGetPropertyAsString("stateInfo").indexOf("/meps/") > -1) { moData = true; }
    if (jmolGetPropertyAsString("stateInfo").toLowerCase().indexOf("_anim.txt") > -1) { animData = true; }
    if (jmolGetPropertyAsString("stateInfo").indexOf("template_") > -1) { tempLoaded = true; }
    //if (jmolEvaluate("{*}.partialcharge.min==0") && jmolEvaluate("{*}.partialcharge.max==0")) { jmolScript("{*}.partialcharge = 0.1; {*}.partialcharge=0.0}"); }
    if (animData == true) { return; }
    if (jmolGetPropertyAsString("fileContents").indexOf("chemagicAnimation") > -1) { document.getElementById("script").value = jmolGetPropertyAsString("fileContents"); osrScript(); return; }
    if (moData == true) { jmolScript("echo Model editing is off for MO Library;"); }
    osrScript("echo");
}

function ckIdNum() {
    if (kitid == null) { kitid = ""; }
    if (kitid.length == 9 && isNumeric(kitid) == true) { return true; }
    else {
        alert("You must create a shared model kit before you can use the MultiUser feature. To create a shared model kit, run the script field command 'logon #' where '#' is a UNIQUE 9 digit number. Remote browsers with the same logon number will be able to view and edit the same model by using the MultiUser Save/Restore links. The kit number will be held in a browser cookie for 5 days.", "");
        return false;
    }
}

function showMo(num) {
    if (ckModNum() > 1) { doClean(); jmolScript("echo MOs can only be displayed for single models.;"); return; }
    if (num == 1) { jmolScript("echo;mo TITLEFORMAT 'MO number = %I'; mo homo;"); }
    if (num == 2) { jmolScript("echo;mo TITLEFORMAT 'MO number = %I'; mo lumo;"); }
    if (num == 3) { jmolScript("echo;mo TITLEFORMAT 'MO number = %I'; mo previous;"); }
    if (num == 4) { jmolScript("echo;mo TITLEFORMAT 'MO number = %I'; mo next;"); }
}

function getMolFile(num) {
    var moFl = jmolGetPropertyAsString("extractModel");
    var theFormula = "**" + calcWinTxt + "**";
    moFl = moFl.replace("string", theFormula);
    moFl = "" + moFl.replace(/http.+/, theFormula);
    moFl = moFl.replace(/__Jmol.*/, "**Created by Jmol for Current Model**");
    moFl = moFl.replace(/Jmol version.*/, "");
    if (num == 4) { return moFl; }
    if (num == 2) { jmolScript("var x = '" + moFl + "';console;show @x"); return; }
    if (num == 3) { document.getElementById(jme1).readMolFile(moFl.replace(/(\r\n|\n|\r)/gm, "|")); return document.getElementById(jme1).smiles(); }
}

function smilesEscape(inStr, num) {
    inStr = inStr.replace(/%/g, "%25");
    inStr = inStr.replace(/#/g, "%23");
    inStr = inStr.replace(/=/g, "%3D");
    inStr = inStr.replace(/\[/g, "%5B");
    inStr = inStr.replace(/]/g, "%5D");
    inStr = inStr.replace(/\(/g, "%28");
    inStr = inStr.replace(/\)/g, "%29");
    if (num == 1) { inStr = inStr.replace(/\+/g, "**p**"); }
    if (num == 2) { inStr = inStr.replace(/\+/g, "%2B"); }
    inStr = inStr.replace(/ /g, "%20");
    return inStr;
}

function deleteMod() {
    jmolScript("set modelkitMode false;set picking on;set bondpicking false;axes off;hover off;");
    deletePicOn = true;
    jmolScript("echo Click a model to delete the model.");
}

function checkToggle() {
    if (document.getElementById("append").checked) { document.getElementById("append").checked = false; } else { document.getElementById("append").checked = true; }
}

function bbMax() {
    var mult = 3; var add = 0;
    if (tempLoaded) { mult = 5; add = 1; }
    var x = "" + jmolGetPropertyAsArray("boundboxInfo.vector"); var y = x.split(","); y = parseInt(((mult * parseInt(y.max())) + add) / ckModNum());
    if (y < 1) { y = 2; }
    return y;
}

function loadDraw(num) {
    var smi = "" + document.getElementById(jme1).smiles() + ""
    var nm = smilesEscape(getJme(1), 1);
    if (smi.indexOf(".") < 0 && nm != "") {
        jmolScript("echo Please wait.|Contacting database.;");
        if (num == 1) {nihLoadedAction = "drawpub"; loadXmlData("nih.aspx", "smi2stdinchi2=" + nm, null, false);}

        if (num == 2) {loadMolJmol(nm, "", "nih.aspx?smi2sdf="); }
    } else {
        jmolScript("echo This 3D load method can only load|single structures.;delay 3;echo");
    }
    loadAppend = "";
}

var sdfTrans = ""
function dataConnects(num) {
    getFormula(); if (ckModNum() > 1 && num < 3) { jmolScript("echo Data connections can only be made for|single models."); return; }
    altSmiles = jmolSmiles;
    var scpt = "";
    if (jmolSmiles.indexOf("%") > -1) { altSmiles = getMolFile(3); document.getElementById(jme1).reset(); }
    if (num == 1) {
        nihLoadedAction = "aka"; loadXmlData("../web_molecules/nih.aspx", "smi2stdinchi3=" + smilesEscape(altSmiles, 1), null, true);
    }
    if (num == 2) {
        nihLoadedAction = "hnmr"; loadXmlData("../web_molecules/nih.aspx", "smi2smi=" + smilesEscape(altSmiles, 1), null, true);
    }
    if (num == 3) {
        sdfTrans = getMolFile(4); var sdfWindow = window.open("sdf.htm"); sdfWindow.focus();
    }
}

function writeLink(flId) {
    var urlNm = "http://usm.maine.edu/~newton/Chy251_253/Lectures/" + flId + "";
    var lnk = "<a href='" + urlNm + "' target='_blank' onclick='clearMessage(4)'><i class='teal'>Open Related Topic in O=CHem</i></a>";
    feedback(lnk, 4);
}

function frameAnimate(id) {
    var scpt = "";
    var fps = 1;
    var frm = parseInt(jmolGetPropertyAsArray("modelInfo.modelCount"));
    if (frm > 5) { fps = 5; }
    if (frm > 10) { fps = 10; }
    if (id == 1) {
        if (frm > 1) { jmolScript("Echo More than one frame is currently loaded.|Animations must begin with a single model frame.|Click either 'lastFrame' to load the last animation|frame captured or click to load a new model."); return; }
        if (animActive) { jmolScript("echo You must click 'end' to stop the previous animation|before beginning a new animation."); return; }
        objColor("begin", "#ffc0cb"); animCounter = 0; animActive = true; jmolScript("Echo A new frame animation session has been started.|Modify the current model and click captureFrame|to assemble a series of animation frames. Click|end to print and run your animation.");
        document.getElementById('animHolder').value = ""; document.getElementById('script').value = ""; return;
    }
    if (id == 2) {
        if (!animActive) { jmolScript("echo You must click begin before capturing frames."); return; }
        if (animCounter == 0) { jmolScript("echo"); }
        animCounter = parseInt(animCounter) + 1;
        document.getElementById('state').value = jmolGetPropertyAsString('extractModel');
        document.getElementById('animHolder').value = document.getElementById('animHolder').value + jmolGetPropertyAsString('extractModel').replace(/__Jmol.+(\r\n|\n|\r)/, "chemagicAnimation Frame " + animCounter + "\n") + '\n' + '$$$$' + '\n';
        scpt = "Frame " + animCounter + " captured.";
        feedback(scpt, 3);
        return;
    }
    if (id == 3) {
        if (!animActive) { jmolScript("echo You must click 'begin' before ending frame capture."); return; }
        objColor("begin", "#ffffcc");
        if (animCounter < 1) { jmolScript("echo"); animCounter = 0; animActive = false; return; }
        animCounter = 0; animActive = false;
        document.getElementById('script').value = document.getElementById('animHolder').value;
        loadFromString(8);
        return;
    }
    if (id == 4) {
        frm = parseInt(jmolGetPropertyAsArray("modelInfo.modelCount"));
        if (frm < 2) { jmolScript("echo There is only one model frame loaded.|Animations require multiple frames."); }
        jmolScript("echo The animation has been closed. The animation text|file is in the script field. Click 'Run Script' to the run|animation. Copy the text file for later use.");
        jmolScript("anim mode once;frame 1;anim fps " + fps + ";anim on;");
        return;
    }
    if (id == 5) {
        document.getElementById("animHolder").value = document.getElementById("script").value;
        loadFromString(10);
        return;
    }
    if (id == 6) {
        loadFromString(9);
        return;
    }
    if (id == 7) {
        frm = parseInt(jmolGetPropertyAsArray("modelInfo.modelCount"));
        if (frm < 2) { jmolScript("echo There is only one model frame loaded.|Animations require multiple frames."); return; }
        jmolScript("anim mode once;frame 1;anim fps " + fps + ";anim on;");
        return;
    }
    if (id == 8) {
        scpt = "../animations/" + document.getElementById('anim').options[document.getElementById('anim').selectedIndex].value;
        jmolScript("script " + scpt);
    }
}

var nudgeTyp = "";
function nudgeIt(Tr, Ro) {
    var mv1 = "translateSelected "; if (nudgeTyp == "r") { mv1 = "rotateSelected "; }
    var mv2 = "{" + Tr + "}"; if (nudgeTyp == "r") { mv2 = Ro; }
    var scpt = "var i = {*}.atomIndex.max + 10;var t = _atomPicked;select  within(branch, {atomIndex = i}, {atomIndex=t});";
    scpt += mv1 + mv2;
    if (animActive && nCap) { scpt += ';javaScript "frameAnimate(2)"' }
    jmolScript(scpt);
}

function calcPartial() {
    if (!mepOn) { return; }
    if (moData == true || mepsData == true) { return; }
    jmolScript("select *;calculate partialCharge;");
    if (jmolGetPropertyAsArray("moleculeInfo.mf").indexOf("H 1 F 1") > -1) { jmolScript("{fluorine and connected(1,hydrogen)}.partialCharge = '-0.47';{hydrogen and connected(1,fluorine)}.partialCharge = '0.47';"); }
    if (jmolGetPropertyAsArray("moleculeInfo.mf").indexOf("H 1 Cl 1") > -1) { jmolScript("{chlorine and connected(1,hydrogen)}.partialCharge = '-0.46';{hydrogen and connected(1,chlorine)}.partialCharge = '0.46';"); }
    if (jmolGetPropertyAsArray("moleculeInfo.mf").indexOf("H 1 Br 1") > -1) { jmolScript("{bromine and connected(1,hydrogen)}.partialCharge = '-0.42';{hydrogen and connected(1,bromine)}.partialCharge = '0.42';"); }
    if (jmolGetPropertyAsArray("moleculeInfo.mf").indexOf("H 1 I 1") > -1) { jmolScript("{iodine and connected(1,hydrogen)}.partialCharge = '-0.37';{hydrogen and connected(1,iodine)}.partialCharge = '0.37';"); }
}

function autoCap() {
    if (nCap == false) { nCap = true; objColor("togC", "#ffc0cb"); return; }
    if (nCap == true) { nCap = false; objColor("togC", "#ffffcc"); return; }
}

var arrowPicOn = false;
function arrow(act) {
    var scpt = "";
    var nm = "" + rand(1, 1000000);
    if (act == "add") { if (arrowPicOn == false) { return; } scpt = "arVar = arVar + .3;set defaultDrawArrowScale 0.5;draw arrow" + nm + " arrow {-.75 @arVar .8} {0 @arVar .8} {.75 @arVar .8};set picking draw;" }
    if (act == "on") { arrowPicOn = true; scpt = "arVar = 1.5;set picking draw;" }
    if (act == "off") { arrowPicOn = false; scpt = "draw delete;"; }
    jmolScript(scpt);
}

var hintsStr = "";
function clickHints(num, inf) {
    feedback("", 1); feedback("", 3);
    if (num == 1) { hintsStr = "<b>Atom:" + inf + "</b> - Clicking an atom in the Jmol window will replace that atom with the atom <b class='red'>" + inf + "</b>."; }
    if (num == 2) { hintsStr = "<b>Atom:delete</b> - Clicking an atom in the Jmol window will <b class='red'>delete</b> that atom"; }
    if (num == 3) { hintsStr = "<b>Atom:drag</b> - Click/dragging an atom in the Jmol window will <b class='red'>move</b> the atom and <b class='red'>minimize</b> the molecule using MMFF94."; }
    if (num == 4) { hintsStr = "<b>Atom:plus</b> - Clicking an atom in the Jmol window will <b class='red'>increase the charge</b> on the atom."; }
    if (num == 5) { hintsStr = "<b>Atom:minus</b> - Clicking an atom in the Jmol window will <b class='red'>decrease the charge</b> on the atom."; }
    if (num == 6) { hintsStr = "<b>Bond:break</b> - Clicking a bond in the Jmol window will <b class='red'>break</b> that bond."; }
    if (num == 7) { hintsStr = "<b>Bond:" + inf + "</b> - Clicking a bond in the Jmol window will set the bond as <b class='red'>" + inf + "</b>."; }
    if (num == 8) { hintsStr = "<b>Bond:rotate</b> - Clicking a bond in the Jmol window will allow <b class='red'>conformation rotation</b> around that bond. Specific instructions are in the Jmol window."; }
    if (num == 9) { hintsStr = "<b>Bond:off</b> - Bond clicking action is <b class='red'>off</b>. This is useful to prevent unintended bond changes."; }
    if (num == 10) { hintsStr = "<b>MEP:on</b> - Dynamic Map of Electrostatic Potential is <b class='red'>turned on</b>. During editing, partial charges and the MEP are dynamically updated."; }
    if (num == 11) { hintsStr = "<b>MEP:off</b> - Dynamic Map of Electrostatic Potential is <b class='red'>turned off</b>."; }
    if (num == 12) { hintsStr = "<b>Compare:compare</b> - When two models are in the Jmol window, this option will compare the models for equivalence, including stereochemical equivalence."; }
    if (num == 13) { hintsStr = "<b>Query:sdf</b> - The sdf coordinate file for the model in the Jmol window is opened in a new browser window. NOTE: Browser pop-up blocker must be turned off."; }
    if (num == 14) { hintsStr = "<b>Model:move</b> - Click/drag on an atom to translate a model. ALT/click/drag on an atom to rotate a model."; }
    if (num == 15) { hintsStr = "<b>Model:translate/rotate</b> - After clicking <b>rotate</b> or <b>translate</b>, click on an atom to select a model. After selection, use the arrow keys for X and Y movement. Use the i and o keys for Z movement."; }
    if (num == 16) { hintsStr = "<b>Optimize:Jmol/NIH</b> - Jmol optimize uses an MMFF94 minimization calculation. NIH optimize queries the NIH/NCI Resolver for an optimized structure."; }
    if (num == 17) { hintsStr = "<b>Optimize:correct H</b> - Correct H deletes all hydrogen atoms and calculates the proper insertion of all hydrogen atoms."; }
    if (num == 18) { hintsStr = "<b>Optimize:off</b> - Optimize off toggles auto optimization on model editing. When off, edited models will not be optimized automatically."; }
    if (num == 19) { hintsStr = "<b>Arrow:on/add/off</b> - After turning arrow on, click add to draw an arrow. Shift/drag on any circle to move the arrow. Alt/drag to change the length or the arc of the arrow. Click off to delete arrows."; }
    if (num == 20) { hintsStr = "<b>Utility:invert</b> - Clicking invert results in a sterochemical inversion at that point. This inversion may fail in certain ring systems."; }
    if (num == 21) { hintsStr = "<b>Movie:auto</b> - Clicking auto toggeles auto frame capturing on and off. When on, clicking the rotate/translate XYZ buttons automatically captures each movement in a frame."; }
    if (num == 22) { hintsStr = "<b>Bond:increase</b> - Clicking a bond in the Jmol window will <b class='red'>increase the order of</b> that bond."; }
    if (num == 23) { hintsStr = "<b>Model:delete</b> - Clicking on a model atom will delete the model."; }
    if (num == 24) { hintsStr = "<b>Movie:begin</b> - Begins a new frame animation session. Modify the current model and click captureFrame to assemble a series of animation frames. Click end to print and run the animation."; }
    if (num == 25) { hintsStr = "<b>Query:aka</b> - Opens the AKA query tool for the displayed model in a new browser window. NOTE: Browser pop-up blocker must be turned off."; }
    if (num == 26) { hintsStr = "<b>Measure:len/ang/tor</b> - Click 2 atoms to measure length (<b>len</b>); click 3 connected atoms to measure angle (<b>ang</b>); click 4 connected atoms to measure torsion (<b>tor</b>)."; }
    if (num < 27) { feedback("<img src=\"../images/info.png\" height=\"20px\" width=\"20px\" alt=\"Info\" style=\"vertical-align: text-bottom; border: 0px;\" />" + hintsStr, 1); }
}

//function loadMolJmol(nm, loadAppend, dataSv) {
    //alert(nm);
    //var spt = ""; var modMove = "";
    //var serverMessage = "The requested model data was not returned.|The data server may be temporarly off line.|Try loading the model again. It may have been|just a brief connection problem.";
    //if (isNumeric(nm)) { dataSv = "nih.aspx?cid2sdf="; }
    //if (loadAppend == "append") { modMove = "select *;translateSelected {" + bbMax() + " " + bbMax() + " 0}"; }
    //jmolScript("echo Please wait.|Contacting database."); spt = 'set appendNew false;var x = "' + nm + '";timeout "pub" 5000 "quit;echo ' + serverMessage + '";var z = load("' + dataSv + '" + x);if (z.find("Sorry") > 0){echo ' + serverMessage + ';timeout "pub" off;exit};' + modMove + ';load ' + loadAppend + ' "@z";hover off;select *;wireframe 0.15;spacefill 23%;boundbox {*};centerat boundbox;calculate partialCharge;timeout "pub" off;javascript "getFormula();setJsState();setLnkSwitch();"'; jmolScript(spt);
//}

function loadMolJmol(nm, loadAppend, dataSv) {
    //alert(nm);
    var spt = ""; var modMove = "";
    var serverMessage = "The requested model data was not returned.|The data server may be temporarly off line.|Try loading the model again. It may have been|just a brief connection problem.";
    //if (isNumeric(nm)) { dataSv = "nih.aspx?cid2sdf="; }
    if (loadAppend == "append") { modMove = "select *;translateSelected {" + bbMax() + " " + bbMax() + " 0}"; }
    jmolScript("echo Please wait.|Contacting database."); spt = 'set appendNew false;var x = "' + nm + '";var z = load("' + dataSv + '" + x);if (z.find("$$$$") > 0 == false){echo ' + serverMessage + ';exit};' + modMove + ';load ' + loadAppend + ' "@z";hover off;select *;wireframe 0.15;spacefill 23%;boundbox {*};centerat boundbox;calculate partialCharge;javascript "getFormula();setJsState();setLnkSwitch();"'; jmolScript(spt);
}