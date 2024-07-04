import { GAME_STATUS, defaultGameProcess } from "./GameCodes";
import {
    generateBetSides,
    generateTotalRisk,
    isBetResponseAction,
    isBettingProcess,
    isDealingProcess,
    isEndOfResultProcess,
    isFirstLogin,
    isNewGame,
    isResultProcess,
    isTipResponseAction,
} from "./GameUtils";
import { get, isEmpty } from "lodash";

import { ACTION_MSG_HEADER } from "core/domain/game/GameCodes";
import { TEXT_MESSAGE } from "constraints/TextConst";
import { defaultBetSides } from "core/domain/game/BetSidesEntity";

class GameUseCase {
    // eslint-disable-next-line no-useless-constructor
    socketData;
    gameProcess;
    //isSubmitBet;
    constructor() {
        this.socketData = {};
        this.gameProcess = { ...defaultGameProcess };
    }

    setSocketData(data) {
        this.socketData = data;
    }

    calcProcess(gameStatus, gameResult, time) {
        if (gameStatus === GAME_STATUS.FINISHING && time === 0) {
            this.gameProcess = defaultGameProcess;
            return defaultGameProcess;
        }

        /*
        Betting Phase -> Dealing Phase : time == 0
        */
        if (gameStatus === GAME_STATUS.BETTING && time < 1) {
            gameStatus = GAME_STATUS.DEALING;
        }

        this.gameProcess = { ...this.gameProcess, status: gameStatus, second: time, result: gameResult };
        return this.gameProcess;
    }

    calcGameProcess() {
        if (isEmpty(this.socketData.game)) {
            this.gameProcess = defaultGameProcess;
            return defaultGameProcess;
        }
        const gameStatus = this.socketData.game.status;
        const gameResult = this.socketData.game.result;
        const time = this.socketData.game.time;
        return this.calcProcess(gameStatus, gameResult, time);
    }

    getBetSides(currentBetSides) {
        if (this.socketData.action === ACTION_MSG_HEADER.CHAT.id) {
            return currentBetSides;
        }

        if (this.isNewGame() || (this.isDealingProcess() && this.socketData.gameSession?.bets.bet === undefined)) {
            return defaultBetSides;
        }

        return this.isFirstLogin() || get(this.socketData, ["text"]) === TEXT_MESSAGE.DEALER_ONLINE.CODE
            ? generateBetSides(this.socketData)
            : currentBetSides;
    }

    getBetSides2() {
        return this.socketData.gameSession?.bets.bet === undefined || this.socketData.gameSession?.bets === ""
            ? defaultBetSides
            : generateBetSides(this.socketData);
    }

    updateTotalRisk(totalRisk) {
        if (this.socketData.action === ACTION_MSG_HEADER.CHAT.id) {
            return totalRisk;
        }

        if (this.isNewGame() || (this.isDealingProcess() && this.socketData.gameSession?.bets.bet === undefined)) {
            return 0;
        }
        return this.isFirstLogin() || get(this.socketData, ["text"]) === TEXT_MESSAGE.DEALER_ONLINE.CODE
            ? generateTotalRisk(this.socketData)
            : totalRisk;
    }

    updateTotalRisk2() {
        return this.socketData.gameSession?.bets.bet === undefined || this.socketData.gameSession?.bets === ""
            ? 0
            : generateTotalRisk(this.socketData);
    }

    updateCardList(cardList) {
        if (this.socketData.action === ACTION_MSG_HEADER.BETTOR_JOKER_REACHED.id) {
            return cardList;
        }

        return { banker: this.socketData.game?.banker, player: this.socketData.game?.player };
    }

    getIsSubmitbet(currentIsSubmitbet) {
        return this.isNewGame() ? false : currentIsSubmitbet;
    }

    updateBalanceTemp(balanceTemp) {
        if (
            (this.isFirstLogin() ||
                this.isNewGame() ||
                this.isDealingProcess() ||
                this.isResultProcess() ||
                this.isTipResponseAction() ||
                this.isBetResponseAction()) &&
            this.socketData.userSession.balance !== undefined
        ) {
            return this.socketData.userSession.balance;
        }
        return balanceTemp;
    }

    updateChipSelected(chipSelected) {
        return this.isNewGame() ? 0 : chipSelected;
    }

    isResultProcess() {
        return isResultProcess(this.gameProcess);
    }

    isDealingProcess() {
        return isDealingProcess(this.gameProcess);
    }

    isEndOfBettingProcess() {
        return this.isBettingProcess() && parseInt(get(this.socketData.game, ["time"])) === 0;
    }

    isEndOfResultProcess() {
        return isEndOfResultProcess(this.gameProcess, this.socketData);
    }

    isBettingProcess() {
        return isBettingProcess(this.gameProcess);
    }

    isFirstLogin() {
        return isFirstLogin(this.socketData);
    }

    isNewGame() {
        return isNewGame(this.gameProcess);
    }

    isTipResponseAction() {
        return isTipResponseAction(this.socketData);
    }

    isBetResponseAction() {
        return isBetResponseAction(this.socketData);
    }

    getNetWin(socketData, currentNetWin) {
        if (this.socketData.game?.time > -1) {
            return currentNetWin;
        }
        currentNetWin = 0;
        const totalBet = Number(get(socketData.gameSession?.finalResult, ["totalBet"]));
        const lost = Number(get(socketData.gameSession?.finalResult, ["lost"]));
        const won = Number(get(socketData.gameSession?.finalResult, ["won"]));
        const totalEarning = Number(get(socketData.gameSession?.finalResult, ["totalEarning"]));
        const commission = Number(get(socketData.gameSession?.finalResult, ["commission"]));
        const result = Number(get(socketData.game, ["result"]));
        const playerSide = get(socketData.game, ["playerSide"]);
        const bankerSide = get(socketData.game, ["bankerSide"]);
        if (result === 0 && won > 0) currentNetWin = won / 8 + won - lost;
        if (result > 0 && won > 0) {
            if ((playerSide === true || bankerSide === true) && won > 0)
                currentNetWin = won + totalBet - lost - commission;
            else currentNetWin = totalBet + totalEarning;
        }
        return currentNetWin;
    }

    isNeedUpdate() {
        return this.isNewGame() || this.isFirstLogin() || this.isEndOfBettingProcess();
    }
}

export default GameUseCase;
