import React from "react";
import { formatNumber } from "utils";
import { useSelector } from "react-redux";
import { userSessionSelector } from "store/selector/GameSelector";

const SectionLimit = () => {
    const [minSide, setMinSide] = React.useState(1);
    const [maxSide, setMaxSide] = React.useState(30);
    const [minTie, setMinTie] = React.useState(1);
    const [maxTie, setMaxTie] = React.useState(60);
    const [minBet, setMinBet] = React.useState(5);
    const [maxBet, setMaxBet] = React.useState(300);

    const { userSession } = useSelector((state) => ({
        userSession: userSessionSelector(state),
    }));

    React.useEffect(() => {
        setMinSide(userSession.minSide);
        setMaxSide(userSession.maxSide);
        setMinTie(userSession.minTie);
        setMaxTie(userSession.maxTie);
        setMinBet(userSession.minBet);
        setMaxBet(userSession.maxBet);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const LineLimit = (props) => {
        const { title, minBet, maxBet } = props;
        return (
            <li>
                <span className="float-left col-33">{title} </span>
                <span className="text-secondary col-33">${minBet}</span>
                <span className="float-right text-primary col-33">${formatNumber(maxBet)}</span>
            </li>
        );
    };

    return (
        <ul className="col col-50">
            <li className="text-center">LIMITS</li>
            <LineLimit title="REG" minBet={minBet} maxBet={formatNumber(maxBet)} />
            <LineLimit title="TIE" minBet={minTie} maxBet={formatNumber(maxTie)} />
            <LineLimit title="SIDE" minBet={minSide} maxBet={formatNumber(maxSide)} />
        </ul>
    );
};

export default SectionLimit;
