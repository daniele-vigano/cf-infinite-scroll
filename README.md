# CFInfiniteScroll 🚀

Un'estensione leggera (zero dipendenze) per creare scorrimenti infiniti fluidi (marquee) nel browser.

## Installazione

```bash
npm install cf-infinite-scroll
```

Utilizzo
HTML
La struttura richiede un contenitore e un elemento interno con classe .track.

```html

<div id="my-scroller">
    <div class="track">
        <img src="logo1.png" alt="">
        <img src="logo2.png" alt="">
        <img src="logo3.png" alt="">
    </div>
</div>
```

JavaScript
L'iniezione dei CSS necessari avviene automaticamente.

```Javascript
import CFInfiniteScroll from 'cf-infinite-scroll';

const scroller = new CFInfiniteScroll('#my-scroller', {
    speed: 100 // pixel al secondo
});

scroller.init();

// Per fermare e ripulire:
// scroller.destroy();
```

## API

| Opzione | Tipo     | Default | Descrizione                      |
|---------|----------|---------|----------------------------------|
| `speed` | `number` | `100`   | Velocità di scorrimento in px/s. |

### Metodi

- `init()`: Avvia lo scroller e genera i cloni necessari.
- `destroy()`: Rimuove i cloni e ferma l'animazione.

## Licenza

MIT
