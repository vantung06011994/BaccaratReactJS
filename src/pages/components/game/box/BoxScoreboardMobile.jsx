import BoxScoreboard from "./BoxScoreBoard";
import React from "react";

const BoxScoreboardMobile = () => {
    const [isShow, setIsShow] = React.useState(false);
    const onToggleScoreboard = (e) => {
        e.preventDefault();
        setIsShow(!isShow);
    };
    return (
        <div className="scoreboard scoreboard-mobile mobile" id="scoreboard-mobile">
            <button className="btn btn-primary" id="btn-scoreboard" onClick={(e) => onToggleScoreboard(e)}>
                <span className="score-item">
                    <span className="banker">B</span>
                </span>
                <span className="score-item">
                    <span className="player">P</span>
                </span>
                <span className="score-item">
                    <span className="tie">T</span>
                </span>
                <span>Scoreboard*</span>
            </button>
            {/*scoreboard for mobile*/}
            <BoxScoreboard
                scoreboardClassName="scoreboard box"
                scoreboardID="scoreboard-desktop"
                showHideScoreboard={isShow}
                mobile
                toggleScoreboard={onToggleScoreboard}
            />
        </div>
        /*end scoreboard */
        /*end video elements*/
    );
};

export default BoxScoreboardMobile;
