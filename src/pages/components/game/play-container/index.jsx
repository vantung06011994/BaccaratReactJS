import { isNewGameSelector, isShowChipsSelector, isValidBetSideSelector, reBetSelector, totalRiskSelector } from "store/selector/GameSelector";

import BetNowBtn from "./BetNowBtn";
import CardsContainer from "./CardsContainer";
import ClearBetBtn from "./RemoveBetsBtn";
import ListChip from "./ListChip";
import PlayerChoose from "../player-choose/index";
import ReBetBtn from "./ReBetBtn";
import React from "react";
import TextAlerts from "./TextAlerts";
import { useSelector } from "react-redux";

export default function PlayContainer() {
    const isShowChips = useSelector(isShowChipsSelector);
    const isNewGame = useSelector(isNewGameSelector);
    const reBet = useSelector(reBetSelector);
    const totalRisk = useSelector(totalRiskSelector);
    const isValidBetSide = useSelector(isValidBetSideSelector);
    //const isValidBet = useSelector(isShowChipsSelector);
    return (
        <div className="game-container row">
            <TextAlerts></TextAlerts>
            {isShowChips && <ListChip></ListChip>}
            {isNewGame === false && <CardsContainer></CardsContainer>}
            <PlayerChoose />
            {isValidBetSide && isShowChips && totalRisk > 0 && <BetNowBtn></BetNowBtn>}
            {isShowChips && totalRisk > 0 && <ClearBetBtn></ClearBetBtn>}
            {isShowChips && reBet.totalRisk > 0 && <ReBetBtn></ReBetBtn>}
        </div>
    );
}
