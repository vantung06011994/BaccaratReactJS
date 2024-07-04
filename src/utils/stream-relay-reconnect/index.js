import ReconnectingWebSocket from "reconnecting-websocket";

const options = {
    connectionTimeout: 3000,
    minReconnectionDelay: 1000,
    maxReconnectionDelay: 2000,
    maxRetries: 30,
    startClosed: false,
    debug: false,
};
class StreamRelayReconnect {
    rws = null;
    constructor(ws_url) {
        this.rws = new ReconnectingWebSocket(ws_url, [], options);
        // this.rws.onopen = () => {
        //     console.log("StreamRelayReconnect -> onopen -> this.rws.readyState", this.rws.readyState);
        // };
        // this.rws.onclose = () => {
        //     console.log("StreamRelayReconnect -> onopen -> this.rws.readyState", this.rws.readyState);
        // };
        // this.rws.onerror = function (err) {
        //     console.log("StreamRelayReconnect -> onerror -> this.rws.readyState", this.rws);
        // };
    }
    onGetImageUrl(callback) {
        this.rws.onmessage = function (msgBlob) {
            callback(msgBlob.data.slice(4, msgBlob.data.size, "application/jpeg"));
        };
    }
    onStreamError(callback) {
        this.rws.onerror = function (err) {
            callback(err);
        };
    }
    reconnectStream() {
        if (this.rws) {
            this.rws.reconnect();
        }
    }
    closeStream() {
        if (this.rws) {
            this.rws.close();
        }
    }
}
export default StreamRelayReconnect;
