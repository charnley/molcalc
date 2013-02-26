#!/bin/bash

# Creates 2D image of XYZ file with the usage
# of open babel
# Needs PNG support in open babel

if [ "$1" == "" ];
then
  echo "Usage: molecule_image.sh <in.xyz>"
  exit
fi

name=${1%.*}

# Create Image, without title
obabel "$1" -O $name.png --title " "
