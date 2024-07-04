import React from "react";
import { useSelector } from "react-redux";

export default function BetSideChips(props) {
    const { selectTypeChipClassName, betSideCode } = props;
    const chips = useSelector((state) => state.game.betSides[betSideCode].chips);
    return (
        <div className={selectTypeChipClassName}>
            {chips.map((chip, index) => (
                <div key={index} className={`chip chip-${chip} pos-${index + 1} chip-selected`}>
                    <span>{chip}</span>
                </div>
            ))}
        </div>
    );
}
