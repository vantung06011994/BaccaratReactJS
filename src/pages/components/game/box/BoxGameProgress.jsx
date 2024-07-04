import {
    gameProcessSecondSelector,
    gameProcessStatusSelector,
    isAutoBetSelector,
    isSubmitBetSelector,
} from "store/selector/GameSelector";
import { useDispatch, useSelector } from "react-redux";

import BoxGameProgressSecond from "./BoxGameProgressSecond";
import { GAME_STATUS } from "core/domain/game/GameCodes";
import React from "react";
import { betNowRequestAction } from "store/actions/GameAction";

function BoxGameProgress(props) {
    const { mobile, desktop, main } = props;

    const { status, second, isSubmitBet, isAutobet } = useSelector((state) => ({
        status: gameProcessStatusSelector(state),
        second: gameProcessSecondSelector(state),
        isSubmitBet: isSubmitBetSelector(state),
        isAutobet: isAutoBetSelector(state),
    }));
    const dispatch = useDispatch();
    const displayBoxGame = React.useMemo(() => {
        const bettingClass =
            status === GAME_STATUS.BETTING && second > 0
                ? "betting active pulse"
                : mobile
                ? "betting active pulse d-none"
                : "betting";
        const dealingClass =
            status === GAME_STATUS.DEALING || (status === GAME_STATUS.BETTING && second < 1)
                ? "dealing active pulse"
                : mobile
                ? "betting active pulse d-none"
                : "dealing";
        const resultsClass =
            status === GAME_STATUS.FINISHING
                ? "results active pulse"
                : mobile
                ? "betting active pulse d-none"
                : "results";
        return {
            bettingClass: bettingClass,
            dealingClass: dealingClass,
            resultsClass: resultsClass,
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    React.useEffect(() => {
        //Prevent listen twice althought need render component twice desktop/mobile
        if (main) {
            if (status === GAME_STATUS.BETTING && isAutobet && !isSubmitBet && second === 1) {
                dispatch(betNowRequestAction());
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status, second]);

    return desktop ? (
        <div>
            <BoxGameProgressSecond
                secondLeft={second}
                firstLevelClassName="count-down text-center col col-50"
            ></BoxGameProgressSecond>
            <ul className="game-status col col-50">
                <li>
                    <span className={displayBoxGame.bettingClass}>BETTING</span>
                </li>
                <li>
                    <span className={displayBoxGame.dealingClass}>DEALING</span>
                </li>
                <li>
                    <span className={displayBoxGame.resultsClass}>RESULTS</span>
                </li>
            </ul>
        </div>
    ) : (
        <BoxGameProgressSecond secondLeft={second} firstLevelClassName="count-down text-center">
            {
                <ul className="game-status row">
                    <li>
                        <span className={displayBoxGame.bettingClass}>BETTING</span>
                    </li>
                    <li>
                        <span className={displayBoxGame.dealingClass}>DEALING</span>
                    </li>
                    <li>
                        <span className={displayBoxGame.resultsClass}>RESULTS</span>
                    </li>
                </ul>
            }
        </BoxGameProgressSecond>
    );
}

export default BoxGameProgress;
