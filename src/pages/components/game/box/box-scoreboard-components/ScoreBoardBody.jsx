import { convertDeckHistoryArrayForScoreBoard, convertDeckHistoryToArray } from "utils/index";

import React from "react";

const CLASS_NAME_MAP = {
    0: "tie",
    1: "player",
    2: "banker",
};
const ScoreHistoryWrapper = (props) => {
    const { historyArr } = props;
    const divScroll = React.useRef("scoreHistory");

    const scrollRight = () => {
        divScroll.current.scrollLeft += 1000;
    };

    return (
        <div className="score-history" ref={divScroll}>
            {historyArr.map(function (scoreItems, index) {
                return <ScoreHistory key={index} index={index} scoreItems={scoreItems} scrollRight={scrollRight}/>;
            })}
        </div>
    );
};

const ScoreHistory = (props) => {
    const { index, scoreItems, scrollRight } = props;    

    return (
        <div className={`score-column index-${index}`}>
            {scoreItems.map(function (item, index) {
                return <ScoreHistoryItem key={index} type={item[0]} mark={item[1]} sup={item[2]} scrollRight={scrollRight}/>;
            })}
        </div>
    );
};

const ScoreHistoryItem = (props) => {
    const { type, mark, sup, scrollRight } = props;

    React.useEffect(() => {
        scrollRight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <span className="score-item">
            {sup === 1 && <sup className={CLASS_NAME_MAP[type]} />}
            <span className={CLASS_NAME_MAP[type]}>{mark}</span>
        </span>
    );
};

const ScoreBoardBody = (props) => {
    const { deckHistory } = props;

    const historyArrCalc = React.useMemo(() => {
        const deckHistoryArray = convertDeckHistoryToArray(deckHistory);
        return convertDeckHistoryArrayForScoreBoard(deckHistoryArray);
    }, [deckHistory]);
    return <ScoreHistoryWrapper historyArr={historyArrCalc} />;
};

export default ScoreBoardBody;
