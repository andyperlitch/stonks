#!/bin/bash

/Applications/Aseprite.app/Contents/MacOS/aseprite \
  -b \
  --filename-format '{tag}:{frame}:{layer}' \
  --list-tags \
  --list-slices \
  --sheet artwork/output.png \
  --split-layers \
  --ignore-layer Background \
  --sheet-pack \
  --data artwork/output.json \
  artwork/character.aseprite 