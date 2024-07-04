import { balanceTempSelector, gameIDcodeSelector } from "store/selector/GameSelector";

import React from "react";
import { connect } from "react-redux";
import { formatNumberBalance } from "utils";

const InfoLine = (props) => {
    const { wrapperClassName, title, innerClassName, value, money, h2ClassName, gameId } = props;
    return (
        <div className={wrapperClassName}>
            <h2 className={h2ClassName}>
                <span>{title}</span>
                {money && "$"}
                <span className={innerClassName}>{gameId !== undefined ? gameId : formatNumberBalance(value)}</span>
            </h2>
        </div>
    );
};

const mapBalanceToProps = (state, ownProps) => {
    const balance = balanceTempSelector(state);
    return {
        ...ownProps,
        value: balance,
    };
};

export const InfoLineBalanceHook = connect(mapBalanceToProps)(InfoLine);

const mapGameIDToProps = (state, ownProps) => {
    return {
        ...ownProps,
        gameId: gameIDcodeSelector(state),
    };
};

export const InfoLineGameIDHook = connect(mapGameIDToProps)(InfoLine);

export default InfoLine;
