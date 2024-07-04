import { CARD_CLASSES } from "constraints/CardConst";
import CardsList from "./CardsList";
import React from "react";

export default function CardsContainer() {
    return (
        <div className="cards row">
            <div className="cards">
                <CardsList {...CARD_CLASSES.PLAYER}></CardsList>
                <CardsList {...CARD_CLASSES.BANKER}></CardsList>
            </div>
        </div>
    );
}
