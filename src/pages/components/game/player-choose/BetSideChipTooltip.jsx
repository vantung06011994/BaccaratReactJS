import React from "react";

export default function BetSideChipTooltip(props) {
    const { numberChipClassName, amount } = props;
    return <span className={numberChipClassName}>${amount}</span>;
}
