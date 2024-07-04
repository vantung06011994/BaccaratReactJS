import AutoBet from "./auto-bet/index";
import BlockMessage from "./block-message/index";
import ChipsMenu from "./chips-menu/index";
import ModalHandleMessageBox from "./modal/ModalHandleMessageBox";
import Panels from "./panels/index";
import PlayContainer from "./play-container/index";
import React from "react";
import TopMenu from "./top-menu/index";
import { withPromptWrapper } from "./PromptWrapper";

const GameContainerComponent = () => {
    return (
        <div id="body-baccarat" className="hide-default noselect" style={{ display: "block" }}>
            <div className="full-container">
                <TopMenu></TopMenu>
                {/*end top menu */}
                <Panels></Panels>
                <PlayContainer></PlayContainer>
                <ChipsMenu></ChipsMenu>
                {/*chips menu mobile */}
                <AutoBet></AutoBet>
            </div>
            <BlockMessage></BlockMessage>
            <ModalHandleMessageBox></ModalHandleMessageBox>
        </div>
    );
};

const GameContainer = withPromptWrapper(GameContainerComponent);
export default GameContainer;
