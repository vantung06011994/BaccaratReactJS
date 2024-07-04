import React from "react";
import { SOUND_FILES } from "constraints/SoundConst";
import { playAudio } from "utils";

export default function BoxGameProgressSecond(props) {
    const { secondLeft, firstLevelClassName } = props;
    React.useEffect(() => {
        if (secondLeft > -1) {
            //baccaratAudio
            playAudio(SOUND_FILES.SLOW_TICK.KEY);
        }
    }, [secondLeft]);
    return (
        <div className={firstLevelClassName}>
            <span className="seconds text-primary">{secondLeft > 0 ? secondLeft : "--"}</span>
            <span className="left">SECONDS LEFT</span>
            {props.children}
        </div>
    );
}
