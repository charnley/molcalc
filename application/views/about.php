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

		<h1>About Page for the&hellip;</h1>

    <div class="view_navigation">
      <ul>
        <li class="student"><a class="button active">Student</a></li>
        <li class="teacher"><a class="button">Teacher</a></li>
        <li class="developer"><a class="button">Developer</a></li>
      </ul>
    </div>

    <div class="section student">
      <div style="width:500px;height:400px;float:right;overflow:hidden;background:#efefef;margin:0 0 20px 20px;">
        <iframe width="500" height="400" src="http://www.youtube.com/embed/ODdGGrzNp9Y?wmode=opaque" frameborder="0" allowfullscreen></iframe>
      </div>
      <h2>For the Student</h2>
      <br />
      <p>
        Hello and welcome to <strong>MolCalc</strong> (Molecule Calculator).
      </p>
      <p>
        Watch the tutorial video.
      </p>
      <p>
        <strong>How do I measure distances in MolCalc?</strong><br />
        You double-click on atom 1 and then double-click on atom 2, in the JSmol window. Starts at 3:24 in the video.
      </p>
      <p>
        <strong>How do I measure angles in MolCalc?</strong><br />
        You double-click on atom 1, single click on atom 2, and then double-click on atom 3, in the JSmol window.
      </p>

      <div class="clean"></div>
    </div>


    <div class="section teacher">
      <!-- http://pubs.acs.org/doi/abs/10.1021/ed400164n -->
      <h2>For the Teacher</h2>
      <br />
      <p><strong>What is MolCalc?</strong>
      <br />
      MolCalc is a web interface that allows anyone to build
      <a class="explain">
        <span class="hvrHlpCnt "><span class="hvrHlp">
        MolCalc 1.1 only allows calculations on (closed shell) molecules with only doubly occupied molecular orbitals and with less than 11 non-hydrogen atoms.
        </span></span>
        small molecules
      </a>
      and estimate molecular properties such as molecular structure, 
      heats of formation and other thermodynamic properties,
      vibrational frequencies and
      vibrational modes,
      and molecular orbitals and
      orbital energies in a matter of seconds or minutes - depending on the size.
      </p>
      <p>
      MolCalc is designed for teaching as opposed to research -
      specifically for assignments in which students build their own molecules and estimate their own molecular properties. 
      MolCalc is designed to run fast and therefore estimated molecular properties will not match experimental values exactly, and in some cases be quite different.
      The idea is to have students develop a “chemical intuition” about how molecular structure affects molecular properties, without performing the underlying calculations by hand (which would be near impossible for all but the simplest chemical systems).
      </p>
      <p><strong>How can I use MolCalc in teaching?</strong>
      <br />
      Just like a pocket calculator or a symbolic math program (such as Mathematica or MAPLE),
      MolCalc allows one to assign “higher level” chemical problems,
      that are not practically possible to solve previously
      </p>
      <p>
      For example, one might now ask students to compute the effect of a substituent on a particular vibration, and then rationalize it using molecular orbitals.  Or one might ask more open ended questions such as “build a molecule with an unusually long C-C single bond”.
      </p>
    </div>


    <div class="section developer">
      <h2>For the Developer</h2>
      <br />
      <p><strong>How does MolCalc work?</strong>
      <br />
      In the Molecule Editor page the molecular structure is build using <a href="http://chemapps.stolaf.edu/jmol/jsmol/test2.htm">JSmol</a> and energy minimized using the MMFF force field as implemented in JSmol. 
      </p>
      <p>
        In the Molecule Calculator page the structure is re-optimized at the <a href="http://en.wikipedia.org/wiki/PM3_(chemistry)">PM3</a> level of theory for a maximum of 50 steps.  This structure is then used to compute the heat of formation or vibrational frequencies at the PM3 level of theory, or the molecular orbitals using the RHF/STO-3G level of theory.  These calculations are performed with the GAMESS program. OpenBabel is used to manage input files and coordinate files.
      </p>

      <p><strong>Can I modify and/or install MolCalc on my own server?</strong>
      <br />
        Yes, MolCalc is distributed through GitHub under the GPL license <a href="https://github.com/jensengroup/molcalc">github.com/jensengroup/molcalc</a>.
        <br />
        You must obtain a copy of the GAMESS code separately from <a href="http://www.msg.ameslab.gov/gamess/download.html">www.msg.ameslab.gov/gamess/download.html</a>
      </p>
      <p>
        The interface code uses PHP5, Bash Shell, Python, jQuery, HTML5 and CSS3
        but is very modular.
        It therefore quite easy to add new capabilities to MolCalc, including new calculation types.
      </p>

      <p><strong>Who is involved with MolCalc?</strong>
      <br />
        MolCalc 1.1 is written by <a href="http://jimmy.charnley.dk">Jimmy Charnley Kromann</a>
        based on an idea by <a href="http://molecularmodelingbasics.blogspot.dk/">Jan Jensen</a>.
        Toke Fritzemeier wrote an early prototype.
        The development of MolCalc is supported by the University of Copenhagen through the Education 
        at its Best initiative (Den gode uddannelse).
      </p>

      <p><strong>Feedback</strong>
      <br />
      Bug reports and feature requests can be given here: 
      <a href="https://github.com/jensengroup/molcalc/issues?state=open">github.com/jensengroup/molcalc/issues</a>
      </p>

      <p>
      Link to older versions of MolCalc:<br />
      <a href="http://dgu.ki.ku.dk/molcalc-1.0">dgu.ki.ku.dk/molcalc-1.0</a>
      </p>

    </div>
		
	</section>
</section>
