import React from "react";
import { SOUND_FILES } from "constraints/SoundConst";
import { playAudio } from "utils";

export default function CardsItem(props) {
    const { class_name, value } = props;
    React.useEffect(() => {
        playAudio(SOUND_FILES.CARD_DEAL.KEY);
    }, [value]);
    return (
        <div className={class_name}>
            <span className="value">{value}</span>
            <span className="icon">&nbsp;</span>
        </div>
    );
}
