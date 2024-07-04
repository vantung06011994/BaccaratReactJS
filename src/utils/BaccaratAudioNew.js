import React from "react";
import { SOUND_FILES } from "constraints/SoundConst";

function AddAudios() {
    const Audio = (props) => {
        const { audioId, mp3_url, ogg_url } = props;
        return (
            <audio id={"audio-".concat(audioId)}>
                <source src={ogg_url} type="audio/ogg" />
                <source src={mp3_url} type="audio/mpeg" />
            </audio>
        );
    };

    return (
        <React.Fragment>
            <Audio
                audioId={SOUND_FILES.INFO.KEY}
                mp3_url={SOUND_FILES.INFO.MP3_URL}
                ogg_url={SOUND_FILES.INFO.OGG_URL}
            />
            <Audio
                audioId={SOUND_FILES.SLOW_TICK.KEY}
                mp3_url={SOUND_FILES.SLOW_TICK.MP3_URL}
                ogg_url={SOUND_FILES.SLOW_TICK.OGG_URL}
            />
            <Audio
                audioId={SOUND_FILES.FAST_TICK.KEY}
                mp3_url={SOUND_FILES.FAST_TICK.MP3_URL}
                ogg_url={SOUND_FILES.FAST_TICK.OGG_URL}
            />
            <Audio
                audioId={SOUND_FILES.DROP_CHIP.KEY}
                mp3_url={SOUND_FILES.DROP_CHIP.MP3_URL}
                ogg_url={SOUND_FILES.DROP_CHIP.OGG_URL}
            />
            <Audio
                audioId={SOUND_FILES.CHEER.KEY}
                mp3_url={SOUND_FILES.CHEER.MP3_URL}
                ogg_url={SOUND_FILES.CHEER.OGG_URL}
            />
            <Audio
                audioId={SOUND_FILES.COMPLETE.KEY}
                mp3_url={SOUND_FILES.COMPLETE.MP3_URL}
                ogg_url={SOUND_FILES.COMPLETE.OGG_URL}
            />
            <Audio
                audioId={SOUND_FILES.CARD_DEAL.KEY}
                mp3_url={SOUND_FILES.CARD_DEAL.MP3_URL}
                ogg_url={SOUND_FILES.CARD_DEAL.OGG_URL}
            />
            <Audio
                audioId={SOUND_FILES.SHOW_RESULT.KEY}
                mp3_url={SOUND_FILES.SHOW_RESULT.MP3_URL}
                ogg_url={SOUND_FILES.SHOW_RESULT.OGG_URL}
            />
            <Audio
                audioId={SOUND_FILES.CHIP_HOVER.KEY}
                mp3_url={SOUND_FILES.CHIP_HOVER.MP3_URL}
                ogg_url={SOUND_FILES.CHIP_HOVER.OGG_URL}
            />
        </React.Fragment>
    );
}

export default AddAudios;
