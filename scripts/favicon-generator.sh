#!/bin/bash

# Script Name: favicon-generator.sh

# Check if arguments are provided
if [ -z "$1" ]; then
  echo "Usage: ./favicon-generator.sh <image_file>"
  exit 1
fi

# Get the input file and filename without extension
input_file="$1"
filename="$(basename "$input_file" | cut -d. -f1)"
directory="$(dirname "$input_file")"
scaled_dir="$directory/scaled"

# Create scaled directory if it doesn't exist
mkdir -p "$scaled_dir"

# Check if the input file exists
if [ ! -f "$input_file" ]; then
  echo "Error: File '$input_file' not found!"
  exit 1
fi

# Define target sizes for favicon outputs
favicon_sizes=(48 180 192 512)

# Generate favicons in PNG format
for size in "${favicon_sizes[@]}"; do
  favicon_output="$scaled_dir/${filename}-${size}x${size}.png"
  magick "$input_file" -resize "${size}x${size}" "$favicon_output"
  if [ $? -eq 0 ]; then
    echo "Generated: $favicon_output"
  else
    echo "Failed to generate PNG favicon for size ${size}x${size}."
  fi
done

# Generate ICO format (using multiple sizes)
ico_output="favicon.ico"
magick "$input_file" -resize 16x16 -resize 32x32 -resize 48x48 -resize 64x64 "$ico_output"
if [ $? -eq 0 ]; then
  echo "Generated: $ico_output"
else
  echo "Failed to generate ICO format."
fi
