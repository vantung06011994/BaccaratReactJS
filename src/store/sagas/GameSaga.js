import {
    GameActionType,
    betNowSuccessAction,
    cleanGameReducerAction,
    putChipToSideSuccessAction,
    removeChipSuccessAction,
    updateIsValidBetSideAction,
} from "../actions/GameAction";
import {
    betSidesSelector,
    chipSelectedSelector,
    totalRiskSelector,
    userSessionSelector,
} from "../selector/GameSelector";
import { buildMsgBet, buildMsgTip } from "utils";
import { call, fork, put, take, takeLatest, takeLeading } from "redux-saga/effects";
import { getValidBetSide, isValidAllBetSides } from "../../utils/BetSideCalc";

import { DEBUG_ON } from "globalconfig";
import { UserActionType } from "../actions/UserAction";
import { eventChannel } from "redux-saga";
import { putSocketData } from "store/actions/GameAction";
import { reBetSelector } from "../selector/GameSelector";
import { reBetSuccessAction } from "../actions/GameAction";
import { select } from "../../../node_modules/redux-saga-test-plan/matchers";
import socketAPI from "../../core/adapters/infrastructures/SocketManager";

// This is how a channel is created
const createSocketChannel = (_socketApi) =>
    eventChannel((saga_emit) => {
        _socketApi.onMessage((messageResult) => {
            saga_emit(messageResult);
        });
        return () => {
            if (DEBUG_ON) console.log("Closing Websocket");
            _socketApi.disconnect();
        };
    });
function* read(_channel) {
    while (true) {
        const messageFromChannel = yield take(_channel);
        yield put(putSocketData(messageFromChannel));
    }
}
function* write(_socketApi) {
    while (true) {
        const { payload } = yield take(GameActionType.BETNOW_SUCCESS);
        const msgTobet = buildMsgBet(payload.betSides);
        _socketApi.emit(msgTobet);
    }
}

function* sendTipDealerWrite(_socketApi) {
    while (true) {
        const { payload } = yield take(GameActionType.TIP_DEALER_REQUEST);
        const msgToTip = buildMsgTip(payload.amount);
        _socketApi.emit(msgToTip);
    }
}

function* gameSocketFlow(action) {
    try {
        const _token = action.payload.user.token;
        const _channel = action.payload.user.channel;
        const socket_api = yield socketAPI.connect(_token, _channel);
        const channel = yield call(createSocketChannel, socket_api);
        yield fork(read, channel);
        yield fork(write, socket_api);
        yield fork(sendTipDealerWrite, socket_api);
        const cancel = yield take(UserActionType.USER_LOGGED_OUT);
        if (cancel) {
            channel.close();
            yield put(cleanGameReducerAction());
        }
    } catch (error) {
        if (DEBUG_ON) console.log("function*gameSocketFlowSagaWatcher -> error", error);
        //notifyMessageErrorObject(error);
    }
}
function* gameSocketFlowSagaWatcher() {
    yield takeLatest(UserActionType.USER_LOGIN_SUCCESS, gameSocketFlow);
}
/***** */

function* betRequestSaga(action) {
    try {
        const betSides = yield select(betSidesSelector);
        const current_userSession = yield select(userSessionSelector);
        const isValid = isValidAllBetSides(betSides, current_userSession);
        if (isValid) {
            yield put(betNowSuccessAction(betSides));
        }
    } catch (error) {
        if (DEBUG_ON) console.log("function*betRequestSaga -> error", error);
        //notifyMessageErrorObject(error);
    }
}
function* betRequestSagaWatcher() {
    yield takeLatest(GameActionType.BETNOW_REQUEST, betRequestSaga);
}

/****** */
function* putChipRequestSaga(action) {
    try {
        const amount_bet = yield select(chipSelectedSelector);
        if (amount_bet > 0) {
            let betSides = yield select(betSidesSelector);
            const current_userSession = yield select(userSessionSelector);
            const current_totalRisk = yield select(totalRiskSelector);
            const betSideCode = action.payload.betSideCode;
            const current_betSide_chips = betSides[betSideCode].chips;
            const current_betSide_amt = betSides[betSideCode].amount;
            const newBetSide = getValidBetSide(
                current_betSide_chips,
                current_betSide_amt,
                current_totalRisk,
                amount_bet,
                betSideCode,
                current_userSession,
            );

            yield put(
                putChipToSideSuccessAction(
                    newBetSide.sideCode,
                    newBetSide.chips,
                    newBetSide.amount,
                    newBetSide.totalRisk,
                ),
            );

            betSides = yield select(betSidesSelector);
            const isValid = isValidAllBetSides(betSides, current_userSession);
            yield put(updateIsValidBetSideAction(isValid));
        }
    } catch (error) {
        if (DEBUG_ON) console.log("function*putChipRequestSaga -> error", error);
        //notifyMessageErrorObject(error);
    }
}
function* putChipRequestSagaWatcher() {
    yield takeLeading(GameActionType.PUT_CHIP_TO_SIDE_REQUEST, putChipRequestSaga);
}
/****** */
function* removeChipRequestSaga(action) {
    try {
        const betSideCode = action.payload.betSideCode;
        yield put(removeChipSuccessAction(betSideCode));

        const current_userSession = yield select(userSessionSelector);
        const betSides = yield select(betSidesSelector);
        const isValid = isValidAllBetSides(betSides, current_userSession);
        yield put(updateIsValidBetSideAction(isValid));
    } catch (error) {
        if (DEBUG_ON) console.log("function*removeChipRequestSaga -> error", error);
    }
}

function* removeChipRequestSagaWatcher() {
    yield takeLeading(GameActionType.REMOVE_CHIP_REQUEST, removeChipRequestSaga);
}
/****** */
function* reBetRequestSaga(action) {
    try {
        const reBetData = yield select(reBetSelector);
        const current_userSession = yield select(userSessionSelector);
        const balance = current_userSession.balance;
        if (balance - reBetData.totalRisk >= 0) {
            yield put(reBetSuccessAction(reBetData.betSides, reBetData.totalRisk));
        }
    } catch (error) {
        if (DEBUG_ON) console.log("function*reBetRequestSaga -> error", error);
    }
}
function* reBetRequestSagaWatcher() {
    yield takeLatest(GameActionType.REBET_REQUEST, reBetRequestSaga);
}

export const gameWatchers = [
    gameSocketFlowSagaWatcher(),
    betRequestSagaWatcher(),
    putChipRequestSagaWatcher(),
    removeChipRequestSagaWatcher(),
    reBetRequestSagaWatcher(),
];
