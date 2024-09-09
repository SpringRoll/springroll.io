#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

# Create the folder where we'll drop the demo game contents
rm -rf static/springroll-io-demo-game
mkdir static/springroll-io-demo-game

# Clone down the demo game
rm -rf springroll-io-demo-game
git clone --depth=1 https://github.com/SpringRoll/springroll-io-demo-game.git
cp -R springroll-io-demo-game/docs/* static/springroll-io-demo-game
rm -rf springroll-io-demo-game
