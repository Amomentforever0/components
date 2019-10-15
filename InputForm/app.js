const debounce = (fn, delay) => {
    let timer;

    return function(...args){
        if(timer) {
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(() => {
            fn(...args);
            timer = null;
        }, delay);
    };
};

(() => {
    window.onload = () => {
        const input = document.querySelector('input');
        const resultContainer = document.querySelector('.results-handler');
        const select = document.querySelector('#select');

        const mockData = [
            {
                id: 1,
                city: 'Almaty',
                location: {
                    x: 11,
                    y: 16
                }
            },
            {
                id: 2,
                city: 'Astana',
                location: {
                    x: 121,
                    y: 164
                }
            },
            {
                id: 1,
                city: 'Taraz',
                location: {
                    x: 1771,
                    y: 16
                }
            },
        ]

        const filterData = (data, value) => {
            return data.filter((item) => item.city.indexOf(value) !== -1);
        };

        const handler = (event) => {
            if (event.target.value.length !== 0 && event.target.value !== '') {
                const filtered = filterData(mockData, event.target.value);

                if (filtered.length > 0) {
                    let container = document.createDocumentFragment();
                    let listContainer = document.createDocumentFragment();
                        
                    for(let entry of filtered) {
                        let item = document.createDocumentFragment();
                        item.textContent = JSON.stringify(entry);
                        container.append(item);
                    }

                    for(let entry of filtered) {
                        let option = new Option(entry.city, entry.id);
                        listContainer.append(option);
                    }

                    setTimeout(() => {
                        resultContainer.innerHTML = '';
                        resultContainer.append(container);
                        select.append(listContainer);
                    }, 500);
                }
            }
        };

        input.addEventListener('input', debounce(handler, 500));
    };
})();