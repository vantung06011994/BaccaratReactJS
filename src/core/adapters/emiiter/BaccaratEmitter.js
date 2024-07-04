import { FAKE_SOCKET_TOPIC, SOCKET_DISCONNECT_BROKEN_TOPIC, VINTAGE_NOTIFY } from "./EmitterTopics";

import ee from "event-emitter";

const BaccaratEmitterSingleton = (function () {
    let instance;

    function createInstance() {
        return ee(); // tạo object rỗng, có thể thay bằng Class khác
    }
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        },
    };
})();
const BaccaratEmitter = BaccaratEmitterSingleton.getInstance();

export const notifyMessageSuccess = (msg) => {
    BaccaratEmitter.emit(VINTAGE_NOTIFY, { modalType: 0, msg: msg });
};
export const notifyMessageError = (msg) => {
    BaccaratEmitter.emit(VINTAGE_NOTIFY, { modalType: 1, msg: msg });
};
export const emitToFakeSocketTopic = (msg) => {
    BaccaratEmitter.emit(FAKE_SOCKET_TOPIC, msg);
};
export const onFakeSocketTopic = (callback) => {
    BaccaratEmitter.on(FAKE_SOCKET_TOPIC, (mgs) => {
        callback(mgs);
    });
};

export const emitToDisConnectBrokenTopic = () => {
    BaccaratEmitter.emit(SOCKET_DISCONNECT_BROKEN_TOPIC, true);
};
export const onDisConnectBrokenTopic = (callback) => {
    BaccaratEmitter.on(SOCKET_DISCONNECT_BROKEN_TOPIC, (isBroken) => {
        callback(isBroken);
    });
};
export const offDisConnectBrokenTopic = () => {
    BaccaratEmitter.off(SOCKET_DISCONNECT_BROKEN_TOPIC, onDisConnectBrokenTopic);
};
export const offFakeSocketTopic = () => {
    BaccaratEmitter.off(FAKE_SOCKET_TOPIC, onFakeSocketTopic);
};
export default BaccaratEmitter;
