#!/usr/bin/env python

# from:
# http://blog.matt-swain.com/post/16893587098/chemspipy-a-python-wrapper-for-the-chemspider-api

import chemspipy
import re, sys

if len(sys.argv) != 2:
  print 'usage : molecule_name.py <search string>'
  sys.exit(1)

search = sys.argv[1]
c = chemspipy.find_one(search)

try:
  name = c.commonname
except AttributeError:
  name = 0
print name

