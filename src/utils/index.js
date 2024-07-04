import { get, isEmpty, sumBy } from "lodash";

import { GAME_STATUS } from "core/domain/game/GameCodes";
import { SOUND_FILES } from "constraints/SoundConst";

export function suma(a: number): number {
    const b: number = 2;
    if (b === 2) {
        return 2;
    }
    return a + b;
}
export interface IEmp {
    a: number;
    b: number;
}

export function isTablet() {
    const widthDriver = window.screen.width;
    if (widthDriver < 520) {
        return false;
    }
    return true;
}

export function is_touch_device() {
    try {
        document.createEvent("TouchEvent");
        return true;
    } catch (e) {
        return false;
    }
}

export function playAudio(audioId) {
    try {
        const turnOff = document.querySelector("i").classList.contains("icon-volume-off");
        if (!turnOff) {
            const audio = document.getElementById("audio-" + audioId);
            audio.muted = false;
            audio.play();
        }
    } catch (err) {
        return;
    }
}

export function pauseAudio(audioId) {
    const audio = document.getElementById("audio-" + audioId);
    audio.muted = true;
    audio.play();
}

export function onClickAudio() {
    for (const obj in SOUND_FILES) {
        pauseAudio(obj);
    }
}

export function formatNumberBalance(num) {
    num = (num * 1).toFixed(2);
    num += "";
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export function formatNumber(num) {
    num += "";
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export function hiddenIdElement(tag) {
    if (document.getElementById(tag)) document.getElementById(tag).style.display = "none";
    else return true;
}

export function showIdElement(tag) {
    if (document.getElementById(tag)) document.getElementById(tag).style.display = "block";
    else return true;
}

export function findDuplicatesOne(nums) {
    let tortoise = nums[0];
    let hare = nums[0];
    // eslint-disable-next-line no-constant-condition
    while (true) {
        tortoise = nums[tortoise];
        hare = nums[nums[hare]];
        if (tortoise === hare) break;
    }
    let ptr1 = nums[0];
    let ptr2 = tortoise;
    while (ptr1 !== ptr2) {
        ptr1 = nums[ptr1];
        ptr2 = nums[ptr2];
    }
    return ptr1;
}
export function find_duplicate_in_array(arra1) {
    const object = {};
    const result = [];

    arra1.forEach((item) => {
        if (!object[item]) object[item] = 0;
        object[item] += 1;
    });

    for (const prop in object) {
        if (object[prop] >= 2) {
            result.push(prop);
        }
    }

    return result;
}
export function calcPoint(listCard: [{ face: string, value: string }]) {
    if (isEmpty(listCard)) {
        return "";
    }

    const sum = sumBy(listCard, (o) => {
        if (o.value === "A") {
            return 1;
        }
        if (o.value === "J" || o.value === "Q" || o.value === "K") {
            return 10;
        }
        if (o.value > 0 && o.value <= 10) {
            return Number(o.value);
        }
    });

    return sum % 10;
}
export function isShowChips(gameStatus, isSubmitBet) {
    if (gameStatus === GAME_STATUS.BETTING) {
        return isSubmitBet === false;
    }
    return false;
}

export function convertDeckHistoryArrayForScoreBoard(arrayDeckHistory) {
    const newHistoryArr = [];
    const tempHistoryArr = [];
    arrayDeckHistory.forEach(function (item, index) {
        tempHistoryArr.push(item);
        if (tempHistoryArr.length > 5 || index === arrayDeckHistory.length - 1) {
            newHistoryArr.push(tempHistoryArr.splice(0, tempHistoryArr.length));
        }
    });
    return newHistoryArr;
}

export function convertDeckHistoryToArray(deckHistory) {
    const itemDeckHistory = deckHistory ? deckHistory.split("|") : [];
    const newDeckHistory = [];
    itemDeckHistory.pop();

    itemDeckHistory.forEach(function (item, index) {
        newDeckHistory.push(item.split("-").slice());
    });
    return newDeckHistory;
}

export function buildMsgBet(betSides) {
    const arbetOn = [];
    const arbetAmt = [];
    Object.keys(betSides).forEach((k) => {
        arbetOn.push(k);
        arbetAmt.push(betSides[k].amount);
    });
    return { betOn: arbetOn.join("-"), betAmt: arbetAmt.join("-"), action: "bet" };
}

export function buildMsgTip(tipAmount) {
    return { betAmt: tipAmount, action: "tip" };
}

export function getBalanceFromSocketData(socketData) {
    const balance = get(socketData.userSession, ["balance"]);
    return balance ? balance : 0;
}
