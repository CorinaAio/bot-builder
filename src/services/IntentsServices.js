import ServiceRequest from "./ServiceRequest.js";

const BASE_URL = "";

const makeUrl = (endpoint) => `${BASE_URL}${endpoint}`;

const ENDPOINTS = {
  getIntents: () => {
    return makeUrl(`intents.json`);
  },
};

class IntentsService {
  constructor(options = {}) {
    this.request = options.request || new ServiceRequest();
  }

  handleResponse(response) {
    const { statusCode } = response.meta ? response.meta : response;
    if (statusCode >= 400 && statusCode <= 500) throw statusCode;
    return response.data;
  }

  getIntents() {
    return this.request.get(makeUrl(ENDPOINTS.getIntents()));
  }
}

export default IntentsService;
