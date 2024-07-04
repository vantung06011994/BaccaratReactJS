import { ACTION_MSG_HEADER, GAME_STATUS } from "core/domain/game/GameCodes";
import { get, isEmpty } from "lodash";

import { TEXT_MESSAGE } from "../../constraints/TextConst";
import { createSelector } from "reselect";
import { isShowChips } from "utils/index";

export const gameSelector = (state) => state.game;
export const socketDataSelector = (state) => state.game.socketData;
export const actionHeaderSelector = (state) => state.game.socketData.action;
export const isSubmitBetSelector = (state) => state.game.isSubmitBet;
export const gameProcessSelector = (state) => state.game.gameProcess;
export const gameProcessSecondSelector = (state) => state.game.gameProcess.second;
export const gameProcessStatusSelector = (state) => state.game.gameProcess.status;
export const gameResultSelector = (state) => state.game.gameProcess.result;
export const gameSessionSelector = (state) => state.game.socketData.gameSession;
export const ingameSelector = (state) => state.game.socketData.game;
export const userSessionSelector = (state) => state.game.socketData.userSession;
export const dealerSelector = (state) => state.game.socketData?.newName;
export const isValidBetSideSelector = (state) => state.game.isValidBetSide;
export const deckHistorySelector = (state) => {
    return state.game.socketData.game?.deckHistory2;
};
export const getCardListSelector = (state) => state.game.cardList;
export const isAutoBetSelector = (state) => state.game.isAutoBet;
export const customPopupMessageSelector = (state) => state.game.customPopupMessage;
export const disconnectMessageSelector = (state) => state.game.disconnectMessage;
// export const deckHistorySelector = (state) => state.game.socketData.game.deckHistory2;
export const gameIDcodeSelector = (state) => {
    return state.game.socketData.game?.gameIdEncode;
};
export const balanceSelector = (state) => state.game.socketData.userSession.balance;
export const summarySelector = (state) => state.game.socketData.gameSession?.finalResult;

export const balanceTempSelector = (state) => state.game.balanceTemp;
export const betSidesSelector = (state) => state.game.betSides;
export const reBetSelector = (state) => state.game.reBet;
export const chipSelectedSelector = (state) => state.game.chipSelected;
export const totalRiskSelector = (state) => state.game.totalRisk;
export const isNewGameSelector = (state) => state.game.gameProcess.status === GAME_STATUS.IDLE;
export const isBettingSelector = (state) => state.game.gameProcess.status === GAME_STATUS.BETTING;
export const isEmptySocketDataSelector = createSelector([gameSelector], (game) => {
    return isEmpty(game.socketData);
});
export const isShowChipsSelector = createSelector(
    [gameProcessSelector, isSubmitBetSelector],
    (_gameProcess, _isSubmitBet) => {
        return isShowChips(_gameProcess.status, _isSubmitBet);
    },
);
export const textAlertGameSelector = createSelector(
    [gameProcessSelector, gameSessionSelector, ingameSelector, socketDataSelector],
    (_gameProcess, _gameSession, _game, _socketData) => {
        let message = null;
        switch (_gameProcess.status) {
            case GAME_STATUS.IDLE:
                if (
                    get(_socketData, ["action"]) !== ACTION_MSG_HEADER.TIP.id &&
                    ((get(_game, ["gameId"]) === undefined && get(_socketData, ["messageType"]) === undefined) ||
                        get(_game, ["gameId"]) > 0 ||
                        get(_socketData, ["text"]) === TEXT_MESSAGE.DEALER_ONLINE.CODE)
                )
                    message = TEXT_MESSAGE.NEW_GAME.DEFAULT_TEXT;
                break;
            case GAME_STATUS.FINISHING:
                if (
                    get(_gameSession, ["finalResult", "won"]) > 0 &&
                    get(_gameSession, ["finalResult", "won"]) >= get(_gameSession, ["finalResult", "totalBet"])
                ) {
                    message = TEXT_MESSAGE.YOU_WIN.DEFAULT_TEXT;
                }
                break;
            default:
                return null;
        }
        return message;
    },
);
export const textAlertBetSelector = createSelector(
    [gameProcessSelector, gameSessionSelector],
    (_gameProcess, _gameSession) => {
        switch (_gameProcess.status) {
            case GAME_STATUS.BETTING:
                if (get(_gameSession, ["bets", "bet"])) {
                    return TEXT_MESSAGE.BET_SUCCESS.DEFAULT_TEXT;
                }

                return "";
            case GAME_STATUS.DEALING:
                // Hide text when start dealing cards
                if (parseInt(get(_gameProcess, ["second"])) !== 0) {
                    return null;
                }

                if (get(_gameSession, ["bets", "bet"])) {
                    return TEXT_MESSAGE.BET_SUCCESS.DEFAULT_TEXT;
                }

                return TEXT_MESSAGE.NO_WAGER.DEFAULT_TEXT;
            default:
                return null;
        }
    },
);
