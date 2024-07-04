import { CHIPS_TABLE1, CHIPS_TABLE2 } from "../../../../constraints/ChipsConst";
import { isBettingSelector, isSubmitBetSelector, userSessionSelector } from "store/selector/GameSelector";

import ChipItemMobile from "./ChipItemMobile";
import React from "react";
import { useSelector } from "react-redux";

export default function ChipsMenu() {
    const isSubmitBet = useSelector(isSubmitBetSelector);
    const isBetting = useSelector(isBettingSelector);
    const [isShowChipMenuMobile, setShowChipMenuMobile] = React.useState(false);
    const inputRef = React.useRef("menuMobileChip");
    const [chips, setChips] = React.useState(CHIPS_TABLE1);
    const { maxBet } = useSelector((state) => ({
        maxBet: userSessionSelector(state).maxBet,
    }));
    React.useEffect(() => {
        if (maxBet === 300) {
            setChips(CHIPS_TABLE1);
        } else if (maxBet === 1000) {
            setChips(CHIPS_TABLE2);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggleChipMenu = (e) => {
        setShowChipMenuMobile(!isShowChipMenuMobile);
    };

    React.useEffect(() => {
        if (
            (isBetting && !isShowChipMenuMobile) ||
            (!isBetting && isShowChipMenuMobile) ||
            (isSubmitBet && isShowChipMenuMobile)
        ) {
            inputRef.current.click();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isBetting, isSubmitBet]);

    return (
        <div className="chips-menu mobile ">
            <input className="menu-toggler" id="menu-toggler" type="checkbox" ref={inputRef} onClick={toggleChipMenu} />
            <label htmlFor="menu-toggler" />
            <ul>
                {chips.map((item, index) => (
                    <ChipItemMobile key={index} {...item}></ChipItemMobile>
                ))}
            </ul>
        </div>
    );
}
