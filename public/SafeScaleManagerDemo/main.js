!function(t){function e(e){for(var o,s,r=e[0],h=e[1],c=e[2],u=0,f=[];u<r.length;u++)s=r[u],Object.prototype.hasOwnProperty.call(n,s)&&n[s]&&f.push(n[s][0]),n[s]=0;for(o in h)Object.prototype.hasOwnProperty.call(h,o)&&(t[o]=h[o]);for(l&&l(e);f.length;)f.shift()();return a.push.apply(a,c||[]),i()}function i(){for(var t,e=0;e<a.length;e++){for(var i=a[e],o=!0,r=1;r<i.length;r++){var h=i[r];0!==n[h]&&(o=!1)}o&&(a.splice(e--,1),t=s(s.s=i[0]))}return t}var o={},n={0:0},a=[];function s(e){if(o[e])return o[e].exports;var i=o[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,s),i.l=!0,i.exports}s.m=t,s.c=o,s.d=function(t,e,i){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)s.d(i,o,function(e){return t[e]}.bind(null,o));return i},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="";var r=window.webpackJsonp=window.webpackJsonp||[],h=r.push.bind(r);r.push=e,r=r.slice();for(var c=0;c<r.length;c++)e(r[c]);var l=h;a.push([671,1]),i()}({1777:function(t,e,i){"use strict";i.r(e);i(858),i(859);var o=i(143);function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function r(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function h(t){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function c(t,e){return(c=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var l=function(t){function e(){return a(this,e),r(this,h(e).apply(this,arguments))}var i,n,l;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&c(t,e)}(e,Phaser.Scene),i=e,(n=[{key:"preload",value:function(){this.load.image("logo","./assets/Springroll-Logo.png")}},{key:"create",value:function(){this.resolutionArea=this.add.graphics();var t=g.resolutions.maxWidth,e=g.resolutions.maxHeight,i=g.resolutions.safeWidth,n=g.resolutions.safeHeight;this.resolutionArea.lineStyle(2,16711680),this.resolutionArea.strokeRect(1,1,t-2,e-2),this.resolutionArea.lineStyle(2,65280,.5),this.resolutionArea.strokeRect(1+(t-i)/2,1+(e-n)/2,i-1-2,n-1-2),this.logoImg=this.add.image(0,0,"logo"),this.resolutionDisplay=this.add.text(0,0,this.getResolutionText(),{color:"#ffffff"}),this.textAnchor=new o.a({position:{x:10,y:10},direction:{x:-1,y:-1},callback:this.onTextAnchorResize.bind(this)}),this.logoAnchor=new o.a({position:g.anchor.position,direction:g.anchor.direction,callback:this.onLogoAnchorResize.bind(this)}),g.safeScale.addEntity(this.textAnchor),g.safeScale.addEntity(this.logoAnchor),this.events.on("destroy",this.destroy,this),this.game.events.on("updateAnchor",this.onUpdateDemoAnchor,this)}},{key:"destroy",value:function(){g.safeScale.removeEntity(this.textAnchor),this.resolutionDisplay=void 0,this.textAnchor=null}},{key:"onTextAnchorResize",value:function(t){var e=t.x,i=t.y;this.resolutionDisplay.setPosition(e,i),this.resolutionDisplay.text=this.getResolutionText()}},{key:"onLogoAnchorResize",value:function(t){var e=t.x,i=t.y;this.logoImg.setPosition(e,i)}},{key:"onUpdateDemoAnchor",value:function(){this.logoAnchor.position=g.anchor.position,this.logoAnchor.direction=g.anchor.direction}},{key:"getResolutionText",value:function(){return"Game Width: ".concat(g.resolutions.maxWidth,"\n")+"Game Height: ".concat(g.resolutions.maxHeight,"\n\n")+"Safe Width: ".concat(g.resolutions.safeWidth,"\n")+"Safe Height: ".concat(g.resolutions.safeHeight,"\n\n")+"Window Width: ".concat(window.innerWidth,"\n")+"Window Height: ".concat(window.innerHeight,"\n\n")+"View X: ".concat(Math.round(100*g.safeScale.viewArea.x)/100,"\n")+"View Y: ".concat(Math.round(100*g.safeScale.viewArea.y)/100,"\n")+"View Width: ".concat(Math.round(100*g.safeScale.viewArea.width)/100,"\n")+"View Height: ".concat(Math.round(100*g.safeScale.viewArea.height)/100,"\n\n")+"View Left: ".concat(Math.round(100*g.safeScale.viewArea.left)/100,"\n")+"View Right: ".concat(Math.round(100*g.safeScale.viewArea.right)/100,"\n")+"View Top: ".concat(Math.round(100*g.safeScale.viewArea.top)/100,"\n")+"View Bottom: ".concat(Math.round(100*g.safeScale.viewArea.bottom)/100,"\n")}}])&&s(i.prototype,n),l&&s(i,l),e}();function u(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var f={maxWidth:1320,maxHeight:780,safeWidth:1024,safeHeight:660},d={position:{x:0,y:0},direction:{x:0,y:0}},p=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.app=new o.b,this.safeScale=void 0,this.game=void 0,this.resolutions=Object.assign({},f),this.anchor=Object.assign({},d),this.app.state.ready.subscribe(this.onAppReady.bind(this))}var e,i,n;return e=t,(i=[{key:"onAppReady",value:function(t){t&&(this.app.container.on("applyChanges",this.onDemoVariableChange.bind(this)),this.app.container.on("updateAnchor",this.onDemoAnchorChange.bind(this)),this.initializeGame(),this.safeScale=new o.c({width:this.resolutions.maxWidth,height:this.resolutions.maxHeight,safeWidth:this.resolutions.safeWidth,safeHeight:this.resolutions.safeHeight,callback:this.onSafeScaleResize.bind(this)}))}},{key:"onDemoVariableChange",value:function(t){this.resolutions.maxWidth=y(t,"data.maxWidth",f.maxWidth),this.resolutions.maxHeight=y(t,"data.maxHeight",f.maxHeight),this.resolutions.safeWidth=y(t,"data.safeWidth",f.safeWidth),this.resolutions.safeHeight=y(t,"data.safeHeight",f.safeHeight),this.anchor.direction.x=y(t,"data.direction.x",d.direction.x),this.anchor.direction.y=y(t,"data.direction.y",d.direction.y),this.anchor.position.x=y(t,"data.position.x",d.position.x),this.anchor.position.y=y(t,"data.position.y",d.position.y),this.validateResolutions(),this.safeScale.gameWidth=this.resolutions.maxWidth,this.safeScale.gameHeight=this.resolutions.maxHeight,this.safeScale.safeWidth=this.resolutions.safeWidth,this.safeScale.safeHeight=this.resolutions.safeHeight,this.initializeGame()}},{key:"onDemoAnchorChange",value:function(t){this.anchor.direction.x=y(t,"data.direction.x",d.direction.x),this.anchor.direction.y=y(t,"data.direction.y",d.direction.y),this.anchor.position.x=y(t,"data.position.x",d.position.x),this.anchor.position.y=y(t,"data.position.y",d.position.y),void 0!==this.game&&(this.game.events.emit("updateAnchor"),window.dispatchEvent(new Event("resize")))}},{key:"onSafeScaleResize",value:function(t){var e=t.scaleRatio;this.game&&this.game.canvas&&(this.game.canvas.style.width="".concat(this.resolutions.maxWidth*e,"px"),this.game.canvas.style.height="".concat(this.resolutions.maxHeight*e,"px"))}},{key:"initializeGame",value:function(){void 0!==this.game&&this.game.destroy(!0),this.game=new Phaser.Game({width:this.resolutions.maxWidth,height:this.resolutions.maxHeight,scene:l}),window.dispatchEvent(new Event("resize"))}},{key:"validateResolutions",value:function(){var t=Math.max(this.resolutions.maxWidth,this.resolutions.safeWidth),e=Math.max(this.resolutions.maxHeight,this.resolutions.safeHeight),i=Math.min(this.resolutions.maxWidth,this.resolutions.safeWidth),o=Math.min(this.resolutions.maxHeight,this.resolutions.safeHeight);this.resolutions.maxWidth=t,this.resolutions.maxHeight=e,this.resolutions.safeWidth=i,this.resolutions.safeHeight=o}}])&&u(e.prototype,i),n&&u(e,n),t}();function y(t,e,i){var o,n=function(t){return null!=t},a=t;for(e=e.split(".");e.length>0;){if(o=e.shift(),!n(a)||!n(o)||!n(a[o]))return i;a=a[o]}return a}i.d(e,"demo",(function(){return g}));var g=new p},671:function(t,e,i){i(672),t.exports=i(1777)},858:function(t,e,i){}});