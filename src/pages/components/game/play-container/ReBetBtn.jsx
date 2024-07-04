import React from "react";
import { reBetAction } from "store/actions/GameAction";
import { useDispatch } from "react-redux";

export default function ReBetBtn() {
    const dispatch = useDispatch();
    const onHandleRebet = React.useCallback(
        (e) => {
            e.preventDefault();
            dispatch(reBetAction());
        },
        [dispatch],
    );
    return (
        <div className="action-rebet " onClick={(e) => onHandleRebet(e)}>
            <span>REBET*</span> <i className="demo-icon icon-cw" />
        </div>
    );
}
