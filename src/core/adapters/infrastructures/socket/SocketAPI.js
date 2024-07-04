import { DEBUG_ON } from "globalconfig";
import { STOMP_BACCARAT } from "core/adapters.infrastructures.config";
import Stomp from "stompjs";
import { emitToDisConnectBrokenTopic } from "core/adapters/emiiter/BaccaratEmitter";

export default class SocketAPI {
    socket;
    emitDestination;
    onDestination;
    wsHeaders;

    constructor() {
        this.socket = null;
        this.emitDestination = null;
        this.onDestination = null;
        this.wsHeaders = null;
    }
    genWsHeadersObject(_token, _channel) {
        return {
            token: _token,
            channel: _channel,
        };
    }
    setWsHeaders(_token, _channel) {
        this.wsHeaders = {
            token: _token,
            channel: _channel,
        };
    }
    setEmitDestination(_channel) {
        this.emitDestination = STOMP_BACCARAT.URL_SEND_TO_MAP + _channel;
    }
    setOnDestination(_channel) {
        this.onDestination = STOMP_BACCARAT.URL_SUBSCRIBE + _channel;
    }

    connect(_token, _channel) {
        _channel = "baccarat";
        _token = "";
        this.socket = Stomp.client(STOMP_BACCARAT.ENDPOINT);
        if (DEBUG_ON)
            this.socket.debug = (e) => {
                console.log("SocketAPI -> this.socket.debug -> e", e);
            };
        else this.socket.debug = null;

        return new Promise((resolve, reject) => {
            this.socket.connect(
                this.genWsHeadersObject(_token, _channel),
                () => {
                    this.setWsHeaders(_token, _channel);
                    this.setEmitDestination(_channel);
                    this.setOnDestination(_channel);
                    resolve(this);
                },
                (error) => {
                    emitToDisConnectBrokenTopic();
                    reject(error);
                },
            );
        });
    }

    connectV2() {
        this.socket = Stomp.client(STOMP_BACCARAT.ENDPOINT);
        if (DEBUG_ON)
            this.socket.debug = (e) => {
                console.log("SocketAPI -> this.socket.debug -> e", e);
            };
        else this.socket.debug = null;

        return new Promise((resolve, reject) => {
            this.socket.connect(
                { token: "wzMP5uEB1ahT6lqrCzFUQPLbJOW5bVA4dTc52Kejdk54BUZb2ggG7UPfrOk4ZTDB" },
                () => {
                    console.log("successssssss");
                    resolve(this);
                },
                (error) => {
                    emitToDisConnectBrokenTopic();
                    reject(error);
                },
            );
        });
    }

    disconnect() {
        return new Promise((resolve) => {
            this.socket.disconnect(() => {
                this.socket = null;
                this.emitDestination = null;
                this.onDestination = null;
                this.wsHeaders = null;
                resolve();
            }, {});
        });
    }

    emit(messageObject) {
        return new Promise((resolve, reject) => {
            if (!this.socket) return reject("No socket connection.");
            this.socket.send(this.emitDestination, this.wsHeaders, JSON.stringify(messageObject));
            return resolve();
        });
    }

    onMessage(callback) {
        this.socket.subscribe(
            this.onDestination,
            (msg) => {
                // called when the client receives a STOMP message from the server
                if (msg.body.length > 0) {
                    const json_msg = JSON.parse(msg.body);
                    callback(json_msg);
                }
            },
            this.wsHeaders,
        );
        // No promise is needed here, but we're expecting one in the middleware.
        // return new Promise((resolve, reject) => {
        //     if (!this.socket) return reject("No socket connection.");
        //     this.socket.on(event, fun);
        //     resolve();
        // });
    }
}
