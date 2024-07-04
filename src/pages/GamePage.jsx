import DisConnectBrokenWrapper from "./components/game/DisconnectBrokenWrapper";
import GameContainer from "./components/game";
import React from "react";
import { SOUND_FILES } from "constraints/SoundConst";
import { isEmptySocketDataSelector } from "../store/selector/GameSelector";
import { playAudio } from "utils";
import { useSelector } from "react-redux";

const GamePage = () => {
    const isEmptySocketData = useSelector(isEmptySocketDataSelector);
    React.useEffect(() => {
        setTimeout(() => {
            playAudio(SOUND_FILES.COMPLETE.KEY);
            setTimeout(() => {
                playAudio(SOUND_FILES.INFO.KEY);
            }, 1500);
        }, 500);
    }, []);
    return isEmptySocketData ? (
        <h1>Connecting to playing table....</h1>
    ) : (
        <DisConnectBrokenWrapper>
            <GameContainer></GameContainer>
        </DisConnectBrokenWrapper>
    );
};

export default GamePage;
