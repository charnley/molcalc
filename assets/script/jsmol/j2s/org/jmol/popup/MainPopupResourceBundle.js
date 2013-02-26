Clazz.declarePackage ("org.jmol.popup");
Clazz.load (["org.jmol.popup.PopupResource"], "org.jmol.popup.MainPopupResourceBundle", ["org.jmol.i18n.GT", "org.jmol.util.StringXBuilder", "$.TextFormat"], function () {
c$ = Clazz.declareType (org.jmol.popup, "MainPopupResourceBundle", org.jmol.popup.PopupResource);
Clazz.overrideMethod (c$, "getMenuName", 
function () {
return "popupMenu";
});
Clazz.overrideMethod (c$, "buildStructure", 
function (menuStructure) {
this.addItems (org.jmol.popup.MainPopupResourceBundle.menuContents);
this.addItems (org.jmol.popup.MainPopupResourceBundle.structureContents);
this.setStructure (menuStructure);
}, "~S");
c$.Box = Clazz.defineMethod (c$, "Box", 
($fz = function (cmd) {
return "if (showBoundBox or showUnitcell) {" + cmd + "} else {boundbox on;" + cmd + ";boundbox off}";
}, $fz.isPrivate = true, $fz), "~S");
Clazz.overrideMethod (c$, "getWordContents", 
function () {
var wasTranslating = org.jmol.i18n.GT.getDoTranslate ();
org.jmol.i18n.GT.setDoTranslate (true);
var words = ["modelSetMenu", org.jmol.i18n.GT._ ("No atoms loaded"), "configurationComputedMenu", org.jmol.i18n.GT._ ("Configurations"), "elementsComputedMenu", org.jmol.i18n.GT._ ("Element"), "FRAMESbyModelComputedMenu", org.jmol.i18n.GT._ ("Model/Frame"), "languageComputedMenu", org.jmol.i18n.GT._ ("Language"), "PDBaaResiduesComputedMenu", org.jmol.i18n.GT._ ("By Residue Name"), "PDBnucleicResiduesComputedMenu", org.jmol.i18n.GT._ ("By Residue Name"), "PDBcarboResiduesComputedMenu", org.jmol.i18n.GT._ ("By Residue Name"), "PDBheteroComputedMenu", org.jmol.i18n.GT._ ("By HETATM"), "surfMoComputedMenuText", org.jmol.i18n.GT._ ("Molecular Orbitals ({0})"), "SYMMETRYSelectComputedMenu", org.jmol.i18n.GT._ ("Symmetry"), "SYMMETRYShowComputedMenu", org.jmol.i18n.GT._ ("Space Group"), "SYMMETRYhide", org.jmol.i18n.GT._ ("Hide Symmetry"), "hiddenModelSetText", org.jmol.i18n.GT._ ("Model information"), "selectMenuText", org.jmol.i18n.GT._ ("Select ({0})"), "allModelsText", org.jmol.i18n.GT._ ("All {0} models"), "configurationMenuText", org.jmol.i18n.GT._ ("Configurations ({0})"), "modelSetCollectionText", org.jmol.i18n.GT._ ("Collection of {0} models"), "atomsText", org.jmol.i18n.GT._ ("atoms: {0}"), "bondsText", org.jmol.i18n.GT._ ("bonds: {0}"), "groupsText", org.jmol.i18n.GT._ ("groups: {0}"), "chainsText", org.jmol.i18n.GT._ ("chains: {0}"), "polymersText", org.jmol.i18n.GT._ ("polymers: {0}"), "modelMenuText", org.jmol.i18n.GT._ ("model {0}"), "viewMenuText", org.jmol.i18n.GT._ ("View {0}"), "mainMenuText", org.jmol.i18n.GT._ ("Main Menu"), "biomoleculesMenuText", org.jmol.i18n.GT._ ("Biomolecules"), "biomoleculeText", org.jmol.i18n.GT._ ("biomolecule {0} ({1} atoms)"), "loadBiomoleculeText", org.jmol.i18n.GT._ ("load biomolecule {0} ({1} atoms)"), "selectAll", org.jmol.i18n.GT._ ("All"), "selectNone", org.jmol.i18n.GT._ ("None"), "hideNotSelectedCB", org.jmol.i18n.GT._ ("Display Selected Only"), "invertSelection", org.jmol.i18n.GT._ ("Invert Selection"), "viewMenu", org.jmol.i18n.GT._ ("View"), "front", org.jmol.i18n.GT._ ("Front"), "left", org.jmol.i18n.GT._ ("Left"), "right", org.jmol.i18n.GT._ ("Right"), "top", org.jmol.util.TextFormat.split (org.jmol.i18n.GT._ ("Top[as in \"view from the top, from above\" - (translators: remove this bracketed part]"), '[')[0], "bottom", org.jmol.i18n.GT._ ("Bottom"), "back", org.jmol.i18n.GT._ ("Back"), "PDBproteinMenu", org.jmol.i18n.GT._ ("Protein"), "allProtein", org.jmol.i18n.GT._ ("All"), "proteinBackbone", org.jmol.i18n.GT._ ("Backbone"), "proteinSideChains", org.jmol.i18n.GT._ ("Side Chains"), "polar", org.jmol.i18n.GT._ ("Polar Residues"), "nonpolar", org.jmol.i18n.GT._ ("Nonpolar Residues"), "positiveCharge", org.jmol.i18n.GT._ ("Basic Residues (+)"), "negativeCharge", org.jmol.i18n.GT._ ("Acidic Residues (-)"), "noCharge", org.jmol.i18n.GT._ ("Uncharged Residues"), "PDBnucleicMenu", org.jmol.i18n.GT._ ("Nucleic"), "allNucleic", org.jmol.i18n.GT._ ("All"), "DNA", org.jmol.i18n.GT._ ("DNA"), "RNA", org.jmol.i18n.GT._ ("RNA"), "nucleicBackbone", org.jmol.i18n.GT._ ("Backbone"), "nucleicBases", org.jmol.i18n.GT._ ("Bases"), "atPairs", org.jmol.i18n.GT._ ("AT pairs"), "gcPairs", org.jmol.i18n.GT._ ("GC pairs"), "auPairs", org.jmol.i18n.GT._ ("AU pairs"), "PDBheteroMenu", org.jmol.i18n.GT._ ("Hetero"), "allHetero", org.jmol.i18n.GT._ ("All PDB \"HETATM\""), "Solvent", org.jmol.i18n.GT._ ("All Solvent"), "Water", org.jmol.i18n.GT._ ("All Water"), "nonWaterSolvent", org.jmol.i18n.GT._ ("Nonaqueous Solvent") + " (solvent and not water)", "exceptWater", org.jmol.i18n.GT._ ("Nonaqueous HETATM") + " (hetero and not water)", "Ligand", org.jmol.i18n.GT._ ("Ligand"), "allCarbo", org.jmol.i18n.GT._ ("All"), "PDBcarboMenu", org.jmol.i18n.GT._ ("Carbohydrate"), "PDBnoneOfTheAbove", org.jmol.i18n.GT._ ("None of the above"), "renderMenu", org.jmol.i18n.GT._ ("Style"), "renderSchemeMenu", org.jmol.i18n.GT._ ("Scheme"), "renderCpkSpacefill", org.jmol.i18n.GT._ ("CPK Spacefill"), "renderBallAndStick", org.jmol.i18n.GT._ ("Ball and Stick"), "renderSticks", org.jmol.i18n.GT._ ("Sticks"), "renderWireframe", org.jmol.i18n.GT._ ("Wireframe"), "PDBrenderCartoonsOnly", org.jmol.i18n.GT._ ("Cartoon"), "PDBrenderTraceOnly", org.jmol.i18n.GT._ ("Trace"), "atomMenu", org.jmol.i18n.GT._ ("Atoms"), "atomNone", org.jmol.i18n.GT._ ("Off"), "atom15", org.jmol.i18n.GT._ ("{0}% van der Waals", "15"), "atom20", org.jmol.i18n.GT._ ("{0}% van der Waals", "20"), "atom25", org.jmol.i18n.GT._ ("{0}% van der Waals", "25"), "atom50", org.jmol.i18n.GT._ ("{0}% van der Waals", "50"), "atom75", org.jmol.i18n.GT._ ("{0}% van der Waals", "75"), "atom100", org.jmol.i18n.GT._ ("{0}% van der Waals", "100"), "bondMenu", org.jmol.i18n.GT._ ("Bonds"), "bondNone", org.jmol.i18n.GT._ ("Off"), "bondWireframe", org.jmol.i18n.GT._ ("On"), "bond100", org.jmol.i18n.GT._ ("{0} \u00C5", "0.10"), "bond150", org.jmol.i18n.GT._ ("{0} \u00C5", "0.15"), "bond200", org.jmol.i18n.GT._ ("{0} \u00C5", "0.20"), "bond250", org.jmol.i18n.GT._ ("{0} \u00C5", "0.25"), "bond300", org.jmol.i18n.GT._ ("{0} \u00C5", "0.30"), "hbondMenu", org.jmol.i18n.GT._ ("Hydrogen Bonds"), "hbondNone", org.jmol.i18n.GT._ ("Off"), "hbondCalc", org.jmol.i18n.GT._ ("Calculate"), "hbondWireframe", org.jmol.i18n.GT._ ("On"), "PDBhbondSidechain", org.jmol.i18n.GT._ ("Set H-Bonds Side Chain"), "PDBhbondBackbone", org.jmol.i18n.GT._ ("Set H-Bonds Backbone"), "hbond100", org.jmol.i18n.GT._ ("{0} \u00C5", "0.10"), "hbond150", org.jmol.i18n.GT._ ("{0} \u00C5", "0.15"), "hbond200", org.jmol.i18n.GT._ ("{0} \u00C5", "0.20"), "hbond250", org.jmol.i18n.GT._ ("{0} \u00C5", "0.25"), "hbond300", org.jmol.i18n.GT._ ("{0} \u00C5", "0.30"), "ssbondMenu", org.jmol.i18n.GT._ ("Disulfide Bonds"), "ssbondNone", org.jmol.i18n.GT._ ("Off"), "ssbondWireframe", org.jmol.i18n.GT._ ("On"), "PDBssbondSidechain", org.jmol.i18n.GT._ ("Set SS-Bonds Side Chain"), "PDBssbondBackbone", org.jmol.i18n.GT._ ("Set SS-Bonds Backbone"), "ssbond100", org.jmol.i18n.GT._ ("{0} \u00C5", "0.10"), "ssbond150", org.jmol.i18n.GT._ ("{0} \u00C5", "0.15"), "ssbond200", org.jmol.i18n.GT._ ("{0} \u00C5", "0.20"), "ssbond250", org.jmol.i18n.GT._ ("{0} \u00C5", "0.25"), "ssbond300", org.jmol.i18n.GT._ ("{0} \u00C5", "0.30"), "PDBstructureMenu", org.jmol.i18n.GT._ ("Structures"), "structureNone", org.jmol.i18n.GT._ ("Off"), "backbone", org.jmol.i18n.GT._ ("Backbone"), "cartoon", org.jmol.i18n.GT._ ("Cartoon"), "cartoonRockets", org.jmol.i18n.GT._ ("Cartoon Rockets"), "ribbons", org.jmol.i18n.GT._ ("Ribbons"), "rockets", org.jmol.i18n.GT._ ("Rockets"), "strands", org.jmol.i18n.GT._ ("Strands"), "trace", org.jmol.i18n.GT._ ("Trace"), "VIBRATIONMenu", org.jmol.i18n.GT._ ("Vibration"), "vibrationOff", org.jmol.i18n.GT._ ("Off"), "vibrationOn", org.jmol.i18n.GT._ ("On"), "vibration20", "*2", "vibration05", "/2", "VIBRATIONvectorMenu", org.jmol.i18n.GT._ ("Vectors"), "spectraMenu", org.jmol.i18n.GT._ ("Spectra"), "hnmrMenu", org.jmol.i18n.GT._ ("1H-NMR"), "cnmrMenu", org.jmol.i18n.GT._ ("13C-NMR"), "vectorOff", org.jmol.i18n.GT._ ("Off"), "vectorOn", org.jmol.i18n.GT._ ("On"), "vector3", org.jmol.i18n.GT._ ("{0} pixels", "3"), "vector005", org.jmol.i18n.GT._ ("{0} \u00C5", "0.05"), "vector01", org.jmol.i18n.GT._ ("{0} \u00C5", "0.10"), "vectorScale02", org.jmol.i18n.GT._ ("Scale {0}", "0.2"), "vectorScale05", org.jmol.i18n.GT._ ("Scale {0}", "0.5"), "vectorScale1", org.jmol.i18n.GT._ ("Scale {0}", "1"), "vectorScale2", org.jmol.i18n.GT._ ("Scale {0}", "2"), "vectorScale5", org.jmol.i18n.GT._ ("Scale {0}", "5"), "stereoMenu", org.jmol.i18n.GT._ ("Stereographic"), "stereoNone", org.jmol.i18n.GT._ ("None"), "stereoRedCyan", org.jmol.i18n.GT._ ("Red+Cyan glasses"), "stereoRedBlue", org.jmol.i18n.GT._ ("Red+Blue glasses"), "stereoRedGreen", org.jmol.i18n.GT._ ("Red+Green glasses"), "stereoCrossEyed", org.jmol.i18n.GT._ ("Cross-eyed viewing"), "stereoWallEyed", org.jmol.i18n.GT._ ("Wall-eyed viewing"), "labelMenu", org.jmol.i18n.GT._ ("Labels"), "labelNone", org.jmol.i18n.GT._ ("None"), "labelSymbol", org.jmol.i18n.GT._ ("With Element Symbol"), "labelName", org.jmol.i18n.GT._ ("With Atom Name"), "labelNumber", org.jmol.i18n.GT._ ("With Atom Number"), "labelPositionMenu", org.jmol.i18n.GT._ ("Position Label on Atom"), "labelCentered", org.jmol.i18n.GT._ ("Centered"), "labelUpperRight", org.jmol.i18n.GT._ ("Upper Right"), "labelLowerRight", org.jmol.i18n.GT._ ("Lower Right"), "labelUpperLeft", org.jmol.i18n.GT._ ("Upper Left"), "labelLowerLeft", org.jmol.i18n.GT._ ("Lower Left"), "colorMenu", org.jmol.i18n.GT._ ("Color"), "[color_atoms]Menu", org.jmol.i18n.GT._ ("Atoms"), "schemeMenu", org.jmol.i18n.GT._ ("By Scheme"), "cpk", org.jmol.i18n.GT._ ("Element (CPK)"), "altloc#PDB", org.jmol.i18n.GT._ ("Alternative Location"), "molecule", org.jmol.i18n.GT._ ("Molecule"), "formalcharge", org.jmol.i18n.GT._ ("Formal Charge"), "partialcharge#CHARGE", org.jmol.i18n.GT._ ("Partial Charge"), "relativeTemperature#BFACTORS", org.jmol.i18n.GT._ ("Temperature (Relative)"), "fixedTemperature#BFACTORS", org.jmol.i18n.GT._ ("Temperature (Fixed)"), "amino#PDB", org.jmol.i18n.GT._ ("Amino Acid"), "structure#PDB", org.jmol.i18n.GT._ ("Secondary Structure"), "chain#PDB", org.jmol.i18n.GT._ ("Chain"), "group#PDB", org.jmol.i18n.GT._ ("Group"), "monomer#PDB", org.jmol.i18n.GT._ ("Monomer"), "shapely#PDB", org.jmol.i18n.GT._ ("Shapely"), "none", org.jmol.i18n.GT._ ("Inherit"), "black", org.jmol.i18n.GT._ ("Black"), "white", org.jmol.i18n.GT._ ("White"), "cyan", org.jmol.i18n.GT._ ("Cyan"), "red", org.jmol.i18n.GT._ ("Red"), "orange", org.jmol.i18n.GT._ ("Orange"), "yellow", org.jmol.i18n.GT._ ("Yellow"), "green", org.jmol.i18n.GT._ ("Green"), "blue", org.jmol.i18n.GT._ ("Blue"), "indigo", org.jmol.i18n.GT._ ("Indigo"), "violet", org.jmol.i18n.GT._ ("Violet"), "salmon", org.jmol.i18n.GT._ ("Salmon"), "olive", org.jmol.i18n.GT._ ("Olive"), "maroon", org.jmol.i18n.GT._ ("Maroon"), "gray", org.jmol.i18n.GT._ ("Gray"), "slateblue", org.jmol.i18n.GT._ ("Slate Blue"), "gold", org.jmol.i18n.GT._ ("Gold"), "orchid", org.jmol.i18n.GT._ ("Orchid"), "opaque", org.jmol.i18n.GT._ ("Make Opaque"), "translucent", org.jmol.i18n.GT._ ("Make Translucent"), "[color_bonds]Menu", org.jmol.i18n.GT._ ("Bonds"), "[color_hbonds]Menu", org.jmol.i18n.GT._ ("Hydrogen Bonds"), "[color_ssbonds]Menu", org.jmol.i18n.GT._ ("Disulfide Bonds"), "colorPDBStructuresMenu", org.jmol.i18n.GT._ ("Structures"), "[color_backbone]Menu", org.jmol.i18n.GT._ ("Backbone"), "[color_trace]Menu", org.jmol.i18n.GT._ ("Trace"), "[color_cartoon]sMenu", org.jmol.i18n.GT._ ("Cartoon"), "[color_ribbon]sMenu", org.jmol.i18n.GT._ ("Ribbons"), "[color_rockets]Menu", org.jmol.i18n.GT._ ("Rockets"), "[color_strands]Menu", org.jmol.i18n.GT._ ("Strands"), "[color_labels]Menu", org.jmol.i18n.GT._ ("Labels"), "[color_background]Menu", org.jmol.i18n.GT._ ("Background"), "[color_isosurface]Menu", org.jmol.i18n.GT._ ("Surfaces"), "[color_vectors]Menu", org.jmol.i18n.GT._ ("Vectors"), "[color_axes]Menu", org.jmol.i18n.GT._ ("Axes"), "[color_boundbox]Menu", org.jmol.i18n.GT._ ("Boundbox"), "[color_UNITCELL]Menu", org.jmol.i18n.GT._ ("Unit cell"), "zoomMenu", org.jmol.i18n.GT._ ("Zoom"), "zoom50", "50%", "zoom100", "100%", "zoom150", "150%", "zoom200", "200%", "zoom400", "400%", "zoom800", "800%", "zoomIn", org.jmol.i18n.GT._ ("Zoom In"), "zoomOut", org.jmol.i18n.GT._ ("Zoom Out"), "spinMenu", org.jmol.i18n.GT._ ("Spin"), "spinOn", org.jmol.i18n.GT._ ("On"), "spinOff", org.jmol.i18n.GT._ ("Off"), "[set_spin_X]Menu", org.jmol.i18n.GT._ ("Set X Rate"), "[set_spin_Y]Menu", org.jmol.i18n.GT._ ("Set Y Rate"), "[set_spin_Z]Menu", org.jmol.i18n.GT._ ("Set Z Rate"), "[set_spin_FPS]Menu", org.jmol.i18n.GT._ ("Set FPS"), "s0", "0", "s5", "5", "s10", "10", "s20", "20", "s30", "30", "s40", "40", "s50", "50", "FRAMESanimateMenu", org.jmol.i18n.GT._ ("Animation"), "animModeMenu", org.jmol.i18n.GT._ ("Animation Mode"), "onceThrough", org.jmol.i18n.GT._ ("Play Once"), "palindrome", org.jmol.i18n.GT._ ("Palindrome"), "loop", org.jmol.i18n.GT._ ("Loop"), "play", org.jmol.i18n.GT._ ("Play"), "pause", org.jmol.i18n.GT._ ("Pause"), "resume", org.jmol.i18n.GT._ ("Resume"), "stop", org.jmol.i18n.GT._ ("Stop"), "nextframe", org.jmol.i18n.GT._ ("Next Frame"), "prevframe", org.jmol.i18n.GT._ ("Previous Frame"), "rewind", org.jmol.i18n.GT._ ("Rewind"), "playrev", org.jmol.i18n.GT._ ("Reverse"), "restart", org.jmol.i18n.GT._ ("Restart"), "FRAMESanimFpsMenu", org.jmol.i18n.GT._ ("Set FPS"), "animfps5", "5", "animfps10", "10", "animfps20", "20", "animfps30", "30", "animfps50", "50", "measureMenu", org.jmol.i18n.GT._ ("Measurements"), "measureOff", org.jmol.i18n.GT._ ("Double-Click begins and ends all measurements"), "measureDistance", org.jmol.i18n.GT._ ("Click for distance measurement"), "measureAngle", org.jmol.i18n.GT._ ("Click for angle measurement"), "measureTorsion", org.jmol.i18n.GT._ ("Click for torsion (dihedral) measurement"), "PDBmeasureSequence", org.jmol.i18n.GT._ ("Click two atoms to display a sequence in the console"), "measureDelete", org.jmol.i18n.GT._ ("Delete measurements"), "measureList", org.jmol.i18n.GT._ ("List measurements"), "distanceNanometers", org.jmol.i18n.GT._ ("Distance units nanometers"), "distanceAngstroms", org.jmol.i18n.GT._ ("Distance units Angstroms"), "distancePicometers", org.jmol.i18n.GT._ ("Distance units picometers"), "pickingMenu", org.jmol.i18n.GT._ ("Set picking"), "pickOff", org.jmol.i18n.GT._ ("Off"), "pickCenter", org.jmol.i18n.GT._ ("Center"), "pickIdent", org.jmol.i18n.GT._ ("Identity"), "pickLabel", org.jmol.i18n.GT._ ("Label"), "pickAtom", org.jmol.i18n.GT._ ("Select atom"), "PDBpickChain", org.jmol.i18n.GT._ ("Select chain"), "pickElement", org.jmol.i18n.GT._ ("Select element"), "PDBpickGroup", org.jmol.i18n.GT._ ("Select group"), "pickMolecule", org.jmol.i18n.GT._ ("Select molecule"), "SYMMETRYpickSite", org.jmol.i18n.GT._ ("Select site"), "SYMMETRYpickSymmetry", org.jmol.i18n.GT._ ("Show symmetry operation"), "pickSpin", org.jmol.i18n.GT._ ("Spin"), "showMenu", org.jmol.i18n.GT._ ("Show"), "showConsole", org.jmol.i18n.GT._ ("Console"), "showFile", org.jmol.i18n.GT._ ("File Contents"), "showFileHeader", org.jmol.i18n.GT._ ("File Header"), "showHistory", org.jmol.i18n.GT._ ("History"), "showIsosurface", org.jmol.i18n.GT._ ("Isosurface JVXL data"), "showMeasure", org.jmol.i18n.GT._ ("Measurements"), "showMo", org.jmol.i18n.GT._ ("Molecular orbital JVXL data"), "showModel", org.jmol.i18n.GT._ ("Model"), "showOrient", org.jmol.i18n.GT._ ("Orientation"), "showSpacegroup", org.jmol.i18n.GT._ ("Space group"), "SYMMETRYshowSymmetry", org.jmol.i18n.GT._ ("Symmetry"), "showState", org.jmol.i18n.GT._ ("Current state"), "fileMenu", org.jmol.i18n.GT._ ("File"), "reload", org.jmol.i18n.GT._ ("Reload"), "SIGNEDloadPdb", org.jmol.i18n.GT._ ("Open from PDB"), "SIGNEDloadFileOrUrl", org.jmol.i18n.GT._ ("Open file or URL"), "SIGNEDloadFileUnitCell", org.jmol.i18n.GT._ ("Load full unit cell"), "SIGNEDloadScript", org.jmol.i18n.GT._ ("Open script"), "writeFileTextVARIABLE", org.jmol.i18n.GT._ ("Save a copy of {0}"), "writeState", org.jmol.i18n.GT._ ("Save script with state"), "writeHistory", org.jmol.i18n.GT._ ("Save script with history"), "SIGNEDwriteJpg", org.jmol.i18n.GT._ ("Export {0} image", "JPG"), "SIGNEDwritePng", org.jmol.i18n.GT._ ("Export {0} image", "PNG"), "SIGNEDwritePngJmol", org.jmol.i18n.GT._ ("Export {0} image", "PNG+JMOL"), "SIGNEDwriteGif", org.jmol.i18n.GT._ ("Export {0} image", "GIF"), "SIGNEDwritePovray", org.jmol.i18n.GT._ ("Export {0} image", "POV-Ray"), "SIGNEDwriteJmol", org.jmol.i18n.GT._ ("Save all as JMOL file (zip)"), "SIGNEDwriteIsosurface", org.jmol.i18n.GT._ ("Save JVXL isosurface"), "SIGNEDwriteVrml", org.jmol.i18n.GT._ ("Export {0} 3D model", "VRML"), "SIGNEDwriteX3d", org.jmol.i18n.GT._ ("Export {0} 3D model", "X3D"), "SIGNEDwriteIdtf", org.jmol.i18n.GT._ ("Export {0} 3D model", "IDTF"), "SIGNEDwriteMaya", org.jmol.i18n.GT._ ("Export {0} 3D model", "Maya"), "computationMenu", org.jmol.i18n.GT._ ("Computation"), "minimize", org.jmol.i18n.GT._ ("Optimize structure"), "modelkit", org.jmol.i18n.GT._ ("Model kit"), "UNITCELLshow", org.jmol.i18n.GT._ ("Unit cell"), "extractMOL", org.jmol.i18n.GT._ ("Extract MOL data"), "surfaceMenu", org.jmol.i18n.GT._ ("Surfaces"), "surfDots", org.jmol.i18n.GT._ ("Dot Surface"), "surfVDW", org.jmol.i18n.GT._ ("van der Waals Surface"), "surfMolecular", org.jmol.i18n.GT._ ("Molecular Surface"), "surfSolvent14", org.jmol.i18n.GT._ ("Solvent Surface ({0}-Angstrom probe)", "1.4"), "surfSolventAccessible14", org.jmol.i18n.GT._ ("Solvent-Accessible Surface (VDW + {0} Angstrom)", "1.4"), "CHARGEsurfMEP", org.jmol.i18n.GT._ ("Molecular Electrostatic Potential"), "surfOpaque", org.jmol.i18n.GT._ ("Make Opaque"), "surfTranslucent", org.jmol.i18n.GT._ ("Make Translucent"), "surfOff", org.jmol.i18n.GT._ ("Off"), "FILEUNITMenu", org.jmol.i18n.GT._ ("Symmetry"), "FILEMOLload", org.jmol.i18n.GT._ ("Reload {0}", "(molecular)"), "FILEUNITone", org.jmol.i18n.GT._ ("Reload {0}", "{1 1 1}"), "FILEUNITnine", org.jmol.i18n.GT._ ("Reload {0}", "{444 666 1}"), "FILEUNITnineRestricted", org.jmol.i18n.GT._ ("Reload {0} + Display {1}", ["{444 666 1}", "555"]), "FILEUNITninePoly", org.jmol.i18n.GT._ ("Reload + Polyhedra"), "[set_axes]Menu", org.jmol.i18n.GT._ ("Axes"), "[set_boundbox]Menu", org.jmol.i18n.GT._ ("Boundbox"), "[set_UNITCELL]Menu", org.jmol.i18n.GT._ ("Unit cell"), "off#axes", org.jmol.i18n.GT._ ("Hide"), "dotted", org.jmol.i18n.GT._ ("Dotted"), "byPixelMenu", org.jmol.i18n.GT._ ("Pixel Width"), "1p", org.jmol.i18n.GT._ ("{0} px", "1"), "3p", org.jmol.i18n.GT._ ("{0} px", "3"), "5p", org.jmol.i18n.GT._ ("{0} px", "5"), "10p", org.jmol.i18n.GT._ ("{0} px", "10"), "byAngstromMenu", org.jmol.i18n.GT._ ("Angstrom Width"), "10a", org.jmol.i18n.GT._ ("{0} \u00C5", "0.10"), "20a", org.jmol.i18n.GT._ ("{0} \u00C5", "0.20"), "25a", org.jmol.i18n.GT._ ("{0} \u00C5", "0.25"), "50a", org.jmol.i18n.GT._ ("{0} \u00C5", "0.50"), "100a", org.jmol.i18n.GT._ ("{0} \u00C5", "1.0"), "showSelectionsCB", org.jmol.i18n.GT._ ("Selection Halos"), "showHydrogensCB", org.jmol.i18n.GT._ ("Show Hydrogens"), "showMeasurementsCB", org.jmol.i18n.GT._ ("Show Measurements"), "perspectiveDepthCB", org.jmol.i18n.GT._ ("Perspective Depth"), "showBoundBoxCB", org.jmol.i18n.GT._ ("Boundbox"), "showAxesCB", org.jmol.i18n.GT._ ("Axes"), "showUNITCELLCB", org.jmol.i18n.GT._ ("Unit cell"), "colorrasmolCB", org.jmol.i18n.GT._ ("RasMol Colors"), "aboutComputedMenu", org.jmol.i18n.GT._ ("About..."), "APPLETjmolUrl", "http://www.jmol.org", "APPLETmouseManualUrl", org.jmol.i18n.GT._ ("Mouse Manual"), "APPLETtranslationUrl", org.jmol.i18n.GT._ ("Translations")];
org.jmol.i18n.GT.setDoTranslate (wasTranslating);
return words;
});
Clazz.overrideMethod (c$, "getMenuAsText", 
function (title) {
return "# Jmol.mnu " + title + "\n\n" + "# Part I -- Menu Structure\n" + "# ------------------------\n\n" + this.dumpStructure (org.jmol.popup.MainPopupResourceBundle.menuContents) + "\n\n" + "# Part II -- Key Definitions\n" + "# --------------------------\n\n" + this.dumpStructure (org.jmol.popup.MainPopupResourceBundle.structureContents) + "\n\n" + "# Part III -- Word Translations\n" + "# -----------------------------\n\n" + this.dumpWords ();
}, "~S");
Clazz.defineMethod (c$, "dumpWords", 
($fz = function () {
var wordContents = this.getWordContents ();
var s =  new org.jmol.util.StringXBuilder ();
for (var i = 0; i < wordContents.length; i++) {
var key = wordContents[i++];
if (this.structure.getProperty (key) == null) s.append (key).append (" | ").append (wordContents[i]).appendC ('\n');
}
return s.toString ();
}, $fz.isPrivate = true, $fz));
Clazz.defineMethod (c$, "dumpStructure", 
($fz = function (items) {
var previous = "";
var s =  new org.jmol.util.StringXBuilder ();
for (var i = 0; i < items.length; i++) {
var key = items[i][0];
var label = this.words.getProperty (key);
if (label != null) key += " | " + label;
s.append (key).append (" = ").append (items[i][1] == null ? previous : (previous = items[i][1])).appendC ('\n');
}
return s.toString ();
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineStatics (c$,
"MENU_NAME", "popupMenu");
c$.menuContents = c$.prototype.menuContents = [["@COLOR", "black white red orange yellow green cyan blue indigo violet"], ["@AXESCOLOR", "gray salmon maroon olive slateblue gold orchid"], ["popupMenu", "FRAMESbyModelComputedMenu configurationComputedMenu - selectMenuText viewMenu renderMenu colorMenu - surfaceMenu FILEUNITMenu - zoomMenu spinMenu VIBRATIONMenu spectraMenu FRAMESanimateMenu - measureMenu pickingMenu - showConsole showMenu fileMenu computationMenu - languageComputedMenu aboutComputedMenu"], ["selectMenuText", "hideNotSelectedCB showSelectionsCB - selectAll selectNone invertSelection - elementsComputedMenu SYMMETRYSelectComputedMenu - PDBproteinMenu PDBnucleicMenu PDBheteroMenu PDBcarboMenu PDBnoneOfTheAbove"], ["PDBproteinMenu", "PDBaaResiduesComputedMenu - allProtein proteinBackbone proteinSideChains - polar nonpolar - positiveCharge negativeCharge noCharge"], ["PDBcarboMenu", "PDBcarboResiduesComputedMenu - allCarbo"], ["PDBnucleicMenu", "PDBnucleicResiduesComputedMenu - allNucleic nucleicBackbone nucleicBases - DNA RNA - atPairs auPairs gcPairs"], ["PDBheteroMenu", "PDBheteroComputedMenu - allHetero Solvent Water - Ligand exceptWater nonWaterSolvent"], ["viewMenu", "front left right top bottom back"], ["renderMenu", "perspectiveDepthCB showBoundBoxCB showUNITCELLCB showAxesCB stereoMenu - renderSchemeMenu - atomMenu labelMenu bondMenu hbondMenu ssbondMenu - PDBstructureMenu [set_axes]Menu [set_boundbox]Menu [set_UNITCELL]Menu"], ["renderSchemeMenu", "renderCpkSpacefill renderBallAndStick renderSticks renderWireframe PDBrenderCartoonsOnly PDBrenderTraceOnly"], ["atomMenu", "showHydrogensCB - atomNone - atom15 atom20 atom25 atom50 atom75 atom100"], ["bondMenu", "bondNone bondWireframe - bond100 bond150 bond200 bond250 bond300"], ["hbondMenu", "hbondCalc hbondNone hbondWireframe - PDBhbondSidechain PDBhbondBackbone - hbond100 hbond150 hbond200 hbond250 hbond300"], ["ssbondMenu", "ssbondNone ssbondWireframe - PDBssbondSidechain PDBssbondBackbone - ssbond100 ssbond150 ssbond200 ssbond250 ssbond300"], ["PDBstructureMenu", "structureNone - backbone cartoon cartoonRockets ribbons rockets strands trace"], ["VIBRATIONvectorMenu", "vectorOff vectorOn vibScale20 vibScale05 vector3 vector005 vector01 - vectorScale02 vectorScale05 vectorScale1 vectorScale2 vectorScale5"], ["stereoMenu", "stereoNone stereoRedCyan stereoRedBlue stereoRedGreen stereoCrossEyed stereoWallEyed"], ["labelMenu", "labelNone - labelSymbol labelName labelNumber - labelPositionMenu"], ["labelPositionMenu", "labelCentered labelUpperRight labelLowerRight labelUpperLeft labelLowerLeft"], ["colorMenu", "colorrasmolCB - [color_atoms]Menu [color_bonds]Menu [color_hbonds]Menu [color_ssbonds]Menu colorPDBStructuresMenu [color_isosurface]Menu - [color_labels]Menu [color_vectors]Menu - [color_axes]Menu [color_boundbox]Menu [color_UNITCELL]Menu [color_background]Menu"], ["[color_atoms]Menu", "schemeMenu - @COLOR - opaque translucent"], ["[color_bonds]Menu", "none - @COLOR - opaque translucent"], ["[color_hbonds]Menu", null], ["[color_ssbonds]Menu", null], ["[color_labels]Menu", null], ["[color_vectors]Menu", null], ["[color_backbone]Menu", "none - schemeMenu - @COLOR - opaque translucent"], ["[color_cartoon]sMenu", null], ["[color_ribbon]sMenu", null], ["[color_rockets]Menu", null], ["[color_strands]Menu", null], ["[color_trace]Menu", null], ["[color_background]Menu", "@COLOR"], ["[color_isosurface]Menu", "@COLOR - opaque translucent"], ["[color_axes]Menu", "@AXESCOLOR"], ["[color_boundbox]Menu", null], ["[color_UNITCELL]Menu", null], ["colorPDBStructuresMenu", "[color_backbone]Menu [color_cartoon]sMenu [color_ribbon]sMenu [color_rockets]Menu [color_strands]Menu [color_trace]Menu"], ["schemeMenu", "cpk - formalcharge partialcharge#CHARGE - altloc#PDB amino#PDB chain#PDB group#PDB molecule monomer#PDB shapely#PDB structure#PDB relativeTemperature#BFACTORS fixedTemperature#BFACTORS"], ["zoomMenu", "zoom50 zoom100 zoom150 zoom200 zoom400 zoom800 - zoomIn zoomOut"], ["spinMenu", "spinOn spinOff - [set_spin_X]Menu [set_spin_Y]Menu [set_spin_Z]Menu - [set_spin_FPS]Menu"], ["VIBRATIONMenu", "vibrationOff vibrationOn vibration20 vibration05 VIBRATIONvectorMenu"], ["spectraMenu", "hnmrMenu cnmrMenu"], ["FRAMESanimateMenu", "animModeMenu - play pause resume stop - nextframe prevframe rewind - playrev restart - FRAMESanimFpsMenu"], ["FRAMESanimFpsMenu", "animfps5 animfps10 animfps20 animfps30 animfps50"], ["measureMenu", "showMeasurementsCB - measureOff measureDistance measureAngle measureTorsion PDBmeasureSequence - measureDelete measureList - distanceNanometers distanceAngstroms distancePicometers"], ["pickingMenu", "pickOff pickCenter pickIdent pickLabel pickAtom pickMolecule pickElement PDBpickChain PDBpickGroup SYMMETRYpickSite pickSpin"], ["computationMenu", "minimize modelkit"], ["showMenu", "showHistory showFile showFileHeader - showOrient showMeasure - showSpacegroup showState SYMMETRYshowSymmetry UNITCELLshow - showIsosurface showMo - extractMOL"], ["fileMenu", "SIGNEDloadFileOrUrl SIGNEDloadPdb SIGNEDloadScript - reload SIGNEDloadFileUnitCell - writeFileTextVARIABLE writeState writeHistory SIGNEDwriteJmol SIGNEDwriteIsosurface - SIGNEDJAVAwriteGif SIGNEDNOGLwriteJpg SIGNEDNOGLwritePng SIGNEDNOGLwritePngJmol SIGNEDJAVAwritePovray - SIGNEDJAVAwriteVrml SIGNEDJAVAwriteX3d SIGNEDJAVAwriteIdtf SIGNEDJAVAwriteMaya"], ["[set_spin_X]Menu", "s0 s5 s10 s20 s30 s40 s50"], ["[set_spin_Y]Menu", null], ["[set_spin_Z]Menu", null], ["[set_spin_FPS]Menu", null], ["animModeMenu", "onceThrough palindrome loop"], ["surfaceMenu", "surfDots surfVDW surfSolventAccessible14 surfSolvent14 surfMolecular CHARGEsurfMEP surfMoComputedMenuText - surfOpaque surfTranslucent surfOff"], ["FILEUNITMenu", "SYMMETRYShowComputedMenu SYMMETRYhide FILEMOLload FILEUNITone FILEUNITnine FILEUNITnineRestricted FILEUNITninePoly"], ["[set_axes]Menu", "off#axes dotted - byPixelMenu byAngstromMenu"], ["[set_boundbox]Menu", null], ["[set_UNITCELL]Menu", null], ["byPixelMenu", "1p 3p 5p 10p"], ["byAngstromMenu", "10a 20a 25a 50a 100a"], ["aboutComputedMenu", "- "]];
c$.structureContents = c$.prototype.structureContents = [["colorrasmolCB", ""], ["hideNotSelectedCB", "set hideNotSelected true | set hideNotSelected false; hide(none)"], ["perspectiveDepthCB", ""], ["showAxesCB", "set showAxes true | set showAxes false;set axesMolecular"], ["showBoundBoxCB", ""], ["showHydrogensCB", ""], ["showMeasurementsCB", ""], ["showSelectionsCB", ""], ["showUNITCELLCB", ""], ["selectAll", "SELECT all"], ["selectNone", "SELECT none"], ["invertSelection", "SELECT not selected"], ["allProtein", "SELECT protein"], ["proteinBackbone", "SELECT protein and backbone"], ["proteinSideChains", "SELECT protein and not backbone"], ["polar", "SELECT protein and polar"], ["nonpolar", "SELECT protein and not polar"], ["positiveCharge", "SELECT protein and basic"], ["negativeCharge", "SELECT protein and acidic"], ["noCharge", "SELECT protein and not (acidic,basic)"], ["allCarbo", "SELECT carbohydrate"], ["allNucleic", "SELECT nucleic"], ["DNA", "SELECT dna"], ["RNA", "SELECT rna"], ["nucleicBackbone", "SELECT nucleic and backbone"], ["nucleicBases", "SELECT nucleic and not backbone"], ["atPairs", "SELECT a,t"], ["gcPairs", "SELECT g,c"], ["auPairs", "SELECT a,u"], ["A", "SELECT a"], ["C", "SELECT c"], ["G", "SELECT g"], ["T", "SELECT t"], ["U", "SELECT u"], ["allHetero", "SELECT hetero"], ["Solvent", "SELECT solvent"], ["Water", "SELECT water"], ["nonWaterSolvent", "SELECT solvent and not water"], ["exceptWater", "SELECT hetero and not water"], ["Ligand", "SELECT ligand"], ["PDBnoneOfTheAbove", "SELECT not(hetero,protein,nucleic,carbohydrate)"], ["front", org.jmol.popup.MainPopupResourceBundle.Box ("moveto 2.0 front;delay 1")], ["left", org.jmol.popup.MainPopupResourceBundle.Box ("moveto 1.0 front;moveto 2.0 left;delay 1")], ["right", org.jmol.popup.MainPopupResourceBundle.Box ("moveto 1.0 front;moveto 2.0 right;delay 1")], ["top", org.jmol.popup.MainPopupResourceBundle.Box ("moveto 1.0 front;moveto 2.0 top;delay 1")], ["bottom", org.jmol.popup.MainPopupResourceBundle.Box ("moveto 1.0 front;moveto 2.0 bottom;delay 1")], ["back", org.jmol.popup.MainPopupResourceBundle.Box ("moveto 1.0 front;moveto 2.0 back;delay 1")], ["renderCpkSpacefill", "restrict bonds not selected;select not selected;spacefill 100%;color cpk"], ["renderBallAndStick", "restrict bonds not selected;select not selected;spacefill 23%AUTO;wireframe 0.15;color cpk"], ["renderSticks", "restrict bonds not selected;select not selected;wireframe 0.3;color cpk"], ["renderWireframe", "restrict bonds not selected;select not selected;wireframe on;color cpk"], ["PDBrenderCartoonsOnly", "restrict bonds not selected;select not selected;cartoons on;color structure"], ["PDBrenderTraceOnly", "restrict bonds not selected;select not selected;trace on;color structure"], ["atomNone", "cpk off"], ["atom15", "cpk 15%"], ["atom20", "cpk 20%"], ["atom25", "cpk 25%"], ["atom50", "cpk 50%"], ["atom75", "cpk 75%"], ["atom100", "cpk on"], ["bondNone", "wireframe off"], ["bondWireframe", "wireframe on"], ["bond100", "wireframe .1"], ["bond150", "wireframe .15"], ["bond200", "wireframe .2"], ["bond250", "wireframe .25"], ["bond300", "wireframe .3"], ["hbondCalc", "hbonds calculate"], ["hbondNone", "hbonds off"], ["hbondWireframe", "hbonds on"], ["PDBhbondSidechain", "set hbonds sidechain"], ["PDBhbondBackbone", "set hbonds backbone"], ["hbond100", "hbonds .1"], ["hbond150", "hbonds .15"], ["hbond200", "hbonds .2"], ["hbond250", "hbonds .25"], ["hbond300", "hbonds .3"], ["ssbondNone", "ssbonds off"], ["ssbondWireframe", "ssbonds on"], ["PDBssbondSidechain", "set ssbonds sidechain"], ["PDBssbondBackbone", "set ssbonds backbone"], ["ssbond100", "ssbonds .1"], ["ssbond150", "ssbonds .15"], ["ssbond200", "ssbonds .2"], ["ssbond250", "ssbonds .25"], ["ssbond300", "ssbonds .3"], ["structureNone", "backbone off;cartoons off;ribbons off;rockets off;strands off;trace off;"], ["backbone", "restrict not selected;select not selected;backbone 0.3"], ["cartoon", "restrict not selected;select not selected;set cartoonRockets false;cartoons on"], ["cartoonRockets", "restrict not selected;select not selected;set cartoonRockets;cartoons on"], ["ribbons", "restrict not selected;select not selected;ribbons on"], ["rockets", "restrict not selected;select not selected;rockets on"], ["strands", "restrict not selected;select not selected;strands on"], ["trace", "restrict not selected;select not selected;trace 0.3"], ["vibrationOff", "vibration off"], ["vibrationOn", "vibration on"], ["vibration20", "vibrationScale *= 2"], ["vibration05", "vibrationScale /= 2"], ["vectorOff", "vectors off"], ["vectorOn", "vectors on"], ["vector3", "vectors 3"], ["vector005", "vectors 0.05"], ["vector01", "vectors 0.1"], ["vectorScale02", "vector scale 0.2"], ["vectorScale05", "vector scale 0.5"], ["vectorScale1", "vector scale 1"], ["vectorScale2", "vector scale 2"], ["vectorScale5", "vector scale 5"], ["stereoNone", "stereo off"], ["stereoRedCyan", "stereo redcyan 3"], ["stereoRedBlue", "stereo redblue 3"], ["stereoRedGreen", "stereo redgreen 3"], ["stereoCrossEyed", "stereo -5"], ["stereoWallEyed", "stereo 5"], ["labelNone", "label off"], ["labelSymbol", "label %e"], ["labelName", "label %a"], ["labelNumber", "label %i"], ["labelCentered", "set labeloffset 0 0"], ["labelUpperRight", "set labeloffset 4 4"], ["labelLowerRight", "set labeloffset 4 -4"], ["labelUpperLeft", "set labeloffset -4 4"], ["labelLowerLeft", "set labeloffset -4 -4"], ["zoom50", "zoom 50"], ["zoom100", "zoom 100"], ["zoom150", "zoom 150"], ["zoom200", "zoom 200"], ["zoom400", "zoom 400"], ["zoom800", "zoom 800"], ["zoomIn", "move 0 0 0 40 0 0 0 0 1"], ["zoomOut", "move 0 0 0 -40 0 0 0 0 1"], ["spinOn", "spin on"], ["spinOff", "spin off"], ["s0", "0"], ["s5", "5"], ["s10", "10"], ["s20", "20"], ["s30", "30"], ["s40", "40"], ["s50", "50"], ["onceThrough", "anim mode once#"], ["palindrome", "anim mode palindrome#"], ["loop", "anim mode loop#"], ["play", "anim play#"], ["pause", "anim pause#"], ["resume", "anim resume#"], ["stop", "anim off#"], ["nextframe", "frame next#"], ["prevframe", "frame prev#"], ["playrev", "anim playrev#"], ["rewind", "anim rewind#"], ["restart", "anim on#"], ["animfps5", "anim fps 5#"], ["animfps10", "anim fps 10#"], ["animfps20", "anim fps 20#"], ["animfps30", "anim fps 30#"], ["animfps50", "anim fps 50#"], ["measureOff", "set pickingstyle MEASURE OFF; set picking OFF"], ["measureDistance", "set pickingstyle MEASURE; set picking MEASURE DISTANCE"], ["measureAngle", "set pickingstyle MEASURE; set picking MEASURE ANGLE"], ["measureTorsion", "set pickingstyle MEASURE; set picking MEASURE TORSION"], ["PDBmeasureSequence", "set pickingstyle MEASURE; set picking MEASURE SEQUENCE"], ["measureDelete", "measure delete"], ["measureList", "console on;show measurements"], ["distanceNanometers", "select *; set measure nanometers"], ["distanceAngstroms", "select *; set measure angstroms"], ["distancePicometers", "select *; set measure picometers"], ["pickOff", "set picking off"], ["pickCenter", "set picking center"], ["pickIdent", "set picking ident"], ["pickLabel", "set picking label"], ["pickAtom", "set picking atom"], ["PDBpickChain", "set picking chain"], ["pickElement", "set picking element"], ["PDBpickGroup", "set picking group"], ["pickMolecule", "set picking molecule"], ["SYMMETRYpickSite", "set picking site"], ["pickSpin", "set picking spin"], ["SYMMETRYpickSymmetry", "set picking symmetry"], ["showConsole", "console"], ["showFile", "console on;show file"], ["showFileHeader", "console on;getProperty FileHeader"], ["showHistory", "console on;show history"], ["showIsosurface", "console on;show isosurface"], ["showMeasure", "console on;show measure"], ["showMo", "console on;show mo"], ["showModel", "console on;show model"], ["showOrient", "console on;show orientation"], ["showSpacegroup", "console on;show spacegroup"], ["showState", "console on;show state"], ["reload", "load \"\""], ["SIGNEDloadPdb", "load ?PdbId?"], ["SIGNEDloadFileOrUrl", "load ?"], ["SIGNEDloadFileUnitCell", "load ? {1 1 1}"], ["SIGNEDloadScript", "script ?.spt"], ["writeFileTextVARIABLE", "if (_applet && !_signedApplet) { console;show file } else { write file \"?FILE?\"}"], ["writeState", "if (_applet && !_signedApplet) { console;show state } else { write state \"?FILEROOT?.spt\"}"], ["writeHistory", "if (_applet && !_signedApplet) { console;show history } else { write history \"?FILEROOT?.his\"}"], ["SIGNEDwriteJmol", "write \"?FILEROOT?.jmol\""], ["SIGNEDwriteIsosurface", "write isosurface \"?FILEROOT?.jvxl\""], ["SIGNEDJAVAwriteGif", "write image \"?FILEROOT?.gif\""], ["SIGNEDNOGLwriteJpg", "write image \"?FILEROOT?.jpg\""], ["SIGNEDNOGLwritePng", "write image \"?FILEROOT?.png\""], ["SIGNEDNOGLwritePngJmol", "write PNGJ \"?FILEROOT?.png\""], ["SIGNEDJAVAwritePovray", "write POVRAY \"?FILEROOT?.pov\""], ["SIGNEDJAVAwriteVrml", "write VRML \"?FILEROOT?.wrl\""], ["SIGNEDJAVAwriteX3d", "write X3D \"?FILEROOT?.x3d\""], ["SIGNEDJAVAwriteIdtf", "write IDTF \"?FILEROOT?.idtf\""], ["SIGNEDJAVAwriteMaya", "write MAYA \"?FILEROOT?.ma\""], ["SYMMETRYshowSymmetry", "console on;show symmetry"], ["UNITCELLshow", "console on;show unitcell"], ["extractMOL", "console on;getproperty extractModel \"visible\" "], ["minimize", "minimize"], ["modelkit", "set modelkitmode"], ["surfDots", "dots on"], ["surfVDW", "isosurface delete resolution 0 solvent 0 translucent"], ["surfMolecular", "isosurface delete resolution 0 molecular translucent"], ["surfSolvent14", "isosurface delete resolution 0 solvent 1.4 translucent"], ["surfSolventAccessible14", "isosurface delete resolution 0 sasurface 1.4 translucent"], ["CHARGEsurfMEP", "isosurface delete resolution 0 vdw color range all map MEP translucent"], ["surfOpaque", "mo opaque;isosurface opaque"], ["surfTranslucent", "mo translucent;isosurface translucent"], ["surfOff", "mo delete;isosurface delete;select *;dots off"], ["SYMMETRYhide", "draw sym_* delete"], ["FILEMOLload", "save orientation;load \"\";restore orientation;center"], ["FILEUNITone", "save orientation;load \"\" {1 1 1} ;restore orientation;center"], ["FILEUNITnine", "save orientation;load \"\" {444 666 1} ;restore orientation;center"], ["FILEUNITnineRestricted", "save orientation;load \"\" {444 666 1} ;restore orientation; unitcell on; display cell=555;center visible;zoom 200"], ["FILEUNITninePoly", "save orientation;load \"\" {444 666 1} ;restore orientation; unitcell on; display cell=555; polyhedra 4,6 (displayed);center (visible);zoom 200"], ["1p", "on"], ["3p", "3"], ["5p", "5"], ["10p", "10"], ["10a", "0.1"], ["20a", "0.20"], ["25a", "0.25"], ["50a", "0.50"], ["100a", "1.0"]];
});