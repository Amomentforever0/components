import api from './services/api';

const delay = 500;
const form = document.querySelector('form');
const [input, button] = form;
const dropdown = document.querySelector('.input-control');
const resultsContainer = document.createElement('ul');
const preloader = document.querySelector('.loader');

resultsContainer.setAttribute('class', 'results-container');

const debounce = (fn, delay) => {
    let timer = null;

    return function(...args) {
        if (timer) {
            clearTimeout(timer);
        } 

        timer = setTimeout(() => {
            fn(...args);
            timer = null;
        }, delay);
    }
}

const mapDataToList = (data) => {
    let res = '';

    for(let item of data) {
        res+='<li>'+item.name+'</li>';
    }  

    return res;
};

const handleInputChange = (event) => {
    preloader.classList.add('isLoading');
    const value = event.target.value;
    resultsContainer.remove();
    let filtered;
    if (value.length !== 0) {
        api.getCountries().then((data) => {
            filtered = data.filter((country) => {
                return String(country.name_translations.en).includes(String(value));
            });      

            const list = mapDataToList(filtered);

            if (list.length > 0) {
                resultsContainer.innerHTML = list;
            } else {
                resultsContainer.innerHTML = '<li>No results found, try another request</li>';
            }

            dropdown.append(resultsContainer);

            preloader.classList.remove('isLoading');
        });
    } 
    if (value.length === 0) {
        preloader.classList.remove('isLoading');
    }
};

const handleContainerClick = (event) => {
    input.value = event.target.innerHTML;
    console.log(event.target.innerHTML);
    resultsContainer.remove();
};

const debouncedInputChange = debounce(handleInputChange, delay);

resultsContainer.addEventListener('click', handleContainerClick);

input.addEventListener('input', (event) => {
    debouncedInputChange(event);
});

