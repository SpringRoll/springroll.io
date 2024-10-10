The [docs site](http://springroll.io/) has been completely rewritten from the ground up using the [Docusaurus](https://docusaurus.io/) framework. It's a React-based static doc site generator. The layout is responsive and has a dark mode. The new documentation is designed to be more user-friendly, with improved navigation and a better reading experience. 

All of the documentation for SpringRoll and SpringRoll Container has been added to the new site. This will be where documentation for those repositories will belong. 

At the moment, the documentation is just a direct copy of those repositories. We are planning to re-organize and update the documentation to make it easier to navigate and read.

PBS KIDS branding and a brief write-up about the team’s work on the project have been added to the homepage. 


### Ported Content
All example content has been moved over to the new docs site. It's all included as part of the `Examples` section.  `Game Demo` and `Scale Manager` have also been moved to this section. 

#### Example changes
###### Game Demo
- The node packages in the project have all been updated, including SpringRoll.
- The demo now implements the SpringRoll `SafeScaleManager`, allowing it to scale down to fit smaller screens.
- The title screen has been updated with the correct capitalization.
- Captions styling has been updated to match the style used in most PBS KIDS games.
- The sidebar buttons and game event indicators have been updated to match the new docs site styling and work in dark mode.
- The demo is now displayed using SpringRoll Container instead of just using Bellhop.


###### Speech Synth
- The example is the same, just with styling from the docs site.

###### Color Filter
- The example image is no longer stretched. 
- The rest is the same, just with the new styling.

###### Resize
- This example now uses the `SafeScaleManager` as the original `ScaleManager` is deprecated. Code examples represent this too.
- The rest is the same, just with the new styling.

###### Bellhop
- This example has been simplified to only demonstrate how to use Bellhop without using SpringRoll specific events.

###### Controls
- The example is the same, just with styling from the docs site.

###### Indexed DB
- The data display table is simplified from the original version, because it was using a built in Vue component. This new table still shows everything in the data store, but is not sortable or paginated.
- The help section below the example now has a horizontal row of tabs instead of vertical. This was done to keep the page responsive.
- The example's colors and styling were updated to make it fit in with the new site, and to not be jarring when viewed in dark mode. The layout is also now responsive.
- There are some new error checks for things like empty fields. These were throwing error logs to the console on the original. 
- A few bugs were identified in the SpringRoll IDB implementation. Opening and deleting stores with incorrect version numbers can cause errors. This shouldn't affect most users under normal circumstances, but we've made a ticket to address this.


### Removed Content
- API documentation has been removed. It was automatically generated from code comments, but hasn't been actively maintained or organized. 
- Captions Studio has been removed. It is now part of SpringRoll Studio.
- The SpringRoll 1 section has been removed. It's no longer relevant as all developers should be using SpringRoll 2.
- The GitHub wiki link to SpringRoll 1 documentation has also been removed.

---------------------
## Setup and Development
### Installation

```
$ npm install
```

### Local Development

```
$ npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.


### Examples

#### IndexedDB

The IndexedDB example iframe content is stored in `static/idbExample/`. It currently uses the `2.6.0` version of `SpringRoll-umd.js`. 