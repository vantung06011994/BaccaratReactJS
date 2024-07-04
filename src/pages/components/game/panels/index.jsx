import { InfoLineBalanceHook, InfoLineGameIDHook } from "./InfoLine";

import BoxGameProgress from "../box/BoxGameProgress";
import BoxLayout from "../box/BoxLayout";
import BoxScoreboard from "../box/BoxScoreBoard";
import BoxScoreboardMobile from "../box/BoxScoreboardMobile";
import BoxSummary from "../box/BoxSummary";
import BoxTableData from "../box/BoxTableData";
import Dealer from "../dealer";
import React from "react";
import { SummaryLayoutHoc } from "../box/BoxLayout";
import VideoScreenComponent from "../play-container/VideoScreenBackup";

export default function Panels() {
    return (
        <div className="row panels">
            <div className="left col col-25 p-x desktop">
                <InfoLineBalanceHook
                    wrapperClassName="balance-amount"
                    title="BALANCE: "
                    innerClassName="text-primary balance-response"
                    money
                />
                <SummaryLayoutHoc
                    title={"Summary: "}
                    boxClassName={"summary"}
                    boxTitleClassName={"username text-secondary"}
                >
                    <BoxSummary />
                </SummaryLayoutHoc>

                <InfoLineGameIDHook
                    wrapperClassName="game-id"
                    title="Game ID: "
                    innerClassName="game-id-display text-primary"
                />

                <BoxLayout
                    title={"Table Limit"}
                    titleContent={"$5 | $300"}
                    boxClassName={"box table-data m-y"}
                    boxTitleClassName={"table-limit"}
                >
                    <BoxTableData />
                </BoxLayout>
            </div>
            <div className="video center col col-50 p-all">
                <div className="video-container">
                    <VideoScreenComponent></VideoScreenComponent>
                </div>
                <InfoLineGameIDHook
                    wrapperClassName="game-id mobile"
                    h2ClassName="float-left"
                    title="Game ID: "
                    innerClassName="game-id-display text-primary"
                />

                <div className="game-progress mobile">
                    <BoxGameProgress mobile />
                </div>
                <Dealer></Dealer>
                <BoxScoreboardMobile />
            </div>
            <div className="right col col-25 p-x desktop">
                <BoxLayout
                    title={"Game"}
                    titleContent={"Progress"}
                    boxClassName={"box game-progress m-y"}
                    boxTitleClassName={"text-secondary"}
                    boxBodyClassName={"row"}
                >
                    <BoxGameProgress desktop main />
                </BoxLayout>

                <BoxScoreboard scoreboardClassName="scoreboard box desktop" scoreboardID="scoreboard-mobile-panel" />
                {/*end scoreboard */}
            </div>
        </div>
    );
}
