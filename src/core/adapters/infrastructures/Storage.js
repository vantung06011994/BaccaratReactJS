export interface IWebStorage {
    getToken(): string;
    addToken(token: string): void;
    removeToken(): void;
    removeUser(): void;
    setUser(user: string): void;
    getUser(): string;
}

class WebStorage implements IWebStorage {
    storage: Storage;

    constructor() {
        this.storage = window.sessionStorage;
    }
    removeUser(): void {
        this.storage.removeItem("auth_user");
    }
    setUser(user: string): void {
        this.storage.setItem("auth_user", user);
    }
    getUser(): string | null {
        return this.storage.getItem("auth_user");
    }
    getToken(): string | null {
        return this.storage.getItem("token");
    }

    addToken(token: string) {
        this.storage.setItem("token", token);
    }

    removeToken() {
        this.storage.removeItem("token");
    }
    setChannel(channel: string): void {
        this.storage.setItem("channel", channel);
    }
    removeChannel(): void {
        this.storage.removeItem("channel");
    }
}

export default WebStorage;
