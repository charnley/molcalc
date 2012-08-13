<?php
/**********************************************************************
about.php

Copyright (C) 2012 Jimmy Charnley Kromann, DGU

This file is part of the MolCalc project.

MolCalc is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

MolCalc is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
02110-1301, USA.
***********************************************************************/

?>
<section class="body">
	<section class="container">

		<h1>Jan Jensen's Molecule Calculator</h1>
    
    <article class="text" style="margin:0 400px 0 10px;">




<strong>What is MolCalc?</strong>
<p>
MolCalc is a web interface that allows anyone to build 
<a class="explain">
  <span class="hvrHlpCnt "><span     class="hvrHlp">
  MolCalc 1.0 only allows calculations on (closed shell) molecules with only doubly occupied molecular orbitals and with less than 11 non-hydrogen atoms.
  </span></span>
  small molecules
</a>
 and estimate molecular properties such as molecular structure, heats of formation, vibrational frequencies and vibrational modes, and molecular orbitals and orbital energies in a matter of seconds or minutes - depending on the size.  
</p>
<p>
MolCalc is designed for teaching as opposed to research - specifically for assignments in which students build their own molecules and estimate their own molecular properties.  MolCalc is designed to run fast and therefore estimated molecular properties will not match experimental values exactly, and in some cases be quite different.  The idea is to have students develop a “chemical intuition” about how molecular structure affects molecular properties, without performing the underlying calculations by hand (which would be near impossible for all but the simplest chemical systems). 
</p>

<strong>How can I use MolCalc in teaching?</strong>
<p>
Just like a pocket calculator or a symbolic math program (such as Mathematica or MAPLE), MolCalc allows one to assign “higher level” chemical problems, that are not practically possible to solve previously.  
</p>
<p>
For example, one might now ask students to compute the effect of a substituent on a particular vibration, and then rationalize it using molecular orbitals.  Or one might ask more open ended questions such as “build a molecule with an unusually long C-C single bond”.
</p>

<strong>How does MolCalc work?</strong>
<p>
In the Molecule Editor page the molecular structure is build using Jmol and energy minimized using the UFF force field as implemented in Jmol. 
</p>
<p>
  In the Molecule Calculator page the structure is re-optimized at the PM3 level of theory for a maximum of 50 steps.  This structure is then used to compute the heat of formation or vibrational frequencies at the PM3 level of theory, or the molecular orbitals using the RHF/STO-3G level of theory.  These calculations are performed with the GAMESS program. OpenBabel is used to manage input files and coordinate files.
</p>

<strong>Can I modify and/or install MolCalc on my own server?</strong>
<p>
  Yes, MolCalc is distributed through github under the GPL license (<a href="https://github.com/charnley/molcalc">https://github.com/charnley/molcalc</a>). You must obtain a copy of the GAMESS code separately from <a href="http://www.msg.ameslab.gov/gamess/download.html">http://www.msg.ameslab.gov/gamess/download.html</a>
</p>
<p>
  The interface code uses PHP5, jQuery, HTML5, and CSS3 and is very modular.  It therefore quite easy to add new capabilities to MolCalc.
</p>
<strong>Who is involved with MolCalc?</strong>
<p>
  MolCalc 1.0 is written by Jimmy Charnley Kromann based on an idea by Jan Jensen. Toke Fritzemeier wrote an early prototype.  The development of MolCalc is supported by the University of Copenhagen through the Education at its Best initiative (Den gode uddannelse).
</p>


    </article>


		
	</section>
</section>
