# CFInfiniteScroll 🚀

A vanilla lightweight (zero dependencies) library to create smooth infinite scrolling (marquee) effects in the browser.

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
The required CSS is injected automatically.

```javascript
import CFInfiniteScroll from 'cf-infinite-scroll';

const scroller = new CFInfiniteScroll('#my-scroller', {
    speed: 100 // pixels per second
});

scroller.init();

// To stop and clean up:
// scroller.destroy();
```

## API

| Option  | Type     | Default | Description                      |
|---------|----------|---------|----------------------------------|
| `speed` | `number` | `100`   | Scroll speed in px/s.            |

### Methods

- `init()`: Starts the scroller and generates the necessary clones.
- `destroy()`: Removes the clones and stops the animation.

## License

MIT
