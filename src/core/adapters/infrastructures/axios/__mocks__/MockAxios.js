import MockAdapter from "axios-mock-adapter";
import mockPlayerApi from "./mock-login-api/index";

export default function mockAxios(axios: any) {
    const mock = new MockAdapter(axios);
    mockPlayerApi(mock);

    return mock;
}
