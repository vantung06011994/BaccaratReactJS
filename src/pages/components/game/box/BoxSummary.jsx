import React, { Component } from "react";

import SectionBet from "./box-summary-components/SectionBet";
import SectionLimit from "./box-summary-components/SectionLimit";

class BoxSummary extends Component {
    render() {
        return (
            <div className="row">
                <SectionBet />
                <SectionLimit />
            </div>
        );
    }
}

export default BoxSummary;
