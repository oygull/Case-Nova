export class HTTPWorker {
  #baseUrl;

  constructor(baseUrl = "") {
    this.#baseUrl = baseUrl;
  }

  get (endpoint, params = {}) {
    return new Promise(async (resolve, reject) => {
      const url = this.#baseUrl.length > 2 ? this.#baseUrl + endpoint : endpoint;
      const result = {
        body: {},
        headers: {},
        status: null,
        ok: null,
      }

      try {
        const response = await fetch(url, params);
        const contentType = response.headers.get("Content-Type");

        for (let [key, value] of response.headers) {
          result.headers[key] = value;
        }
        result.status = response.status;
        result.ok = response.ok;

        if(contentType.includes("json")) {
          result.body = await response.json()
        }else if (contentType.includes("text")) {
          result.body = await response.text()
        }

        resolve(result)
      }catch (e) {
        reject(e)
      }
    })
  }

  post (endpoint, body = {}, params) {
    return new Promise(async (resolve, reject) => {
      const url = this.#baseUrl.length > 2 ? this.#baseUrl + endpoint : endpoint;
      const result = {
        body: {},
        headers: {},
        status: null,
        ok: null,
      }

      try {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(body),
          ...params
        });
        const contentType = response.headers.get("Content-Type");

        for (let [key, value] of response.headers) {
          console.log(`${key} = ${value}`);
          result.headers[key] = value;
        }
        result.status = response.status;
        result.ok = response.ok;

        if(contentType.includes("json")) {
          result.body = await response.json()
        }else if (contentType.includes("text")) {
          result.body = await response.text()
        }

        resolve(result)
      }catch (e) {
        reject(e)
      }
    })
  }
}
