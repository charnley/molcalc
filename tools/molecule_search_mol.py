#!/usr/bin/env python

import chemspipy
import re, sys

if len(sys.argv) != 2:
  print 'usage : molecule_search.py <search string>'
  sys.exit(1)

search = sys.argv[1]
c = chemspipy.find_one(search)

try:
  print c.mf

except AttributeError:
  print "0"


