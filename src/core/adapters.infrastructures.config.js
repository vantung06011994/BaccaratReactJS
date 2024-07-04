import { HOSTNAME_API_MAP } from "globalconfig";

let baseUrl;
new Map(HOSTNAME_API_MAP).forEach((value, key) => {
    if (key === window.location.hostname) {
        baseUrl = value;
    }
});

export const IS_RUNNING_FAKE_AXIOS = false;
export const CDN_URL = "//original.cdn.betphoenix.com/";
export const AXIOS_BASE_URL =
    // "/api/";
    window.location.protocol === "http:" ? `http://${baseUrl}/api` : `https://${baseUrl}/api`;
export const FAKE_SOCKET_CONFIG = {
    IS_RUNNING_FAKE_SOCKET: true,
    INTERVAL_FETCH_TIME: 1500,
};
export const STOMP_BACCARAT = {
    ENDPOINT: window.location.protocol === "http:" ? `ws://${baseUrl}/ws` : `wss://${baseUrl}/ws`,
    //ENDPOINT: "ws://localhost:8080/broadcast",
    URL_SUBSCRIBE: "/dealer/",
    URL_SEND_TO_MAP: "/channel/",
};
