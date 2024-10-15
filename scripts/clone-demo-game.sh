#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

CLONE_DIRECTORY="springroll-io-demo-game"
TARGET_DIRECTORY="static/springroll-io-demo-game"

# Create the folder where we'll drop the demo game contents
rm -rf "$TARGET_DIRECTORY"
mkdir -p "$TARGET_DIRECTORY"

# Clone down the demo game
rm -rf "$CLONE_DIRECTORY"
git clone --depth=1 https://github.com/SpringRoll/springroll-io-demo-game.git "$CLONE_DIRECTORY"
cp -R "$CLONE_DIRECTORY"/docs/* "$TARGET_DIRECTORY"
rm -rf "$CLONE_DIRECTORY"
