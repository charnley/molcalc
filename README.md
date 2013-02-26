# MolCalc - Molecule Calculator

Hosted at [dgu.ki.ku.dk/molcalc](http://dgu.ki.ku.dk/molcalc)


![Editor Screenshot](https://raw.github.com/jensengroup/molcalc/master/manual/screenshots/molcalc_editor.png)


MolCalc is a web interface that allows anyone to build
small molecules  and estimate molecular properties such as molecular structure,
heats of formation and other thermodynamic properties,
vibrational frequencies and vibrational modes,
and molecular orbitals and orbital energies in a
matter of seconds or minutes - depending on the size.

## For Developers

MolCalc uses

* JSmol to edit and visualise the properties of molecules.

* OpenBabel to convert file formats, calculate molecule charge and creation of 2D PNG structures.

* GAMESS for all QM calculations.

and the source is released under the GPL license.


## Installation Instructions

If you want to install it on your own server
with PHP support, of course.

### Dependency

* Python 2.x

* [OpenBabel w/ Python Bindings and PNG Support](http://openbabel.org/docs/dev/Installation/install.html)

* [GAMESS](http://www.msg.ameslab.gov/gamess/)


### Installation

1. Clone

2. cp settings.default settings

3. fill in settings

4. Done

### Credits

MolCalc 1.1 is written by Jimmy Charnley Kromann based on an idea by Jan Jensen.
The development of MolCalc is supported by the University of Copenhagen through
the Education at its Best Initiative (Den Gode Uddannelse).


