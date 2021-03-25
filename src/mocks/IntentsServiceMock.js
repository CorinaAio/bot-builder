import fetchMock from "fetch-mock";
import * as intentsResponse from "./intents.json";

fetchMock.get("/getIntents", {
  data: intentsResponse,
});
