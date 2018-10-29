# Ember.js + Stencil.js components

This demo demonstrates how to use Web Components created with [stencil.js](stenciljs.com)
in an Ember app. This covers:

* Packaging/building
* data binding

## Requirements

* Node 6.x + npm +5.x

## Install

* Clone the repo
* `npx lerna bootstrap`

## Usage

* `npm start`
* Open your browser to `http://localhost:4200`

# What's in it?

* `packages/ember-demo` is just the demo app using the components.
  * See `app/controllers/application.js` and `app/templates/application.hbs` for the interesting part
* `packages/ember-cli-stencil` is an unpublished addon that simplifies the packaging of Stencil components.
  * **tl;dr;** it's just nothing but copy/paste commands. Will be published soon(ish)
* `packages/my-stencil-web-components` is a small repo of 2 web components built with Stencil.js. If you know Stencil, nothing fancy here.

The applcation in itself doesn't do much:
* You can click on the red text to change the greeting from Ember
* You can click on thr button to toggle the usage of the Components slots from Ember
* It's just a demo, right? 😅

# LICENSE

```
        DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE 
                    Version 2, December 2004 

 Copyright (C) 2018

 Everyone is permitted to copy and distribute verbatim or modified 
 copies of this license document, and changing it is allowed as long 
 as the name is changed. 

            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE 
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION 

  0. You just DO WHAT THE FUCK YOU WANT TO.
```
