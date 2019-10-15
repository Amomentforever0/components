class Modal {
    constructor(config) {
        this.config = config;
        this.isOpened = false;
        this.init();
    }

    init() {
        document.body.addEventListener('click', (event) => {
            if(event.target.classList.contains('modal-wrapper') || event.target.classList.contains('close-modal')) {
                this.closeModal();
            }
        });
    }

    openModal = () => {
        if (!this.isOpened) {
            this.isOpened = true;

            const modalWrapper = document.createElement('div');
            const modal = document.createElement('div');
            const closeIcon = document.createElement('i');

            modalWrapper.setAttribute('class', 'modal-wrapper');
            modal.setAttribute('class', 'modal');
            closeIcon.setAttribute('class', 'close-modal fa fa-times-circle');
            modal.innerHTML = this.config.content || '';
            modal.setAttribute('tabIndex', '0');
            modal.append(closeIcon);
            modalWrapper.append(modal);
            modalWrapper.style.display = 'flex';
            document.body.append(modalWrapper);
            this.setListeners();
        }
    }

    setListeners() {
        const modal = document.querySelector('.modal');
        modal.focus();
        modal.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                this.closeModal();
            }
        });
    };

    closeModal() {
        this.isOpened = false;
        document.querySelector('.modal-wrapper').remove();
    }   
}

(() => {
    window.onload = () => {
        const modal = new Modal({theme: 'dark', content: 'some content'});
        document.querySelector('button').addEventListener('click', modal.openModal);
    };
})();