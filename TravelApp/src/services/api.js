const config = {
    url: 'http://aviasales-api.herokuapp.com'
};

class Api {
    constructor(config) {
        this.url = config.url;
    }

    async getCountries() {
        const countries = await fetch(`${this.url}/countries`);
        const data = await countries.json();
        return data;
    };

    async getCities() {
        const cities = await fetch(`${this.url}/cities`);
        return cities;
    };

    async getPrices() {
        const prices = await  fetch(`${this.url}/prices`);
        return prices;
    }
}

const apiService = new Api(config);

export default apiService;
