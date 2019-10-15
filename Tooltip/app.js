class Tooltip {
    constructor(config) {
        this.config = config;
        this.timeout = null;
    }

    init() {
        this.addTooltip();

        document.body.addEventListener('mouseenter', (event) => {
            if(event.target.classList.contains('s-tooltip') || event.target.classList.contains('tooltip')) {
                if (this.timeout) {
                    clearTimeout(this.timeout);
                }
            } 

            if(event.target.classList.contains('s-tooltip')) {
                this.showTooltip(event);
            }

            console.log(this.timeout);
        }, true);

        document.body.addEventListener('mouseleave', (event) => {
            const relatedTarget = event.relatedTarget || document.activeElement;
            this.timeout = setTimeout(() => {
                if(event.target.classList.contains('s-tooltip')) {
                    this.hideTooltip(event);
                }
                if(event.target.classList.contains('tooltip') 
                    && !event.target.contains(relatedTarget)) {
                    this.hideTooltip(event);
                }
            }, this.config.hideDelay);  
            
        }, true);
    }

    addTooltip() {
        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.innerHTML = this.config.defaultContent;
        document.body.append(tooltip);
    }

    showTooltip(event) {
        const el = event.target;
        const position = el.getAttribute('data-position') || this.config.position;
        const content = el.getAttribute('data-content') || this.config.defaultContent;
        const tooltip = document.querySelector('.tooltip');
        tooltip.innerHTML = content;
        tooltip.classList.add('visible');

        
        const coords = el.getBoundingClientRect();
        let left, top;

        left = coords.left + (el.offsetWidth - tooltip.offsetWidth)/2;
        top = coords.top - tooltip.offsetHeight - 5;

        if(position === 'left') {
            left = coords.left - tooltip.offsetWidth - 5;
        }

        if(position === 'right') {
            left = coords.left + el.offsetWidth + 5;
        }

        if(position === 'right' || position === 'left') {
            top = coords.top - tooltip.offsetHeight/2 + el.offsetHeight/2;
        }

        if(left < 0) left = 0;
        if (top < 0) top = coords.top + el.offsetHeight + 5;
        
        tooltip.style.left = left + 'px';
        tooltip.style.top = top + pageYOffset + 'px';
    };

    hideTooltip() {
        const tooltip = document.querySelector('.tooltip');
        if(tooltip) {
            tooltip.classList.remove('visible');
        }
    }
}

(() => {
    window.onload = () => {
        const tooltip = new Tooltip({
            showDelay: 200, 
            hideDelay: 300,
            defaultContent: 'Hello, tooltip!',
            defaultPosition: 'right'
        });

        tooltip.init();
    };
})();