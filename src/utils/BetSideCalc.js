import { BET_SIDE_MAP_RULES } from "core/domain/game/GameCodes";
import { reGenerateChips } from "core/domain/game/GameUtils";

export function isValidMinBetSide(sideCode: number, amount: number, userSession: any): boolean {
    const keyminAmount: string = BET_SIDE_MAP_RULES[sideCode].minAmountKey;
    const minAmount = userSession[keyminAmount];
    return amount === 0 || amount >= minAmount;
}

export function isValidBetSide(sideCode: number, amount: number, userSession: any): boolean {
    const keyminAmount: string = BET_SIDE_MAP_RULES[sideCode].minAmountKey;
    const keymaxAmount: string = BET_SIDE_MAP_RULES[sideCode].maxAmountKey;
    const minAmount = userSession[keyminAmount];
    const maxAmount = userSession[keymaxAmount];
    return amount <= maxAmount && amount >= minAmount;
}
export function minSideAmount(sideCode: number, amount: number, userSession: any): number {
    const keymaxAmount: string = BET_SIDE_MAP_RULES[sideCode].maxAmountKey;
    const maxAmount: number = userSession[keymaxAmount];
    return Math.min(amount, maxAmount);
}
export function isValidMaxSideAmount(sideCode: number, current_amt: number, amount: number, userSession: any): boolean {
    const keymaxAmount: string = BET_SIDE_MAP_RULES[sideCode].maxAmountKey;
    const maxAmount: number = userSession[keymaxAmount];
    return maxAmount - (current_amt + amount) >= 0;
}
export function getExpectedAmtBet(
    pending_balance: number,
    sideCode: number,
    current_amount: number,
    amount_bet: number,
    userSession: any,
): number {
    const keymaxAmount: string = BET_SIDE_MAP_RULES[sideCode].maxAmountKey;
    const maxAmount: number = userSession[keymaxAmount];
    const pendingAmt = maxAmount - (amount_bet + current_amount);
    let adjustAmt = 0;
    if (pendingAmt < 0) {
        adjustAmt = maxAmount - current_amount;
    } else {
        adjustAmt = amount_bet;
    }
    return Math.min(adjustAmt, pending_balance);
}

// export function doAdjustBetSideChips(): [] {
//     return [];
// }

//bet side amount =current_amt + new_amt
//balance,withdraw_amount,totalRisk

export function getValidBetSide(
    current_betSide_chips: number[],
    current_betSide_amt: number,
    current_totalRisk: number,
    amount_bet: number,
    sideCode: number,
    userSession: any,
): any {
    const balance = userSession.balance;
    const available_balance = Math.trunc(balance);
    const pending_balance = available_balance - current_totalRisk;
    const amt_will_to_bet = getExpectedAmtBet(pending_balance, sideCode, current_betSide_amt, amount_bet, userSession);
    //balanceconst pending_totalRisk = current_totalRisk + amt_will_to_bet;
    if (amt_will_to_bet === 0) {
        return {
            totalRisk: current_totalRisk,
            sideCode: sideCode,
            chips: current_betSide_chips,
            amount: current_betSide_amt,
        };
    } else {
        const newChips = reGenerateChips(current_betSide_chips, amt_will_to_bet);
        return {
            totalRisk: current_totalRisk + amt_will_to_bet,
            sideCode: sideCode,
            chips: newChips,
            amount: current_betSide_amt + amt_will_to_bet,
        };
    }
}

export function isValidAllBetSides(allBetSides, userSession) {
    const keys = Object.keys(allBetSides);
    let sumAllBetSides = 0;
    for (let index = 0; index < keys.length; index++) {
        const sideCode = Number(keys[index]);
        const amount = allBetSides[sideCode].amount;
        sumAllBetSides = sumAllBetSides + amount;
        if (amount > 0) {
            if (isValidBetSide(sideCode, amount, userSession) === false) {
                return false;
            }
        }
    }
    if (sumAllBetSides > 0) {
        return true;
    }
    return false;
}
