import { AuthRoles } from "../auth/AuthRoles";

export const ROUTE_PATH = {
    LOGIN: {
        URL: "/login",
        AUTH: null,
    },
    LOGINBYTOKEN: {
        URL: "/login/type/:type?/partnerId/:partnerId?/token/:token?",
        AUTH: null,
    },
    LOGOUT: {
        URL: "/logout",
        AUTH: null,
    },
    CHAT: {
        URL: "/chat",
        AUTH: AuthRoles.player,
    },
    DEMO: {
        URL: "/demo",
        AUTH: AuthRoles.player,
    },
    DEMO2: {
        URL: "/demo2",
        AUTH: AuthRoles.admin,
    },
    TODO: {
        URL: "/todo",
        AUTH: AuthRoles.player,
    },
    GAME: {
        URL: "/game",
        AUTH: AuthRoles.player,
    },
};
