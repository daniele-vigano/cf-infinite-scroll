export default class CFInfiniteScroll {
    /**
     * Creates a new InfiniteScroll.
     * @param {HTMLElement|string} container - The container element or a CSS selector.
     * @param {Object} options - Configuration options.
     * @param {number} [options.speed=100] - Scroll speed in pixels per second.
     * @param {boolean} [options.pauseOnMouseEnter=true] - Pauses animation when the mouse enters the track.
     * @param {boolean} [options.injectStyles=true] - Automatically injects the minimal required CSS styles so the animation works out of the box.
     */
    constructor(container, {
        speed = 100,
        pauseOnMouseEnter = true,
        injectStyles = true
    }) {
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        this.track = this.container.querySelector('.track');
        this.speed = speed;
        this.pauseOnMouseEnter = pauseOnMouseEnter;
        this.injectStyles = injectStyles;
        this._originalItems = [];
        this._scrollWidth = 0;
        this._gap = 0;
        this._duration = 0;

        this._injectStyles();
        console.log("Versione 1.1");
    }

    /**
     * Injects the required keyframes into the document head
     * @private
     */
    _injectStyles() {
        const styleId = 'cf-infinite-scroll-styles';

        // Avoid injecting the style multiple times when there are multiple instances on the page
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
            /* Ensures the track is a flex container */
            [data-infinite-scroll-track] {
                overflow: hidden;
                
                .track{
                    display: flex;
                    width: max-content;
                    will-change: transform;
                }
            }
        `;
        document.head.appendChild(style);
    }

    init() {
        if ( !this.container || !this.track ) {
            throw new Error('Container o track non trovati');
        }

        // Add an attribute to apply base styles when needed
        if ( this.injectStyles ) {
            this.container.setAttribute('data-infinite-scroll-track', '');
        }

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

        // If the total number of elements is odd, add another duplication cycle to avoid
        // unexpected CSS issues, for example alternating colors getting out of sync
        if ( this.track.children.length % 2 !== 0 ) {
            this._originalItems.forEach(item => {
                const clone = item.cloneNode(true);
                this.track.appendChild(clone);
            });
            currentTrackWidth += this._scrollWidth;
        }

        // Calculate duration based on speed (pixels/sec)
        // If speed is 0 or negative, fallback to 1 to avoid division by zero
        this._duration = this.speed > 0 ? this._scrollWidth / this.speed : 1;
        this.track.style.setProperty('--scroll-distance', `-${this._scrollWidth}px`);
        this.track.style.animation = `cf-infinite-scroll-animation ${this._duration}s linear infinite`;

        // Pause animation on hover
        if ( this.pauseOnMouseEnter ) {
            this.track.addEventListener('mouseenter', () => {
                this.track.style.animationPlayState = 'paused';
            });

            this.track.addEventListener('mouseleave', () => {
                this.track.style.animationPlayState = 'running';
            });
        }
    }

    destroy() {
        // Remove all clones and keep only the original items
        while (this.track.children.length > this._originalItems.length) {
            this.track.removeChild(this.track.lastChild);
        }
        this.track.style.animation = '';
        this.track.style.removeProperty('--scroll-distance');
        this.track.removeAttribute('data-infinite-scroll-track');
    }
}