import { BET_SIDE_CODE } from "./GameCodes";

export const defaultBetSides = {
    [BET_SIDE_CODE.PANDA]: { chips: [], amount: 0 },
    [BET_SIDE_CODE.PLAYER]: { chips: [], amount: 0 },
    [BET_SIDE_CODE.TIE]: { chips: [], amount: 0 },
    [BET_SIDE_CODE.BANKER]: { chips: [], amount: 0 },
    [BET_SIDE_CODE.DRAGON]: { chips: [], amount: 0 },
};
