# Vanilla JS Marquee - Infinite Scroll

A vanilla JS lightweight (zero dependencies) library to create smooth infinite scrolling (marquee) effects in the browser.

## Demo
You can see the library in action here: [daniele-vigano.github.io/cf-infinite-scroll](https://daniele-vigano.github.io/cf-infinite-scroll/)

## Installation

```bash
npm install cf-infinite-scroll
```

## Usage

### HTML
The structure requires a container and an inner element with the class `.track`.

```html
<div id="my-scroller">
    <div class="track">
        <img src="logo1.png" alt="">
        <img src="logo2.png" alt="">
        <img src="logo3.png" alt="">
    </div>
</div>
```

### JavaScript

```javascript
import CFInfiniteScroll from 'cf-infinite-scroll';

const scroller = new CFInfiniteScroll('#my-scroller', {
    speed: 100, // pixels per second
    pauseOnMouseEnter: true, // pauses the animation when the mouse hovers over it
    injectStyles: true // automatically injects the minimal required CSS styles
});

scroller.init();

// To stop and clean up:
// scroller.destroy();
```

## API

| Option              | Type      | Default | Description                                                                                                                                                                                     |
|---------------------|-----------|---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `speed`             | `number`  | `100`   | Scroll speed in px/s.                                                                                                                                                                           |
| `pauseOnMouseEnter` | `boolean` | `true`  | Pauses the animation when the mouse hovers over it.                                                                                                                                             |
| `injectStyles`      | `boolean` | `true`  | Automatically injects the minimal required CSS styles so the animation works out of the box. Alternatively, you'll need to provide your own styling, allowing for complete control over the UI. |


### Methods

- `init()`: Starts the scroller and generates the necessary clones.
- `destroy()`: Removes the clones and stops the animation.

## License

MIT
