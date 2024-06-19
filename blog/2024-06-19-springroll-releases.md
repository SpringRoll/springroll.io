---
slug: springroll-releases
title: SpringRoll Releases - June 19
authors: 902seanryan
tags: [springroll, releases, springroll-seed, templates]
---
Hello everyone!

## ![logo](/img/logo.png) Special SR Release Update ![logo](/img/logo.png) ##

We just launched: 
- 2.0.0 of SpringRoll-Seed
- 2.0.0 of templates/pixi
- 2.0.0 of templates/phaser3

PLEASE - if you are just starting a new project, pull in these latest versions so you can get the most recent features and compatibility support.

Major shoutout goes to Jeremy McCurdy for making all of these updates!

Changelog since our last release (1.3.1)

**2.0.0 templates/pixi**
- Updated PixiJS from 7.0.4 to 8.1.0
- Updated Pixi Sound from 5.0.0 to 6.0.0
- Updated SpringRoll (Core) from 2.4.4 to 2.6.0
- Updated feature list and state listeners to follow a standardized set

Pixi: This includes a number of breaking changes introduced:
- Package imports are formatted a little differently
- Pixi application initialization now must be wrapped with async await
- DisplayObject was replaced with Container
- updateTransform was replaced with _onRender
- mipmap property was renamed to autoGenerateMipmaps on BaseTexture
- Only Container classes can have children now, so calling addChild on something like a Sprite will no longer work.
- Most constructors now take objects instead of sets of arguments

Pixi Sound: No considerable changes between versions 5 and 6. The biggest change is the requirement of PixiJS version 8+.

**2.0.0 templates/phaser3**

We were still on a modified version of Phaser 3.55.2 (some of you may recall it took Phaser team a couple years before they released 3.60)
- Updated Phaser from 3.55.2 to 3.80.1 (3 major version jumps; 3.60.0, 3.70.0, 3.80.0)
- Updated SpringRoll (Core) from 2.4.4 to 2.6.0
- Fixed warning with SpringRoll listeners
- Updated feature list and state listeners to follow a standardized set

There are lots of new features for game devs along with bug fixes, API changes, and performance improvements. Engineering team called out the items that seem most relevant to us:
- 3.60.0 introduced a significant mobile WebGL performance boost: https://github.com/phaserjs/phaser/blob/v3.60.0/changelog/3.60/MobilePerformance.md
- It also introduced ESM support, which can cause issues with outdated build systems (old versions of Webpack for example) and dependencies.
- 3.70.0 changed how pixel rounding works. It’s all GPU driven instead of CPU driven. It looks like the goal of this was to get better pixel position and scaling accuracy, but it may also have a performance/browser compatibility impact.
- 3.80.0 added WebGL context restore, which keeps games running after losing context. I think this is when switching applications or tabs, so we will need to check if this affects pausing and resuming.
- They didn’t call out much in terms of breaking changes, but we were far enough behind that it’s a distinct possibility.

More references if you want to dig deeper:
- https://github.com/pixijs/pixijs/releases/tag/v8.1.0
- https://github.com/pixijs/sound/releases/tag/v6.0.0
- https://pixijs.com/8.x/guides/migrations/v8
- https://github.com/phaserjs/phaser/releases/tag/v3.60.0
- https://github.com/phaserjs/phaser/releases/tag/v3.70.0
- https://github.com/phaserjs/phaser/releases/tag/v3.80.0
- https://github.com/phaserjs/phaser/blob/v3.60.0/changelog/3.60/MobilePerformance.md