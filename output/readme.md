# Output

Making things show up, hide, and change on the page.

You have a few options for this.

## DOM / CSS manipulation

You can directly [change the HTML](http://api.jquery.com/html/) on the page. You can [change attributes](http://api.jquery.com/attr/) (e.g. the `src` of an `img`). Also [changing, adding, and removing `class`es](http://api.jquery.com/category/manipulation/class-attribute/) on an element can be very effective.

You can [change CSS](http://api.jquery.com/css/) position attributes (e.g. `left`, `top`) to make things move.

Hide things by changing `display`. Progressively hide things by changing `opacity`.

Or change `color`, `background-color`, etc.

The JQuery methods for all of this are in the [Manipulation](http://api.jquery.com/category/Manipulation/) category.

## CSS3 Transforms

You can arbitrarily rotate and scale DOM elements (and do other transformations). You'll need to manipulate the `transform` CSS attribute.

Gotcha: You'll need to deal with vendor prefixes. I recommend [prefix-free](http://leaverou.github.com/prefixfree/) with the JQuery plugin.

## CSS3 Transitions

Can be a quick way to add animations without managing every frame of the animation with JS. Essentially they let you specify that a given CSS attribute (e.g. `opacity`, `left`, `background-color`, etc.) should only change *gradually*, at a certain speed, rather than immediately. So then when you change that CSS attribute via JS, instead of changing immediately to the new value, it animates.

I like to just use them for simple transitions (i.e. what is described above). They can do a lot more but it gets tricky fast. [The Code Player](http://thecodeplayer.com/) has some excellent tutorials/examples for these fancier effects.

Gotcha: You'll need to deal with vendor prefixes. I recommend [prefix-free](http://leaverou.github.com/prefixfree/).

## Canvas and SVG

Canvas and SVG are the main ways to draw arbitrary shapes (instead of just the rectangles that you would draw with HTML `div`s for example).

### Similarities

Both Canvas and SVG use a model similar to Adobe Illustrator for describing shapes. A shape is defined as a *path*, which is composed of straight and curved (*arcs* and *beziers*) line segments. A path can be *filled* and/or *stroked*.

Also, both use the same style of transformations. Transformations are a combination of *translations*, *rotations*, and *scaling*. Transformations can also be specified using a *matrix*.

### Canvas

* Low-level. "State machine" API.
* Doesn't support layers or z-ordering. You need to draw shapes in order from back to front. (Or you can position multiple canvases on top of each other.)
* For animations, you either clear and redraw the entire canvas for every frame, or draw on top of what you've already drawn.
* Can do pixel-by-pixel manipulation.
* Can access the current frame of a `video` element and draw it to the canvas.
* Can export images (e.g. PNGs, JPGs).
* Better performance than SVG, especially if you're drawing *lots* of shapes.
* Doesn't support mouse events on shapes. You need to manually figure out if the mouse is on a shape (i.e. within a path) using `isPointInPath(x, y)`
* [MDN Canvas Tutorials](https://developer.mozilla.org/en-US/docs/Canvas_tutorial)
* [Canvas Cheat Sheet](http://www.nihilogic.dk/labs/canvas_sheet/HTML5_Canvas_Cheat_Sheet.pdf)

### SVG

* High-level. DOM-like API.
* SVG elements are just like HTML elements, except they're shapes (e.g. circles, lines, curves, etc.).
* You can modify existing shapes by changing their attributes.
* Shapes respond to mouse events just like HTML elements.
* You can organize shapes into layers (with `g`) and have a hierarchy of transformations.
* Has a slightly larger API than Canvas, e.g. dashed lines.
* Gotcha: SVG elements (e.g. `circle`, `path`, `g`, etc.) all need to live inside an `svg` element.
* Gotcha: JQuery has a bug manipulating an SVG element's class.
* [SVG Cheat Sheet](http://www.cheat-sheets.org/own/svg/index.xhtml)

## WebGL

WebGL is even lower level than Canvas. It lets you directly access OpenGL (a standard API for doing high-performance graphics). Unfortunately this is pretty esoteric and not very well documented. Most of the people doing WebGL stuff are coming from a background in graphics programming (e.g. video games, 3D graphics).

Your best bet for now is probably [three.js](http://mrdoob.github.com/three.js/). See also my upcoming book [Pixel Shaders](http://pixelshaders.com/).