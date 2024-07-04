import { textAlertBetSelector, textAlertGameSelector } from "store/selector/GameSelector";

import React from "react";
import { SOUND_FILES } from "constraints/SoundConst";
import { TEXT_MESSAGE } from "constraints/TextConst";
import { playAudio } from "utils";
import { useSelector } from "react-redux";

function TextAlertGame() {
    const text = useSelector(textAlertGameSelector);
    React.useEffect(() => {
        if (text === TEXT_MESSAGE.YOU_WIN.DEFAULT_TEXT) {
            //baccaratAudio
            playAudio(SOUND_FILES.CHEER.KEY);
        }
    }, [text]);
    return (
        text && (
            <div className="text-alerts">
                <p className="d-text zoom-in">{text}</p>
            </div>
        )
    );
}

function TextAlertBet() {
    const text = useSelector(textAlertBetSelector);
    return (
        text && (
            <div className="text-alerts success ">
                <h2 className="zoom-in">{text}</h2>
            </div>
        )
    );
}
export default function TextAlerts() {
    return (
        <>
            <TextAlertGame></TextAlertGame>
            <TextAlertBet></TextAlertBet>
        </>
    );
}
