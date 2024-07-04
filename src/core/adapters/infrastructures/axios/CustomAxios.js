import { AXIOS_BASE_URL, IS_RUNNING_FAKE_AXIOS } from "core/adapters.infrastructures.config";

import axios from "axios";
import mockAxios from "./__mocks__/MockAxios";

const MAX_REQUESTS_COUNT = 10;
const INTERVAL_MS = 10;
let PENDING_REQUESTS = 0;

// create new axios instance
const customAxios = axios.create({});

customAxios.defaults.headers.common = {
    // "X-Ajax": "1",
};
customAxios.defaults.baseURL = AXIOS_BASE_URL;
/*mock axios*/
/**
 * Axios Request Interceptor
 */
customAxios.interceptors.request.use(
    function (config) {
        return new Promise((resolve, _reject) => {
            const interval = setInterval(() => {
                if (PENDING_REQUESTS < MAX_REQUESTS_COUNT) {
                    PENDING_REQUESTS++;
                    clearInterval(interval);
                    resolve(config);
                }
            }, INTERVAL_MS);
        });
    },
    function (error) {
        return Promise.reject(error);
    },
);
/**
 * Axios Response Interceptor
 */
customAxios.interceptors.response.use(
    function (response) {
        PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1);

        if (PENDING_REQUESTS === 0) {
            // All ajax requests were completed
        }

        return Promise.resolve(response);
    },
    function (error) {
        PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1);

        if (PENDING_REQUESTS === 0) {
            // All ajax requests were completed.
            //alert("Session PENDING_REQUESTS 0!");
        }
        if (500 === error.response.status) {
            switch (error.response.data.status.code) {
                case 401:
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    window.location = "/login";
                    break;
                case 504:
                    // alert("Can not connnect to server!");
                    break;
                default:
                //alert(error);
            }
            return Promise.reject(error);
        } else {
            switch (error.response.status) {
                case 401:
                    alert("Session expired!");
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    window.location = "/login";
                    break;
                case 504:
                    // const state = {title:'504',description:''}
                    // const title = 'Error'
                    // const url = 'hello-world.html'
                    //window.history.pushState(state, title, url)
                    break;
                default:
                //alert(error);
            }
            return Promise.reject(error);
        }
    },
);
if (IS_RUNNING_FAKE_AXIOS) {
    mockAxios(customAxios);
}
export default customAxios;
