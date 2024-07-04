import React from "react";

const ScoreItemHeader = (props) => {
    const { id, chartTitle, sumClassName, title, pairClassName, subExtendClassName, naturalClassName, amount } = props;

    return (
        <li>
            <span className="score-item">
                {!pairClassName && !naturalClassName && <span className={id}>{chartTitle}</span>}
                {pairClassName && <span className={pairClassName} />}
                {naturalClassName && <span className={naturalClassName} />}
                {pairClassName && <sup className={subExtendClassName} />}
                <sup className={sumClassName}>{amount}</sup>
            </span>
            <small className="text-item">{title}</small>
        </li>
    );
};

export default ScoreItemHeader;
