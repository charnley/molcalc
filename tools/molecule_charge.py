#!/usr/bin/env python
"""
molecule_charge.py - Determine the charge of molecule using Open Babel
based on https://github.com/cstein/blogsamples/blob/master/residue_charge.py

**********************************************************************
calculation.js

Copyright (C) 2012 Jimmy Charnley Kromann, DGU

This file is part of the MolCalc project.

MolCalc is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

FragIt is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
02110-1301, USA.
***********************************************************************

shell cmd: LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/lib python molecule_charge.py coordinates.xyz

"""
import sys
import openbabel

if( len(sys.argv) != 3 ):
  print "Usage: molecule_charge charge_type <in.pdb>"
  sys.exit()
file_in = sys.argv[2]
charge_type = sys.argv[1]

obConversion = openbabel.OBConversion()
obConversion.SetInFormat("xyz")

mol = openbabel.OBMol()
obConversion.ReadFile(mol, file_in)

# get the charges of the atoms
charge_model = openbabel.OBChargeModel.FindType("mmff94")
charge_model.ComputeCharges(mol)
partial_charges = charge_model.GetPartialCharges()

molec_charge = 0.0
core_charges = 0.0

for atom in openbabel.OBMolAtomIter( mol ):
  atom_idx = atom.GetIdx()
  molec_charge += atom.GetPartialCharge()
  core_charges += atom.GetAtomicNum()
  #print 'index:',atom_idx,'charge:',atom.GetPartialCharge(), 'valence', atom.GetValence(), 'number', atom.GetAtomicNum()


# Print the charge of selected type
if(charge_type == 'q'):
  print int(molec_charge)

if(charge_type =='z'):
  print int(core_charges)

