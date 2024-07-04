import { AVAILABLE_CHIP_TYPES } from "core/domain/game/GameCodes";

export const CHIP_1 = { value: AVAILABLE_CHIP_TYPES[0], chipClassName: "click-chip disable-chips chip chip-1 zoom-in" };
export const CHIP_5 = { value: AVAILABLE_CHIP_TYPES[1], chipClassName: "click-chip disable-chips chip chip-5 zoom-in" };
export const CHIP_25 = {
    value: AVAILABLE_CHIP_TYPES[2],
    chipClassName: "click-chip disable-chips chip chip-25 zoom-in",
};
export const CHIP_100 = {
    value: AVAILABLE_CHIP_TYPES[3],
    chipClassName: "click-chip disable-chips chip chip-100 zoom-in",
};
export const CHIP_500 = {
    value: AVAILABLE_CHIP_TYPES[4],
    chipClassName: "click-chip disable-chips chip chip-500 zoom-in",
};

export const CHIP_1000 = {
    value: AVAILABLE_CHIP_TYPES[5],
    chipClassName: "click-chip disable-chips chip chip-1000 zoom-in",
};

export const CHIPS = [CHIP_1, CHIP_5, CHIP_25, CHIP_100, CHIP_500];
export const CHIPS_TABLE1 = [CHIP_1, CHIP_5, CHIP_25, CHIP_100, CHIP_500];
export const CHIPS_TABLE2 = [CHIP_5, CHIP_25, CHIP_100, CHIP_500, CHIP_1000];
