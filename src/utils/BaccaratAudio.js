import { SOUND_FILES } from "constraints/SoundConst";
import { isEmpty } from "lodash";

class BaccaratAudio {
    audios;
    isMute;
    constructor() {
        this.audios = this.initAudioList();
        this.isMute = false;
    }

    setIsMute(ismute) {
        this.isMute = ismute;
    }
    initAudioList() {
        let tmpAudio = {};
        // eslint-disable-next-line array-callback-return
        Object.keys(SOUND_FILES).map((k) => {
            const newAudio = new Audio(SOUND_FILES[k].MP3_URL);
            tmpAudio = { ...tmpAudio, [k]: newAudio };
        });
        return tmpAudio;
    }
    playSpecifyAudio(key) {
        if (this.isMute) return;
        if (!isEmpty(this.audios)) {
            this.audios[key].play();
        }
    }
}
const baccaratAudio = new BaccaratAudio();
export default baccaratAudio;
