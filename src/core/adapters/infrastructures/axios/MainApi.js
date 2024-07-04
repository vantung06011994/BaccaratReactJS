import { AxiosInstance } from "axios";
import customAxios from "./CustomAxios";

class MainApi {
    Axios: AxiosInstance;
    constructor(customAxios: AxiosInstance) {
        this.Axios = customAxios;
    }
    postLogin(userLogin) {
        const payload = {
            partnerId: userLogin.partnerId || 1,
            password: userLogin.password,
            type: userLogin.type,
            username: userLogin.username,
            version: "1",
            token: userLogin.token,
            role: "dealer",
        };
        return this.Axios.post("/login", payload);
    }
    fetchSessionID() {
        return this.Axios.get("/get-session-id", {});
    }
    fetchLogout() {
        return this.Axios.get("/logout", {});
    }
}

const Api = new MainApi(customAxios);
export default Api;
