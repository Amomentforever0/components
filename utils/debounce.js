const debounce = (fn, delay) => {
    let timerId;

    return function(...args) {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            fn(...args);
            timerId = null;
        }, delay);
    }
};

(() => {
    window.onload = () => {
        const delay = 500;
        let result;

        const handler = (event) => {
            result = null;

            console.log(event);

            result = event.target.value;
        };

        const input = document.createElement('input');
        input.addEventListener('input', debounce(handler, delay));

        document.body.append(input);
    };
})();