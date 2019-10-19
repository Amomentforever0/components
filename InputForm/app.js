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
        let currentIndex = -1;
        const handleSelect = (event) => {
            input.value = event.target.getAttribute('data-city');
            resultContainer.style.display = 'none';
        };

        resultContainer.addEventListener('click', handleSelect);

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
                id: 3,
                city: 'Taraz',
                location: {
                    x: 1771,
                    y: 16
                }
            },
            {
                id: 4,
                city: 'Taldykorgan',
                location: {
                    x: 1771,
                    y: 16
                }
            },
            {
                id: 5,
                city: 'Turkestan',
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
                        
                    for(let entry of filtered) {
                        let item = document.createElement('div');
                        item.setAttribute('class', 'item');
                        item.setAttribute('tabIndex', '0');
                        item.textContent = JSON.stringify(entry.city);
                        item.setAttribute('data-city', entry.city);
                        container.append(item);
                    }

                    setTimeout(() => {
                        resultContainer.innerHTML = '';
                        resultContainer.style.display = 'flex';
                        resultContainer.append(container);
                    }, 500);
                }
            } else {
                resultContainer.style.display = 'none';
                resultContainer.innerHTML = '';
            }
        };

        input.addEventListener('input', debounce(handler, 500));
        input.addEventListener('keydown', (event) => {
            if(resultContainer) {
                switch(event.keyCode) {
                    case 40:
                        resultContainer.focus();    
                        currentIndex = 0;
                        break;
                }
            }
        });

        resultContainer.addEventListener('keydown', (event) => {
            switch(event.keyCode) {
                case 38:
                    if (currentIndex === 0) {
                        input.focus();
                        currentIndex = -1;
                    }
                    resultContainer.children[currentIndex].classList.toggle('active');
                    currentIndex--;
                    resultContainer.children[currentIndex].classList.toggle('active');
                    console.log('up');
                    break;
                case 40:
                    if (currentIndex < resultContainer.children.length) {
                        resultContainer.children[currentIndex].classList.toggle('active');
                        currentIndex++;
                        resultContainer.children[currentIndex].classList.toggle('active');
                    } else {
                        resultContainer.children[currentIndex].classList.toggle('active');
                        currentIndex = 0;
                    }
                    console.log('down');
                    break;
                case 13:
                    input.value = event.target.getAttribute('data-city');
            }
        });
    };
})();