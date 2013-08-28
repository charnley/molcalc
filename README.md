# The Molecule Calculator (MolCalc)

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

* Python 2.7

* [OpenBabel w/ Python Bindings and PNG Support](http://openbabel.org/docs/dev/Installation/install.html)
  Make sure that the the correct libs are installed before compile open babel. See above link.

* [GAMESS](http://www.msg.ameslab.gov/gamess/)

* mod rewrite. MolCalc uses a .htaccess script for redirecting the web requests. Please make sure mod\_rewrite
  is enabled. On ubuntu this is done by running the command

  sudo a2enmod rewrite

* A Chemspider API Token. [Sign up for a Chemspider user](http://www.chemspider.com/controls/Login/RegForm.aspx)
  This is used for searches on common names in the editor.


### Installation

1. Clone the molcalc repo the correct folder

2. copy and paste settings.default to settings

3. fill in settings;
   gamess: The path to the rungms executable
   tmp: The path for the tmp folder (for writing tmp gamess log files)
   chemspider: The chemspider API token.

5. Run the test.php via a browser to check if everything is setup correctly.

4. Done, Happy calculating


### Changelog

Changes in 1.2

1. Removed Chemspider dependicies. Now only using Cactus for naming.

2. Removed OpenBabel charge script. Now using JSMOL FF for partial charges instead.

3. Update UX with small improvements

### Credits

MolCalc is written by Jimmy Charnley Kromann and Maher Channir, based on an idea by Jan Jensen.

The development of MolCalc is supported by the University of Copenhagen through
the Education at its Best Initiative (Den Gode Uddannelse).


