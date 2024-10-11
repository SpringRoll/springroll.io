# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2024-10-11
## Changed
- This is a complete rewrite of SpringRoll.io using the [Docusaurus](https://docusaurus.io/) framework.
- The site now uses React instead of Vue, and is responsive.
- All example content has been ported over. It's included as part of the `Examples` section. `Game Demo` and `Scale Manager` have also been moved to this section. 
- All example UI elements have been updated to follow the styles and standards of the new site. Notable updates will be outlined below.

#### Game Demo Changes
- The game demo has had all of its packages updated. 
- Implemented `SafeScaleManager`. 
- The title screen has been updated.
- Captions styling has been updated.
- The demo is now displayed using SpringRoll Container instead of just using Bellhop.

#### Color Filter Changes
- The example image is no longer stretched. 

#### Resize Changes
- This example now uses the `SafeScaleManager` instead of `ScaleManager`. 

#### Bellhop
- This example has been simplified to only demonstrate how to use Bellhop without using SpringRoll specific events.

#### Indexed DB
- The data display table was rewritten and simplified. It was using a built-in Vue component. 
- The help section below the example now has a horizontal row of tabs instead of vertical.
- There are new error checks for things that used to silently fail.
- A few bugs were identified in the SpringRoll IDB implementation. Opening and deleting stores with incorrect version numbers can cause errors. This shouldn't affect most users under normal circumstances, but we've made a ticket to address this.

## Added
- PBS KIDS branding and a brief write-up about the team’s work on the project have been added to the homepage. 

## Removed
- API documentation has been removed. 
- Captions Studio has been removed. It is now part of SpringRoll Studio.
- The SpringRoll 1 section has been removed. 
- The GitHub wiki link to SpringRoll 1 documentation has also been removed.


## [2.1.0] - 2021-03-04
## Added
- This changelog
- character count for captions and warning when over 40 characters per line
- caption error reporting
- Safe Scale Manager demo page
- Indexed DB demo page under examples/

## Changed
- Import is changed to allow for individual files rather than whole directories
- Caption output is no longer an HTML string. Changed to plain text.
- JSON Preview is now editable and will reflect across the other components

