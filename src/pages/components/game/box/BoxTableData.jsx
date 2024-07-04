import { dealerSelector, userSessionSelector } from "store/selector/GameSelector";

import React from "react";
import { getDefaultText } from "../../../../constraints/TextConst";
import { useSelector } from "react-redux";

function BoxTableData() {
    const [dealerName, setDealerName] = React.useState("Dealer");

    const { text, dealer, maxBet } = useSelector((state) => ({
        text: state.game.socketData?.text,
        dealer: dealerSelector(state),
        maxBet: userSessionSelector(state).maxBet,
    }));

    const [textShow, setTextShow] = React.useState("");

    const [tableNumber, setTableNumber] = React.useState("Table1");

    React.useEffect(() => {
        if (maxBet === 300) {
            setTableNumber("Table 1");
        } else if (maxBet === 1000) {
            setTableNumber("Table 2");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        if (dealer) {
            setDealerName(dealer.split("-").slice(1));
        } else {
            setDealerName("Dealer");
        }
    }, [dealer]);

    React.useEffect(() => {
        if (text !== 108) {
            const textTemp = getDefaultText(text);
            if (textTemp && textTemp.length > 0) setTextShow(textTemp);
        }
    }, [text]);

    return (
        <p>
            [{tableNumber}] Dealer: {dealerName} ({textShow})
        </p>
    );
}

export default BoxTableData;
