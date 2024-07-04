import Remote from "./Remote";
import WebStorage from "./Storage";
import socketAPI from "./SocketManager";

export default () => {
    return {
        remote: new Remote(),
        webStorage: new WebStorage(),
        socketApi: socketAPI,
    };
};
