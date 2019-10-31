---
title: "CSS-only low-poly Earth Globe"
draft: false
date: 2019-10-12T21:42:15.626Z
publishdate: 2019-10-12T21:42:15.626Z
tags: [ ]
---
CSS-only Earth Globe experiment on CodePen: https://codepen.io/jperals/pen/ExYqwyJ

(Visit with caution: it's a bit resource hungry)

Features:

- CSS 3D transforms
- CSS animations
- CSS gradient backgrounds
- CSS pseudo-selectors (`:before`, `:after`, `:nth-child`)
- SCSS with trigonometric functions

The hardest part was to stretch the tiles according to the spherical surface (note that they are trapeziums, not rectangles, otherwise they would cross and overlap each other). For this an extra `:before` pseudo-element was required which gets a slight 3D rotation. I wrote an isolated CodePen with the formula that finds the exact 3D transformation to render a specific trapezoid, which can be found [here](https://codepen.io/jperals/pen/WNeBqBG).

[This other CodePen](https://codepen.io/jperals/pen/eYObWYW) shows how the tiles with part ground and part sea are achieved (using CSS gradient backgrounds).

Finally, CSS provides 3D transformations but not light simulation, so I added an `:after` pseudo-element to every tile that basically animates from opaque white to transparent to opaque black. To "shade" according to angle, each tile in the row has a different animation delay.
    