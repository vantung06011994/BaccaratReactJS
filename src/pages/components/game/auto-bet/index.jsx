import { useDispatch, useSelector } from "react-redux";

import React from "react";
import { toggleAutoBet } from "store/actions/GameAction";

export default function AutoBet() {
    const isAutoBet = useSelector((state) => state.game.isAutoBet);
    const dispatch = useDispatch();
    const onToggleAutoBet = (e) => {
        e.preventDefault();
        dispatch(toggleAutoBet());
    };
    return (
        <div className="auto-bet">
            <label className="toggler" onClick={(e) => onToggleAutoBet(e)}>
                <input
                    type="checkbox"
                    className="custom-control-input remember"
                    id="remember"
                    checked={isAutoBet}
                    onChange={(e) => {}}
                />
                <span className="slider round" />
            </label>
            <p>
                <small>Auto Bet*</small>
            </p>
        </div>
    );
}
