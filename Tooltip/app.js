class Tooltip {
    constructor(config) {
        this.config = config;
        this.isHovered = false;
    }

    init() {
        document.body.addEventListener('mouseover', (event) => {
            if(event.target.classList.contains('s-tooltip')) {
                this.isHovered = true;
                this.addTooltip(event);
            } 

            if(event.target.classList.contains('tooltip')) {
                this.isHovered = true;
            }
        });

        document.body.addEventListener('mouseout', (event) => {
            console.log(event.relatedTarget);
            if(event.target.classList.contains('s-tooltip')) {
                this.removeTooltip(event);
            }
            if(event.target.classList.contains('tooltip') 
                && !event.target.contains(event.relatedTarget)) {
                this.isHovered = false;
                this.removeTooltip(event);
            }
            return;
        });
    }

    addTooltip(event) {
        const el = event.target;
        const position = el.getAttribute('data-position') || this.config.position;
        const content = el.getAttribute('data-content');

        const tooltipPosition = {};

        if(document.querySelector('.tooltip')) {
            document.querySelector('.tooltip').remove();
        }

        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.innerHTML = content || this.config.defaultContent;
        document.body.append(tooltip);

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

        tooltip.classList.add('visible');
        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
      };

    removeTooltip(event) {
        this.isHovered = false;
        setTimeout(() => {
            if(document.querySelector('.tooltip') && !this.isHovered) {
                document.querySelector('.tooltip').remove();
            }
        }, this.config.hideDelay);
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