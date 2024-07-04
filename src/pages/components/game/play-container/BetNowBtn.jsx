import React from "react";
import { betNowRequestAction } from "store/actions/GameAction";
import { useDispatch } from "react-redux";

export default function BetNowBtn() {
    const dispatch = useDispatch();
    const onHandleSubmitBet = React.useCallback(() => {
        dispatch(betNowRequestAction());
    }, [dispatch]);
    return (
        <div className="action-btn " onClick={(e) => onHandleSubmitBet()}>
            <span>Bet Now*</span>
        </div>
    );
}
