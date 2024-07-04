import { emitToFakeSocketTopic, offFakeSocketTopic, onFakeSocketTopic } from "../../emiiter/BaccaratEmitter";

import { FAKE_SOCKET_CONFIG } from "../../../adapters.infrastructures.config";
import { FakeDataScoreboard } from "./fake-data/FakeDataScoreboard";

// import { FakeDataGameProcess } from "./fake-data/FakeDataGameProcess";

export default class FakeSocketAPI {
    socket;
    interval;
    constructor() {
        this.socket = null;
        this.interval = null;
    }
    connect(_token, _channel) {
        return new Promise((resolve, reject) => {
            this.socket = 123;
            setTimeout(this.onAutoEmitFakeData(), 500);
            //  setTimeout(() => emitToDisConnectBrokenTopic(), 5000);
            resolve(this);
        });
    }

    onAutoEmitFakeData() {
        let i = 0;
        this.interval = setInterval(() => {
            const message = FakeDataScoreboard[i];
            emitToFakeSocketTopic(message);
            i++;
            if (i === FakeDataScoreboard.length) {
                i = 0;
            }
        }, FAKE_SOCKET_CONFIG.INTERVAL_FETCH_TIME);
    }

    disconnect() {
        return new Promise((resolve) => {
            this.socket = null;
            if (this.interval) {
                clearInterval(this.interval);
            }
            offFakeSocketTopic();
            resolve();
        });
    }

    emit(message) {
        return new Promise((resolve, reject) => {
            if (!this.socket) return reject("No socket connection.");
            //emitToFakeSocketTopic(message);
            return resolve();
        });
    }

    onMessage(callback) {
        onFakeSocketTopic(callback);
    }
}
