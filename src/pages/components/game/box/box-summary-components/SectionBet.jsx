import React from "react";
import { connect } from "react-redux";
import { get } from "lodash";
import presenter from "core/adapters/presenters/index";
import { summarySelector } from "store/selector/GameSelector";

const LineBet = (props) => {
    const { Id, value, title } = props;
    return (
        <li id={Id}>
            {title} <span className="float-right">{value}</span>
        </li>
    );
};
const mapRiskToProps = (state, ownProps) => {
    return {
        ...ownProps,
        value: state.game.totalRisk,
    };
};
const LineRiskHoc = connect(mapRiskToProps)(LineBet);

const mapWinToProps = (state, ownProps) => {
    const won = get(summarySelector(state), ["won"]) ? get(summarySelector(state), ["won"]) : 0;
    return {
        ...ownProps,
        value: presenter.game.isNewGame() ? 0 : won,
    };
};
const LineWinHoc = connect(mapWinToProps)(LineBet);

const mapLossToProps = (state, ownProps) => {
    const lost = get(summarySelector(state), ["lost"]) ? get(summarySelector(state), ["lost"]) : 0;
    return {
        ...ownProps,
        value: presenter.game.isNewGame() ? 0 : lost,
    };
};
const LineLossHoc = connect(mapLossToProps)(LineBet);

const mapNetWinToProps = (state, ownProps) => {
    return {
        ...ownProps,
        value: state.game.netWin,
    };
};
const LineNetWinHoc = connect(mapNetWinToProps)(LineBet);

const SectionBet = () => {
    return (
        <ul className="col col-50">
            <LineRiskHoc Id={"at_risk_summary"} title={"AT RISK"} />
            <LineWinHoc Id={"win_summary"} title={"WIN"} />
            <LineLossHoc Id={"loss_summary"} title={"LOSS"} />
            <LineNetWinHoc Id={"net_win_summary"} title={"NET WIN"} />
        </ul>
    );
};

export default SectionBet;
