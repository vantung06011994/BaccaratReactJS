import { selectedChipDesktopStyle, selectedChipIpadStyle, selectedChipMobileStyle } from "utils/Style";
import { useDispatch, useSelector } from "react-redux";

import React from "react";
import { chipSelectedSelector } from "store/selector/GameSelector";
import { isTablet } from "utils";
import { putSelectChipAction } from "store/actions/GameAction";

export default function Chip(props) {
    const { chipClassName, value, mobile } = props;
    const dispatch = useDispatch();
    const selectedChip = useSelector(chipSelectedSelector);

    const handlePutChipSelect = (e) => {
        if (value === selectedChip) {
            return;
        }
        e.preventDefault();
        dispatch(putSelectChipAction(value));
    };

    const selectedChipStyle = () => {
        if (mobile) {
            if (isTablet()) {
                return selectedChipIpadStyle;
            }
            return selectedChipMobileStyle;
        }
        return selectedChipDesktopStyle;
    };
    return (
        <div
            className={chipClassName}
            onClick={(e) => handlePutChipSelect(e)}
            style={value === selectedChip ? selectedChipStyle() : {}}
        >
            <div className="value">
                <span className="data-value">{value}</span>
            </div>
        </div>
    );
}
