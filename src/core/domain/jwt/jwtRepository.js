import socketAPI from "core/adapters/infrastructures/SocketManager";

export interface IJwtRepository {
    loginWithEmailAndPassword(email: string, password: string, type: string): Promise<any>;
    loginWithTokenToWSProxy(): Promise<any>;
    loginWithToken(token: string): Promise<any>;
    removeUser(): void;
    setUser(user: string): void;
    setToken(token: string): void;
    getToken(): string | null;
    removeToken(): void;
    connectToWS(): Promise<any>;
}

class JwtRepository implements IJwtRepository {
    infra: IInfrastructures;

    constructor(infrastructure: IInfrastructures) {
        this.infra = infrastructure;
    }

    getToken(): string | null {
        return this.infra.webStorage.getToken();
    }
    removeUser(): void {
        this.infra.webStorage.removeUser();
    }
    setUser(user: string): void {
        this.infra.webStorage.setUser(user);
    }
    setToken(token: string): void {
        this.infra.webStorage.addToken(token);
    }
    removeToken(): void {
        this.infra.webStorage.removeToken();
    }
    setChannel(channel: string): void {
        this.infra.webStorage.setChannel(channel);
    }
    removeChannel(): void {
        this.infra.webStorage.removeChannel();
    }
    // user = {
    //     userId: "1",
    //     role: "ADMIN",
    //     displayName: "Jason Alexander",
    //     email: "jasonalexander@gmail.com",
    //     photoURL: "/assets/images/face-6.jpg",
    //     age: 25,
    //     token: "faslkhfh423oiu4h4kj432rkj23h432u49ufjaklj423h4jkhkjh",
    // };

    // You need to send http request with email and passsword to your server in this method
    // Your server will return user object & a Token
    // User should have role property
    // You can define roles in app/auth/authRoles.js
    loginWithEmailAndPassword = (userLogin): Promise<any> => {
        // return this.infra.remote.mainApi.postLogin(userLogin);
        return {data: {status: "ok"}};
        // return Promise.resolve(this.user);
    };

    loginWithTokenToWSProxy = (userLogin): Promise<any> => {
        return this.infra.remote.mainApi.postLogin(userLogin);
    };

    // You need to send http requst with existing token to your server to check token is valid
    // This method is being used when user logged in & app is reloaded
    loginWithToken = (token: string): Promise<any> => {
        return Promise.resolve(this.user);
    };

    connectToWS = (): Promise<any> => {
        return socketAPI.connectV2();
    };
}

export default JwtRepository;
