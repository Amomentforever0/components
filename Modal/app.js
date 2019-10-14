class Modal {
    constructor(config) {
        this.config = Object.assign({}, this.config, config);
        this.isOpened = false;
    }

    openModal() {

    }

    closeModal() {

    }   
}

(() => {
    window.onload = () => {
        const modal = new Modal({});
        
        document.querySelector('button').addEventListener('click', showModal);
        modal.show();
    };
})();