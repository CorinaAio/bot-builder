const DEFAULT_HEADERS = {
  "content-type": "application/json",
};

class RequestService {
  get(uri) {
    return fetch(uri).then((res) => res.json());
  }

  post(uri, body) {
    const method = "POST";
    return fetch(uri, {
      method,
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(body),
    }).then((res) => res.json());
  }
}

export default RequestService;
