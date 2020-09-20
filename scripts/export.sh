#!/bin/bash

/Applications/Aseprite.app/Contents/MacOS/aseprite \
  -b \
  --filename-format '{tag}:{frame}:{layer}' \
  --list-tags \
  --list-slices \
  --sheet client/public/assets/avatar.png \
  --split-layers \
  --ignore-layer Background \
  --sheet-pack \
  --data artwork/avatar.json \
  artwork/character.aseprite 