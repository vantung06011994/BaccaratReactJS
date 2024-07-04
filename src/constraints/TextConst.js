import { get } from "lodash";

export const TEXT_MESSAGE = {
    DEALER_CHANGING_DEALER: {
        CODE: 5454,
        DEFAULT_TEXT: "Replacing Card",
        POPUP_MESSAGE: "We are replacing damaged card. please stay tuned for the game coming up next.",
        I18N_KEY: "dealer.changeing",
    },
    DEALER_ONLINE: {
        CODE: 312312,
        DEFAULT_TEXT: "Online!",
        I18N_KEY: "dealer.changeing",
    },
    REBOOTING_COMPUTER: {
        CODE: 1234,
        DEFAULT_TEXT: "Rebooting Computer",
        POPUP_MESSAGE: "We are rebooting computers. Please stay tuned for the game coming up next.",
        I18N_KEY: "dealer.changeing",
    },
    DEALER_PAUSE: {
        CODE: 9879,
        DEFAULT_TEXT: "Be Right Back",
        POPUP_MESSAGE: "We'll be back in a minute. Please stay tuned for the game coming up next.",
        I18N_KEY: "dealer.changeing",
    },
    ALL_CARDS_DEALT: {
        CODE: 2804,
        I18N_KEY: "dealer.changeing",
    },
    BET_ALREADY: {
        CODE: 109,
        I18N_KEY: "dealer.changeing",
    },
    DEALER_NOT_LOGIN: {
        CODE: 0,
        DEFAULT_TEXT: "Offline",
        POPUP_MESSAGE: "Dealer is currently offline now. Game will reset.",
        I18N_KEY: "dealer.changeing",
    },
    INVALID_BET: {
        CODE: 110,
        I18N_KEY: "dealer.changeing",
    },
    NO_WAGER: {
        CODE: 111,
        DEFAULT_TEXT: "NO WAGERED BET!",
        I18N_KEY: "no.bet",
    },
    BET_SUCCESS: {
        CODE: 112,
        DEFAULT_TEXT: "Bet successfully taken!",
        I18N_KEY: "bet.success",
    },
    NEW_GAME: {
        CODE: 113,
        DEFAULT_TEXT: "NEW GAME",
        I18N_KEY: "new.game",
    },
    YOU_WIN: {
        CODE: 114,
        DEFAULT_TEXT: "YOU WIN!",
        I18N_KEY: "new.game",
    },
    JOKERREACHED: {
        CODE: null,
        DEFAULT_TEXT: "JOKERREACHED",
        I18N_KEY: "JOKERREACHED i18n",
    },
    "*DEALER*CARD_SHUFFLING": {
        CODE: null,
        DEFAULT_TEXT: "shuffle card",
        POPUP_MESSAGE: "Dealer is going to shuffle the card. Please stay tuned for the game coming up next.",
        I18N_KEY: "*DEALER*CARD_SHUFFLING i18n",
    },
    USERNAME_LOGIN_ALREADY: {
        CODE: 104,
        DEFAULT_TEXT: "username has been login",
    },
    CANNOT_DO_ACTION: {
        CODE: 108,
        DEFAULT_TEXT: "Your session has timed out. Please login again after few minutes",
    },
    LOGIN_WRONG_PASSWORD: {
        CODE: "-999993",
        DEFAULT_TEXT: "Wrong username or password",
    },
    SESSION_TIME_OUT: {
        CODE: 100,
        POPUP_MESSAGE: "Your session has timed out. Please login again after few minutes",
    },
    ERR_CONNECTION_REFUSED: {
        CODE: "error",
        DEFAULT_TEXT: "Can't login right now. Please try again after few minutes",
    },
    TIP_DEALER_IN_FUN: {
        CODE: "cantTipDealer",
        POPUP_MESSAGE: "Sorry, you can only give tip if play in REAL.",
    },
    INTERNAL_SERVER_ERROR: {
        CODE: 500,
        DEFAULT_TEXT: "Can't connect to server right now! Please try again later!",
    },
};
export const TEXT_MESSAGE_MAP_CODE = {
    5454: TEXT_MESSAGE.DEALER_CHANGING_DEALER,
    312312: TEXT_MESSAGE.DEALER_ONLINE,
    1234: TEXT_MESSAGE.REBOOTING_COMPUTER,
    9879: TEXT_MESSAGE.DEALER_PAUSE,
    2804: TEXT_MESSAGE.ALL_CARDS_DEALT,
    109: TEXT_MESSAGE.BET_ALREADY,
    0: TEXT_MESSAGE.DEALER_NOT_LOGIN,
    110: TEXT_MESSAGE.INVALID_BET,
    111: TEXT_MESSAGE.NO_WAGER,
    112: TEXT_MESSAGE.BET_SUCCESS,
    113: TEXT_MESSAGE.NEW_GAME,
    114: TEXT_MESSAGE.YOU_WIN,
    104: TEXT_MESSAGE.USERNAME_LOGIN_ALREADY,
    108: TEXT_MESSAGE.CANNOT_DO_ACTION,
    500: TEXT_MESSAGE.INTERNAL_SERVER_ERROR,
    "-999993": TEXT_MESSAGE.LOGIN_WRONG_PASSWORD,
    100: TEXT_MESSAGE.SESSION_TIME_OUT,
    error: TEXT_MESSAGE.ERR_CONNECTION_REFUSED,
    cantTipDealer: TEXT_MESSAGE.TIP_DEALER_IN_FUN,
};
export const getI18nKeyByCode = (code: number) => {
    const key = get(TEXT_MESSAGE_MAP_CODE, [code, "I18N_KEY"]);
    return key !== undefined ? key : get(TEXT_MESSAGE, [code, "I18N_KEY"]);
};

export const getPopUpText = (code: number) => {
    let message = get(TEXT_MESSAGE_MAP_CODE, [code, "POPUP_MESSAGE"]);
    message = message !== undefined ? message : get(TEXT_MESSAGE, [code, "POPUP_MESSAGE"]);
    return message !== undefined ? message : "";
};

export const getDefaultText = (code: any) => {
    let message = get(TEXT_MESSAGE_MAP_CODE, [code, "DEFAULT_TEXT"]);
    message = message !== undefined ? message : get(TEXT_MESSAGE, [code, "DEFAULT_TEXT"]);
    return message !== undefined ? message : "";
};

export const getDefaultTextLoginByToken = (code: any) => {
    let message = get(TEXT_MESSAGE_MAP_CODE, [code, "DEFAULT_TEXT"]);
    message = message !== undefined ? message : get(TEXT_MESSAGE, [code, "DEFAULT_TEXT"]);
    if (code === -999993) {
        message = "Token is Invalid or Expired, please login again by your Username and Password";
    }
    return message !== undefined ? message : "";
};

export const getPopupTextTip = (code: any) => {
    let message;
    if (code === 100) {
        message = "Thank you for your generous tip. We wish you the best of luck!";
    }
    if (code === 108) {
        message = "Sorry, the tip money was not successfully transferred!";
    }
    return message !== undefined ? message : "";
};

export const getPopupTextJokerReached = (code: any) => {
    let message;
    if (code === 100) {
        message = "Joker appears. Card deck will be shuffled the next 2 hands";
    }
    return message !== undefined ? message : "";
};
