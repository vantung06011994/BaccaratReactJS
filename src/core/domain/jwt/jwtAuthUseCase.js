import customAxios from "../../adapters/infrastructures/axios/CustomAxios";

export interface IJWTAuthUseCase {
    loginWithEmailAndPassword(_email: string, _password: string): Promise<any>;
    loginWithTokenToWSProxy(_token: string, _partnerId: string, _type: string): Promise<any>;
    loginWithToken(): Promise<any>;
    logout(): void;
    connectToWS(): Promise<any>;
}
class JwtAuthUseCase {
    repository: IJwtRepository;

    constructor(sessionRepositories: IJwtRepository) {
        this.repository = sessionRepositories;
    }

    // You need to send http request with email and passsword to your server in this method
    // Your server will return user object & a Token
    // User should have role property
    // You can define roles in app/auth/authRoles.js
    loginWithEmailAndPassword = (_email: string, _password: string, _type: string): Promise<any> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const userLogin = {
                    username: _email,
                    password: _password,
                    type: _type,
                };
                resolve(this.repository.loginWithEmailAndPassword(userLogin));
            }, 100);
        })
            .then((res: any) => {
                // Token is valid
                this.setSession(res.data.token, res.data.channel);
                // this.setUser(res.data);
                return res;
            })
            .catch((error) => {
                return Promise.reject(null);
            });
    };

    loginWithTokenToWSProxy = async (_token: string, _partnerId: string, _type: string): Promise<any> => {
        return new Promise((resolve) => {
            const userLogin = {
                username: "",
                password: "",
                type: _type,
                token: _token,
                partnerId: _partnerId,
            };
            resolve(this.repository.loginWithTokenToWSProxy(userLogin));
        })
            .then((res: any) => {
                if (res.data.status === "ok") {
                    this.setSession(res.data.token, res.data.channel);
                    return res.data;
                } else {
                    const error = res.data.code ? res.data.code : res.data.status;
                    window.loginTokenError = error;
                    return null;
                }
            })
            .catch((err) => {
                return Promise.reject(null);
            });
    };

    // You need to send http requst with existing token to your server to check token is valid
    // This method is being used when user logged in & app is reloaded
    loginWithToken = (): Promise<any> => {
        const token = this.repository.getToken();
        if (token === null) {
            return Promise.resolve(null);
        } else {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(this.repository.loginWithToken(token));
                }, 1000);
            }).then((res: any) => {
                // Token is valid
                if (res === null) {
                    this.setSession(null);
                    this.setUser(null);
                    return null;
                } else {
                    this.setSession(res.data.token, res.data.channel);
                    // this.setUser(data);
                    return res;
                }
            });
        }
    };

    connectToWS = (): Promise<any> => {
        this.repository.connectToWS();
    };

    logout = (): void => {
        this.setSession(null, null);
        this.removeUser();
    };

    // Set token to all http request header, so you don't need to attach everytime
    setSession = (token: string | null, channel: string | null) => {
        if (token) {
            this.repository.setToken(token);
            this.repository.setChannel(channel);
            customAxios.defaults.headers.common["Authorization"] = "Bearer " + token;
        } else {
            this.repository.removeToken();
            this.repository.removeChannel(channel);
            delete customAxios.defaults.headers.common["Authorization"];
        }
    };
    // Save user to localstorage
    setUser = (user: any) => {
        this.repository.setUser(JSON.stringify(user));
    };
    // Remove user from localstorage
    removeUser = () => {
        this.repository.removeUser();
    };
}

export default JwtAuthUseCase;
