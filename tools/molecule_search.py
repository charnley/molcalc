#!/usr/bin/env python

import chemspipy
import re, sys

if len(sys.argv) != 2:
  print 'usage : molecule_search.py <search string>'
  sys.exit(1)

search = sys.argv[1]
c = chemspipy.find_one(search)

try:
  inchi = c.inchi
  print inchi
#  print c.mol3d

except AttributeError:
  print "0"


