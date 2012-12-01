# Input

## Events

* Callbacks
* Bubbling
* Canceling - `preventDefault` and `return false`

## Types of Events

### Mouse

* `mousedown` - `mouseup`
* `click`
* `mousemove`
* `mouseover` - `mouseout`
* `mouseenter` - `mouseleave`

### Time

* `setTimeout(callback, milliseconds)`
* `setInterval(callback, milliseconds)`
* `requestAnimationFrame(callback)` - [more info and polyfill](http://paulirish.com/2011/requestanimationframe-for-smart-animating/)

### UI Events

* `scroll`
* `resize`
* `focus` - `blur`
* `change`

### Keyboard

I recommend [keymaster](https://github.com/madrobby/keymaster)

### Mouse Scroll Wheel (and trackpad two-finger scroll gesture)

e.g. for Google Maps-style zoom in and out. I recommend [JQuery mousewheel](https://github.com/brandonaaron/jquery-mousewheel)

### Context Menu

Not an event, per se. But it's sometimes useful to be able to shoehorn in a few more mouse "events" than just `click`. I recommend [JQuery Context Menu](http://medialize.github.com/jQuery-contextMenu/).

### Touch events

[HTML5 Rocks Tutorial](http://www.html5rocks.com/en/mobile/touch/)

### Device orientation and motion

[HTML5 Rocks Tutorial](http://www.html5rocks.com/en/tutorials/device/orientation/)