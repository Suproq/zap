class Api {
    token = null;
  
    get headers() {
      return new Headers({
        ...this.token ? {'Authorization': `Bearer ${this.token}`} : {},
        'Content-Type': 'application/json'
      });
    }
  
    constructor(token = null) {
      this.token = token;
    }
  
    async send(request) {
      const response = await fetch(request);
      if(!response.headers.get('Content-Type').includes('application/json')) {
        return null;
      }
  
      const body = await response.json();
      console.log(body);
      if(response.status >= 400) {
        console.log(body.error);
  
        return null;
      }
  
      return body;
    }
  
    async get(path, {fields, filters, ...rest} = {}) {
      const params = new URLSearchParams({
        ...fields ? {fields: fields.join(',')} : {},
        ...filters ? {filters: filters.join(' and ')} : {},
        ...rest
      });
  
      return this.send(
        new Request(
          `${path}?${params.toString()}`,
          {
            method: 'GET',
            headers: this.headers
          }
        )
      );
    }
  
    async post(path, payload) {
        //console.log(JSON.stringify(payload));
      return this.send(
        new Request(
          path,
          {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(payload)
          }
        )
      );
    }
  
    async put(path, payload) {
      return this.send(
        new Request(
          path,
          {
            method: 'PUT',
            headers: this.headers,
            body: JSON.stringify(payload)
          }
        )
      );
    }
  }
  
  export default Api;
  