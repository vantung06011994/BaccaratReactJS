import BetSide from "./BetSide";
import React from "react";
import { betside_options } from "constraints/BetSideConst";

export default function PlayerChoose() {
    return (
        <div className="player-choose row">
            <BetSide {...betside_options.panda}></BetSide>
            <div className="col col-33">
                <BetSide {...betside_options.player} />
            </div>
            <div className="col col-33">
                <BetSide {...betside_options.tie} />
            </div>
            <div className="col col-33">
                <BetSide {...betside_options.banker} />
            </div>
            <BetSide {...betside_options.dragon}></BetSide>
        </div>
    );
}
