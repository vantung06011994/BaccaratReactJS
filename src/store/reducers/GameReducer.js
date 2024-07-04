import { ACTION_MSG_HEADER, defaultGameProcess } from "../../core/domain/game/GameCodes";

import { GameActionType } from "../actions/GameAction";
import { defaultBetSides } from "core/domain/game/BetSidesEntity";
import presenter from "core/adapters/presenters/index";
import produce from "immer";

export const initGameState = {
    socketData: {},
    chipSelected: 0,
    gameProcess: {
        ...defaultGameProcess,
    },
    betSides: {
        ...defaultBetSides,
    },
    reBet: { betSides: { ...defaultBetSides }, totalRisk: 0 },
    totalRisk: 0,
    netWin: 0,
    isAutoBet: true,
    isSubmitBet: false,
    balanceTemp: 0,
    customPopupMessage: "",
    disconnectMessage: "",
    cardList: {},
    isValidBetSide: false,
};

export function gameReducer(state = initGameState, action) {
    let betSideCode = null;
    return produce(state, (draft) => {
        switch (action.type) {
            case GameActionType.PUT_SOCKET_DATA:
                if (action.payload.socketData.message?.action === ACTION_MSG_HEADER.DISCONNECT.id) {
                    draft.disconnectMessage = action.payload.socketData.message?.action;
                    break;
                }

                draft.socketData = action.payload.socketData;
                presenter.game.setSocketData(action.payload.socketData);
                draft.balanceTemp = presenter.game.updateBalanceTemp(draft.balanceTemp);
                if (action.payload.socketData.message?.action === ACTION_MSG_HEADER.TIP.id) break;

                if (presenter.game.isNeedUpdate()) {
                    draft.totalRisk = presenter.game.updateTotalRisk2(draft.totalRisk);
                    draft.betSides = {
                        ...draft.betSides,
                        ...presenter.game.getBetSides2(draft.betSides),
                    };
                }

                if (presenter.game.isEndOfResultProcess()) {
                    draft.totalRisk = 0;
                    draft.betSides = defaultBetSides;
                }

                if (
                    action.payload.socketData.action !== ACTION_MSG_HEADER.TIP.id &&
                    action.payload.socketData.message !== ACTION_MSG_HEADER.DEALER_CARD_SHUFFLING.id &&
                    action.payload.socketData.action !== ACTION_MSG_HEADER.BETTOR_JOKER_REACHED.id
                ) {
                    // eslint-disable-next-line no-case-declarations
                    const gameProcess2 = presenter.game.calcGameProcess();
                    draft.gameProcess = { ...draft.gameProcess, ...gameProcess2 };
                    // draft.betSides = {
                    //     ...draft.betSides,
                    //     ...presenter.game.getBetSides(draft.betSides),
                    // };

                    draft.isSubmitBet = presenter.game.getIsSubmitbet(draft.isSubmitBet);
                    draft.netWin = presenter.game.getNetWin(draft.socketData, state.netWin);
                    // draft.totalRisk = presenter.game.updateTotalRisk(draft.totalRisk);
                    draft.chipSelected = presenter.game.updateChipSelected(draft.chipSelected);

                    draft.cardList = presenter.game.updateCardList(draft.cardList);
                    draft.customPopupMessage = "";
                }
                break;
            case GameActionType.TOGGLE_AUTO_BET:
                draft.isAutoBet = !draft.isAutoBet;
                break;
            case GameActionType.SELECT_CHIP:
                draft.chipSelected = action.payload.value;
                break;
            case GameActionType.PUT_CHIP_TO_SIDE_SUCCESS:
                betSideCode = action.payload.betSideCode;
                draft.betSides[betSideCode].chips = action.payload.chips;
                draft.betSides[betSideCode].amount = action.payload.amount;
                draft.totalRisk = action.payload.totalRisk;
                draft.balanceTemp = draft.socketData.userSession.balance - draft.totalRisk;
                break;
            case GameActionType.REMOVE_CHIP_SUCCESS:
                betSideCode = action.payload.betSideCode;
                draft.totalRisk = draft.totalRisk - draft.betSides[betSideCode].amount;
                draft.betSides[betSideCode].chips = [];
                draft.betSides[betSideCode].amount = 0;
                draft.balanceTemp = draft.socketData.userSession.balance - draft.totalRisk;
                break;
            case GameActionType.REMOVE_CHIP_ALL:
                Object.keys(draft.betSides).forEach((k) => {
                    draft.betSides[k].chips = [];
                    draft.betSides[k].amount = 0;
                });
                draft.totalRisk = 0;
                draft.balanceTemp = draft.socketData.userSession.balance;
                break;
            case GameActionType.REBET_SUCCESS:
                draft.betSides = action.payload.betSides;
                draft.totalRisk = action.payload.totalRisk;
                draft.balanceTemp = draft.socketData.userSession.balance - draft.totalRisk;
                break;
            case GameActionType.BETNOW_SUCCESS:
                draft.reBet.betSides = { ...draft.betSides };
                draft.reBet.totalRisk = draft.totalRisk;
                draft.isSubmitBet = true;
                break;
            case GameActionType.CLEAN_REDUCER:
                draft = { ...initGameState };
                break;
            case GameActionType.UPDATE_CUSTOM_POPUP_MESSAGE:
                draft.customPopupMessage = action.payload.message;
                break;
            case GameActionType.UPDATE_IS_VALID_BETSIDE:
                draft.isValidBetSide = action.payload.isValid;
                break;

            default:
                break;
        }
        return draft;
    });
}
