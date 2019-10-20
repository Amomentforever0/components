function request(config) {
    this.req = null;

    this.get = function(path) {
        console.log(this);
        return new Promise((resolve, reject) => {
            let req = new XMLHttpRequest();
            this.req = req;
            req.open('GET', `${config.url}/${path}`, true);
            req.send();

            req.onreadystatechange = function() {
                if(req.readyState === 4 && req.status === 200) {
                    resolve(req.responseText);
                }

                if(req.status === 404 || req.status === 403 || req.status === 500) {
                    reject('Error while fetching the data');
                }
            };
        });
    };

    this.abort = function() {
      if (this.req) {
        this.req.abort();  
      }
    };

    this.post = function(params) {};
}

export default request;