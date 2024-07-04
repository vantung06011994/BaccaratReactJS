import { BET_SIDE_CODE, SCOREBOARD_POSITION } from "core/domain/game/GameCodes";
import { displayBlock, displayNone } from "utils/Style";

import React from "react";
import ScoreBoardBody from "./box-scoreboard-components/ScoreBoardBody";
import ScoreItemHeader from "./box-scoreboard-components/ScoreItemHeader";
import { connect } from "react-redux";
import { convertDeckHistoryToArray } from "utils/index";
import { deckHistorySelector } from "store/selector/GameSelector";
import { scoreboard_options } from "constraints/ScoreboardConst";

const mapStateToProps = (state) => {
    return {
        deckHistory: deckHistorySelector(state),
    };
};

const mapAmount = (deckHistory) => {
    const deckHistoryArray = convertDeckHistoryToArray(deckHistory);
    const newScoreBoard = {
        player: 0,
        banker: 0,
        tie: 0,
        BPair: 0,
        PPair: 0,
        natural: 0,
    };
    deckHistoryArray.forEach(function (item, index) {
        const valueType = parseInt(item[SCOREBOARD_POSITION.TYPE]);
        const valuePair = parseInt(item[SCOREBOARD_POSITION.PAIR]);
        const valueNatural = parseInt(item[SCOREBOARD_POSITION.NATURAL]);

        if (BET_SIDE_CODE.PLAYER === valueType) {
            newScoreBoard.player += 1;
        }
        if (BET_SIDE_CODE.TIE === valueType) {
            newScoreBoard.tie += 1;
        }
        if (BET_SIDE_CODE.BANKER === valueType) {
            newScoreBoard.banker += 1;
        }
        if (BET_SIDE_CODE.PLAYER === valueType && valuePair === 1) {
            newScoreBoard.PPair += 1;
        }
        if (BET_SIDE_CODE.BANKER === valueType && valuePair === 1) {
            newScoreBoard.BPair += 1;
        }
        if (valueNatural === 1) {
            newScoreBoard.natural += 1;
        }
    });

    return newScoreBoard;
};

function BoxScoreboard(props) {
    const [value, setValue] = React.useState({
        valueScore: {},
        deckHistoryCalc: "",
    });

    const { scoreboardClassName, scoreboardID, showHideScoreboard, mobile, toggleScoreboard } = props;
    React.useEffect(() => {
        if (props.deckHistory) {
            const mapValue = mapAmount(props.deckHistory);
            setValue({ valueScore: mapValue, deckHistoryCalc: props.deckHistory });
        }
    }, [props.deckHistory]);

    return (
        <div className={scoreboardClassName} id={scoreboardID} style={showHideScoreboard ? displayBlock : displayNone}>
            <div className="box-body row">
                {mobile && (
                    <span type="button" className="close" onClick={(e) => toggleScoreboard(e)}>
                        <span aria-hidden="true">×</span>
                    </span>
                )}
                <ul className="score-totals p-y">
                    <ScoreItemHeader {...scoreboard_options.banker} amount={value.valueScore.banker} />
                    <ScoreItemHeader {...scoreboard_options.player} amount={value.valueScore.player} />
                    <ScoreItemHeader {...scoreboard_options.tie} amount={value.valueScore.tie} />
                    <ScoreItemHeader {...scoreboard_options.BPair} amount={value.valueScore.BPair} />
                    <ScoreItemHeader {...scoreboard_options.PPair} amount={value.valueScore.PPair} />
                    <ScoreItemHeader {...scoreboard_options.natural} amount={value.valueScore.natural} />
                </ul>
                <ScoreBoardBody deckHistory={value.deckHistoryCalc} />
            </div>
        </div>
    );
}

export default connect(mapStateToProps)(BoxScoreboard);
