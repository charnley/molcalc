#!/usr/bin/env python

import os
import tempfile
# Make enviromental data
os.environ['MPLCONFIGDIR'] = tempfile.mkdtemp()

import matplotlib
matplotlib.use('Agg') # For saving without $DISPLAY

import simplejson
import pylab
import numpy
import sys

# Freq IR Spectrum
# lorentzian

if(len(sys.argv)!=2):
  print "Usage: creategraph.py <JSON String>"
  sys.exit()

# file format:
# freq, intensity
# 171.05, 2.05
json_in = simplejson.loads(sys.argv[1])

vib_dic = json_in[0]
int_dic = json_in[1]

fwhm = 3.0 # width = 3 cm**-1

def noel(height, fwhm, x, peak):
  a = fwhm**2.0/4.0
  return height * a / ((x-peak)**2 + a)

def lorentz(height, fwhm, x, peak):
  a = fwhm/4.0
  return height * a / ((x-peak)**2 + a**2)

# spectrum go from 0 to 4000 cm^-1

stepsize = 1.0;
maxno = 4000;

res = 4000
hak = 4000.0/res
xvalues = []
for i in range(res):
  xvalues.append( i*hak  )

yvalues = [float(0) for i in range(res)]
ylvalues = [float(0) for i in range(res)]

"""
for key in vib_dic:
  peak = vib_dic[key]
  intensity = int_dic[key]
  print key, peak, intensity
  for k in range(len(xvalues)):
    yvalues[k] = yvalues[k] - noel(intensity*100.0, 3.0, xvalues[k], peak)
  #print "here"
"""


pylab.plot(xvalues, yvalues, 'k-')
pylab.ylim([-100,10])
pylab.savefig('plot.png')
