# springroll.io

The **./deploy** folder of this project publishes to [SpringRoll.github.io](/SpringRoll/SpringRoll.github.io) for GitHub Pages deployment.

## Building

Install [NPM](https://npmjs.org) modules. NodeJS and NPM are required.

```
npm install
```
Build the site [LESS](http://lesscss.org/), [Jade](http://jade-lang.com/) and JavaScript using the default [Grunt](http://gruntjs.com) task.

```
grunt
```

Build the site in debug mode (unminified source code, pretty HTML, pretty CSS).

```
grunt debug
```

## Deployment

Copy the contents of the **./deploy** folder to the [SpringRoll.github.io](/SpringRoll/SpringRoll.github.io) repository (cloned along-size the springroll.io repository in your workspace).

```
grunt deploy
```
*Note: this simply copies the contents of the site, a commit and push is still need on [SpringRoll.github.io](/SpringRoll/SpringRoll.github.io).*
