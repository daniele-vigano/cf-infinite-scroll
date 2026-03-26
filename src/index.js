export default class CFInfiniteScroll {
    /**
     * Crea un nuovo InfiniteScroller.
     * @param {HTMLElement|string} container - L'elemento contenitore o un selettore CSS.
     * @param {Object} options - Opzioni di configurazione.
     * @param {number} [options.speed=100] - Velocità dello scorrimento in pixel al secondo.
     */
    constructor(container, {speed = 100}) {
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        this.track = this.container.querySelector('.track');
        this.speed = speed;
        this._originalItems = [];
        this._scrollWidth = 0;
        this._gap = 0;
        this._duration = 0;

        this._injectStyles();
    }

    /**
     * Inietta i keyframes necessari nell'head del documento
     * @private
     */
    _injectStyles() {
        const styleId = 'cf-infinite-scroll-styles';

        // Evitiamo di iniettare lo stile più volte se ci sono più istanze nella pagina
        if ( document.getElementById(styleId) ) {
            return;
        }

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            @keyframes cf-infinite-scroll-animation {
                from { transform: translateX(0); }
                to { transform: translateX(var(--scroll-distance)); }
            }
            /* Opzionale: assicura che il track sia un flex container */
            [data-infinite-scroll-track] {
                display: flex;
                will-change: transform;
            }
        `;
        document.head.appendChild(style);
    }

    init() {
        if ( !this.container || !this.track ) {
            throw new Error('Container o track non trovati');
        }

        // Aggiungiamo un attributo per applicare gli stili base se necessario
        this.track.setAttribute('data-infinite-scroll-track', '');

        this._originalItems = Array.from(this.track.children);
        this._gap = parseInt(window.getComputedStyle(this.track).gap, 10) || 0;
        this._scrollWidth = this.track.offsetWidth + this._gap;
        const minWidthNeeded = window.innerWidth + this._scrollWidth;
        let currentTrackWidth = this.track.offsetWidth;
        while (currentTrackWidth < minWidthNeeded) {
            this._originalItems.forEach(item => {
                const clone = item.cloneNode(true);
                this.track.appendChild(clone);
            });
            currentTrackWidth += this._scrollWidth;
        }

        // Se il numero totale di elementi è dispari, aggiungi un altro ciclo di duplicazione per evitare brutte sorprese
        // coi CSS, esempio colori alternati che sfalsano
        if ( this.track.children.length % 2 !== 0 ) {
            this._originalItems.forEach(item => {
                const clone = item.cloneNode(true);
                this.track.appendChild(clone);
            });
            currentTrackWidth += this._scrollWidth;
        }

        // Calcola la durata in base alla velocità (pixel/sec)
        // Se la velocità è 0 o negativa, fallback a 1 per evitare divisione per zero
        this._duration = this.speed > 0 ? this._scrollWidth / this.speed : 1;
        this.track.style.setProperty('--scroll-distance', `-${this._scrollWidth}px`);
        this.track.style.animation = `cf-infinite-scroll-animation ${this._duration}s linear infinite`;

        // Pausa animazione su hover
        this.track.addEventListener('mouseenter', () => {
            this.track.style.animationPlayState = 'paused'; // Niente !important, niente ;
        });

        this.track.addEventListener('mouseleave', () => {
            this.track.style.animationPlayState = 'running'; // Meglio esplicitare 'running'
        });
    }

    destroy() {
        // Rimuove tutti i cloni lasciando solo gli originali
        while (this.track.children.length > this._originalItems.length) {
            this.track.removeChild(this.track.lastChild);
        }
        this.track.style.animation = '';
        this.track.style.removeProperty('--scroll-distance');
        this.track.removeAttribute('data-infinite-scroll-track');
    }
}