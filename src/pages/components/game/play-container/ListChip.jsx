import { CHIPS_TABLE1, CHIPS_TABLE2 } from "constraints/ChipsConst";

import Chip from "../chips-menu/Chip";
import React from "react";
import { useSelector } from "react-redux";
import { userSessionSelector } from "store/selector/GameSelector";

export default function ListChip() {
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

    return (
        <div className="chips desktop-chip ">
            {chips.map((chip) => (
                <Chip key={chip.value} {...chip}></Chip>
            ))}
        </div>
    );
}
