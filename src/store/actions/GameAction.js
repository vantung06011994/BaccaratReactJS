export const GameActionType = {
    PUT_SOCKET_DATA: "game/PUT_SOCKET_DATA",
    TOGGLE_AUTO_BET: "game/TOGGLE_AUTO_BET",
    SET_BET_RISK: "game/SET_BET_RISK",
    SET_SCORE_BOARD: "game/SET_SCORE_BOARD",
    SELECT_CHIP: "game/SELECT_CHIP",
    REMOVE_CHIP_REQUEST: "game/REMOVE_CHIP_REQUEST",
    REMOVE_CHIP_SUCCESS: "game/REMOVE_CHIP_SUCCESS",
    REMOVE_CHIP_ALL: "game/REMOVE_CHIP_ALL",
    PUT_CHIP_TO_SIDE_REQUEST: "game/PUT_CHIP_TO_SIDE_REQUEST",
    PUT_CHIP_TO_SIDE_SUCCESS: "game/PUT_CHIP_TO_SIDE_SUCCESS",
    PUT_CHIP_TO_SIDE_FAIL: "game/PUT_CHIP_TO_SIDE_FAIL",
    BETNOW_REQUEST: "game/BETNOW_REQUEST",
    BETNOW_SUCCESS: "game/BETNOW_SUCCESS",
    REBET_REQUEST: "game/REBET_REQUEST",
    REBET_SUCCESS: "game/REBET_SUCCESS",
    CLEAN_REDUCER: "game/CLEAN_REDUCER",
    TIP_DEALER_REQUEST: "game/TIP_DEALER_REQUEST",
    UPDATE_CUSTOM_POPUP_MESSAGE: "game/UPDATE_CUSTOM_POPUP_MESSAGE",
    UPDATE_IS_VALID_BETSIDE: "game/UPDATE_IS_VALID_BETSIDE",
};
export function cleanGameReducerAction() {
    return {
        type: GameActionType.CLEAN_REDUCER,
        payload: null,
    };
}

export function reBetAction() {
    return {
        type: GameActionType.REBET_REQUEST,
        payload: null,
    };
}
export function reBetSuccessAction(betSides, totalRisk) {
    return {
        type: GameActionType.REBET_SUCCESS,
        payload: { betSides: betSides, totalRisk: totalRisk },
    };
}

export function betNowSuccessAction(betSides) {
    return {
        type: GameActionType.BETNOW_SUCCESS,
        payload: { betSides: betSides },
    };
}
export function betNowRequestAction() {
    return {
        type: GameActionType.BETNOW_REQUEST,
        payload: null,
    };
}
export function reBetRequestAction() {
    return {
        type: GameActionType.REBET_REQUEST,
        payload: null,
    };
}
export function putChipToSideRequestAction(betSideCode) {
    return {
        type: GameActionType.PUT_CHIP_TO_SIDE_REQUEST,
        payload: { betSideCode: betSideCode },
    };
}
export function putChipToSideSuccessAction(sideCode, chips, amount, totalRisk) {
    return {
        type: GameActionType.PUT_CHIP_TO_SIDE_SUCCESS,
        payload: { betSideCode: sideCode, chips: chips, amount: amount, totalRisk: totalRisk },
    };
}
export function putChipToSideFailAction(message) {
    return {
        type: GameActionType.PUT_CHIP_TO_SIDE_FAIL,
        payload: { message: message },
    };
}
export function removeChipRequestAction(betSideCode) {
    return {
        type: GameActionType.REMOVE_CHIP_REQUEST,
        payload: { betSideCode: betSideCode },
    };
}
export function removeChipSuccessAction(betSideCode) {
    return {
        type: GameActionType.REMOVE_CHIP_SUCCESS,
        payload: { betSideCode: betSideCode },
    };
}
export function removeChipAllAction() {
    return {
        type: GameActionType.REMOVE_CHIP_ALL,
        payload: {},
    };
}
export function putSelectChipAction(value) {
    return {
        type: GameActionType.SELECT_CHIP,
        payload: { value: value },
    };
}
export function putSocketData(socketData) {
    return {
        type: GameActionType.PUT_SOCKET_DATA,
        payload: { socketData: socketData },
    };
}
export function toggleAutoBet() {
    return {
        type: GameActionType.TOGGLE_AUTO_BET,
        payload: null,
    };
}

export function tipDealerRequestAction(amount) {
    return {
        type: GameActionType.TIP_DEALER_REQUEST,
        payload: { amount: amount },
    };
}

export function updateCustomPopupMessageAction(message) {
    return {
        type: GameActionType.UPDATE_CUSTOM_POPUP_MESSAGE,
        payload: { message: message },
    };
}

export function updateIsValidBetSideAction(isValid) {
    return {
        type: GameActionType.UPDATE_IS_VALID_BETSIDE,
        payload: { isValid: isValid },
    };
}
