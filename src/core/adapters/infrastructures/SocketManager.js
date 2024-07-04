import { FAKE_SOCKET_CONFIG } from "core/adapters.infrastructures.config";
import FakeSocketAPI from "./socket/FakeSocketAPI";
import SocketAPI from "./socket/SocketAPI";

const SocketAPISingletion = (function () {
    let instance;
    function createInstance() {
        if (FAKE_SOCKET_CONFIG.IS_RUNNING_FAKE_SOCKET) {
            return new FakeSocketAPI();
        }
        return new SocketAPI();
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
const socketAPI = SocketAPISingletion.getInstance();
export default socketAPI;
