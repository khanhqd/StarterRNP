class Api {
  static headers() {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'dataType': 'json',
    }
  }

  static get(route) {
    return this.xhr(route, null, 'GET');
  }

  static put(route, params) {
    return this.xhr(route, params, 'PUT')
  }

  static post(route, params) {
    return this.xhr(route, params, 'POST')
  }

  static delete(route, params) {
    return this.xhr(route, params, 'DELETE')
  }

  static xhr(route, params, verb) {
    const host = 'http://app.artdeco.com.vn/api'
    // const host = 'http://api.phongtot.net'
    const url = `${host}${route}`
    let options = Object.assign({ method: verb, timeout: 10000 }, params ? { body: JSON.stringify(params) } : null );
    options.headers = Api.headers()
    return fetch(url, options)
    .then((response) => response.json())
    .then((responseData) =>{
      return responseData;
    })
    .catch((error) => {
      console.error(error);
    });
  }
}
export default Api
