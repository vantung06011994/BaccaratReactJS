import { ACTION_MSG_HEADER, AVAILABLE_CHIP_TYPES, GAME_STATUS, defaultDealer } from "core/domain/game/GameCodes";
import { indexOf, isArray, sum } from "lodash";

import { defaultBetSides } from "core/domain/game/BetSidesEntity";
import { formatNumber } from "utils/index";
import produce from "immer";

export function reGenerateChips(current_chip: number[], amt_will_to_bet: number): number[] {
    const new_Chips = [...current_chip];
    if (indexOf(AVAILABLE_CHIP_TYPES, amt_will_to_bet) > -1) {
        new_Chips.push(amt_will_to_bet);
    } else {
        let amt_down = amt_will_to_bet;
        let indexChipTypes = AVAILABLE_CHIP_TYPES.length - 1;
        while (amt_down > 0) {
            const pending = amt_down - AVAILABLE_CHIP_TYPES[indexChipTypes];
            if (pending >= 0) {
                amt_down = pending;
                new_Chips.push(AVAILABLE_CHIP_TYPES[indexChipTypes]);
            } else {
                indexChipTypes = indexChipTypes - 1;
            }
        }
    }

    return new_Chips;
}

export function generateBetSides(socketData) {
    let betArray = socketData.gameSession.bets.bet;
    if (isArray(betArray) === false) {
        betArray = [betArray];
    }

    return produce(defaultBetSides, (draft) => {
        betArray.map((value) => {
            if (value !== undefined)
                draft[value.betOn] = { chips: reGenerateChips([], value.amount), amount: value.amount };
            return value;
        });
    });
}

export function generateTotalRisk(socketData) {
    let betArray = socketData.gameSession.bets.bet;
    if (!betArray) {
        return 0;
    }
    if (isArray(betArray) === false) {
        betArray = [betArray];
    }
    return sum(
        betArray.map((value) => {
            return value.amount;
        }),
    );
}

export function isNewGame(gameProcess) {
    return Number(gameProcess.status) === Number(GAME_STATUS.IDLE);
}

export function isFirstLogin(socketData) {
    return socketData.action === ACTION_MSG_HEADER.LOGIN.id;
}

export function isResultProcess(gameProcess) {
    return Number(gameProcess.status) === Number(GAME_STATUS.FINISHING);
}

export function isDealingProcess(gameProcess) {
    return Number(gameProcess.status) === Number(GAME_STATUS.DEALING);
}

export function isBettingProcess(gameProcess) {
    return Number(gameProcess.status) === Number(GAME_STATUS.BETTING);
}

export function isEndOfResultProcess(gameProcess, socketData) {
    return isResultProcess(gameProcess) && socketData.game?.time === 0;
}

export function getDealer(dealerId, dealerList) {
    let dealerResult;
    dealerList.forEach((dealer) => {
        if (formatNumber(dealerId) === formatNumber(dealer.id)) {
            dealerResult = { ...dealer };
        }
    });
    return dealerResult !== undefined ? dealerResult : defaultDealer;
}

export function isTipResponseAction(socketData) {
    return socketData.action !== undefined && socketData.action === ACTION_MSG_HEADER.TIP.id;
}

export function isBetResponseAction(socketData) {
    return socketData.action !== undefined && socketData.action === ACTION_MSG_HEADER.BET.id;
}
