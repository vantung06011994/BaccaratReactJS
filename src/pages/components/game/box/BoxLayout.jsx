import { connect, useSelector } from "react-redux";

import React from "react";
import { formatNumber } from "utils";
import { userSessionSelector } from "store/selector/GameSelector";

const BoxLayout = (props) => {
    const { title, titleContent, boxClassName, boxBodyClassName, children, boxTitleClassName, value } = props;

    const [tableLimit, setTableLimit] = React.useState("$5 | $300");
    const userSession = useSelector(userSessionSelector);
    React.useEffect((state) => {
        setTableLimit("$" + userSession.minBet + " | $" + formatNumber(userSession.maxBet));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={"box  m-y " + boxClassName}>
            <div className="box-title">
                <h3>
                    {title}{" "}
                    <span className={boxTitleClassName}>
                        {value ? value : titleContent === "$5 | $300" ? tableLimit : titleContent}
                    </span>
                </h3>
            </div>
            <div className={"box-body " + (boxBodyClassName ? boxBodyClassName : "")}>{children}</div>
        </div>
    );
};

const mapSummaryLayoutToProps = (state, ownProps) => {
    const userSession = userSessionSelector(state);
    return {
        ...ownProps,
        value: userSession["userName"],
    };
};
export const SummaryLayoutHoc = connect(mapSummaryLayoutToProps)(BoxLayout);

export default BoxLayout;
