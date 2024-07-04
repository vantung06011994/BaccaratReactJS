import React from "react";
import { removeChipAllAction } from "store/actions/GameAction";
import { useDispatch } from "react-redux";

export default function ClearBetBtn() {
    const dispatch = useDispatch();
    const onHandleClearBet = React.useCallback(() => {
        dispatch(removeChipAllAction());
    }, [dispatch]);
    return (
        <div className="clear-bet-btn" onClick={(e) => onHandleClearBet()}>
            <span>Clear Bet</span>
        </div>
    );
}
