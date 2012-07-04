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
