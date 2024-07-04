import { gameResultSelector, isShowChipsSelector, userSessionSelector } from "../../../../store/selector/GameSelector";
import { useDispatch, useSelector } from "react-redux";

import BetDisplayWinner from "./BetDisplayWinner";
import BetSideChipTooltip from "./BetSideChipTooltip";
import BetSideChips from "./BetSideChips";
import BetSideRemoveBtn from "./BetSideRemoveBtn";
import React from "react";
import ReactHtmlParser from "react-html-parser";
import { isEmpty } from "lodash";
import { isValidMinBetSide } from "../../../../utils/BetSideCalc";
import { putChipToSideRequestAction } from "../../../../store/actions/GameAction";

function BetSide(props) {
    const {
        id,
        tooltipClassName,
        img,
        altText,
        selectTypeChipClassName,
        isTooltipHelp,
        tooltipHelpText,
        betOn,
        numberChipClassName,
        textWinner,
        displayTextWinnerBy,
    } = props;
    const { resultWinner, amount, isShowChips, userSession } = useSelector((state) => ({
        amount: state.game.betSides[betOn].amount,
        isShowChips: isShowChipsSelector(state),
        resultWinner: gameResultSelector(state),
        userSession: userSessionSelector(state),
    }));
    const dispatch = useDispatch();
    const canRemoveChip = () => {
        return isShowChips && amount > 0;
    };
    const handlePutChipRequest = (e) => {
        e.preventDefault();
        if (isShowChips) {
            dispatch(putChipToSideRequestAction(betOn));
        }
    };

    return (
        <div className={tooltipClassName}>
            <div className="select-type" onClick={(e) => handlePutChipRequest(e)}>
                {displayTextWinnerBy === resultWinner && <BetDisplayWinner textWinner={textWinner}></BetDisplayWinner>}
                <BetSideChips selectTypeChipClassName={selectTypeChipClassName} betSideCode={betOn} />
                {!isEmpty(img) ? (
                    <div className={id}>
                        <img src={img} alt={altText} />
                    </div>
                ) : (
                    <div className="text-title">{altText}</div>
                )}
            </div>
            {isTooltipHelp && (
                <div className={id !== "dragon" ? "jackpot-help left" : "jackpot-help right"}>
                    <button className="btn">?</button>
                    <div className="tooltip text-left">{ReactHtmlParser(tooltipHelpText)}</div>
                </div>
            )}
            {canRemoveChip() && <BetSideRemoveBtn betSideCode={betOn}></BetSideRemoveBtn>}
            {amount > 0 && (
                <BetSideChipTooltip
                    numberChipClassName={numberChipClassName}
                    betSideCode={betOn}
                    amount={amount}
                ></BetSideChipTooltip>
            )}
            {isValidMinBetSide(betOn, amount, userSession) === false && (
                <div className="text-insufficient pulse">Insufficient</div>
            )}
        </div>
    );
}

export default BetSide;
