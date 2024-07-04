import React from "react";
import { removeChipRequestAction } from "store/actions/GameAction";
import { useDispatch } from "react-redux";

export default function BetSideRemoveBtn(props) {
    const { betSideCode } = props;
    const dispatch = useDispatch();
    const onHandleRemove = (e) => {
        e.preventDefault();
        dispatch(removeChipRequestAction(betSideCode));
    };
    return (
        <div className="nowrap zoom-in text-remove " onClick={(e) => onHandleRemove(e)}>
            Remove*
        </div>
    );
}
