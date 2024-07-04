export const ACTION_MSG_HEADER = {
    LOGIN: { id: "login" }, //show  msg show welcome msg
    BET: { id: "bet" }, // on game process
    TIP: { id: "tip" },
    BALANCE: { id: "balance" },
    CHAT: { id: "chat" }, //show msg on code "message".
    RESULT: { id: "result" }, // on game process
    KICK: { id: "kick" }, //do logout
    BETTOR_JOKER_REACHED: { id: "jokerReached" }, //show msg
    DISCONNECT: { id: "disconnect" }, //do logout
    DEALER_CARD_SHUFFLING: { id: "*DEALER*CARD_SHUFFLING" }, // dealer shuffling cards
};
//show msg dependencies by "text":9879 please read on docs.
export const BET_SIDE_CODE = {
    PLAYER: 1,
    TIE: 0,
    BANKER: 2,
    PANDA: 3,
    DRAGON: 4,
};
export const AVAILABLE_CHIP_TYPES = [1, 5, 25, 100, 500, 1000];
export const BET_SIDE_MAP_RULES = {
    [BET_SIDE_CODE.PANDA]: { minAmountKey: "minSide", maxAmountKey: "maxSide" },
    [BET_SIDE_CODE.DRAGON]: { minAmountKey: "minSide", maxAmountKey: "maxSide" },
    [BET_SIDE_CODE.TIE]: { minAmountKey: "minTie", maxAmountKey: "maxTie" },
    [BET_SIDE_CODE.BANKER]: { minAmountKey: "minBet", maxAmountKey: "maxBet" },
    [BET_SIDE_CODE.PLAYER]: { minAmountKey: "minBet", maxAmountKey: "maxBet" },
};
export const GAME_STATUS = {
    IDLE: -1,
    BETTING: 0,
    DEALING: 1,
    FINISHING: 2,
};
export const GAME_RESULT = {
    NONE: -2,
    BANKER_WIN: 2,
    PLAYER_WIN: 1,
    TIE_WIN: 0,
};
export const defaultGameProcess = {
    status: GAME_STATUS.IDLE,
    second: -1,
    result: GAME_RESULT.NONE,
};
export const SCOREBOARD_POSITION = {
    TYPE: 0,
    SCORE: 1,
    PAIR: 2,
    NATURAL: 3,
};

export const ACCOUNT_TYPE = {
    FUN: "FUN",
    REAL: "REAL",
};

export const defaultDealer = {
    photoURL: "",
    id: 0,
    fullname: "Dealer",
    age: 0,
};
