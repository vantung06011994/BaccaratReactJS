import { displayBlock, displayNone } from "./../../../../utils/Style";

import ColorSkinModalInner from "../modal/ColorSkinModalInner";
import HelpModalInner from "../modal/HelpModalInner";
import HistoryModalInner from "../modal/HistoryModalInner";
import { InfoLineBalanceHook } from "../panels/InfoLine";
import { Link } from "react-router-dom";
import ModalWrapper from "../modal/ModalWrapper";
import { ROUTE_PATH } from "routes/RoutePath";
import React from "react";
import RulesModalInner from "../modal/RulesModalInner";
import baccaratAudio from "../../../../utils/BaccaratAudio";

export default function TopMenu() {
    const [mute, setMute] = React.useState(false);
    const [showMenuPanel, setShowMenuPanel] = React.useState(false);
    const [show, setShow] = React.useState({
        isColorSkinShow: false,
        isHelpShow: false,
        isRulesShow: false,
        isHistoryShow: false,
    });
    const handleClose = React.useCallback(
        (k) => {
            setShow({ ...show, [k]: false });
        },
        [show],
    );
    const handleOpen = React.useCallback(
        (e, k) => {
            e.preventDefault();
            setShow({ ...show, [k]: true });
        },
        [show],
    );
    const ontoggleMenuPanel = (e) => {
        e.preventDefault();
        setShowMenuPanel(!showMenuPanel);
    };
    const ontoggleMute = (e) => {
        e.preventDefault();
        baccaratAudio.setIsMute(!mute);
        setMute(!mute);
    };
    return (
        <React.Fragment>
            <div className="top-menu row">
                <InfoLineBalanceHook
                    wrapperClassName="balance-amount float-left mobile"
                    title="BALANCE: "
                    innerClassName="text-primary balance-response"
                    money
                />
                <div className="options float-right">
                    <ul className="flex">
                        <li>
                            <a className="audio" href=" #" onClick={(e) => ontoggleMute(e)}>
                                <i className={"font-icon " + (mute ? "icon-volume-off" : "icon-volume")} />
                            </a>
                        </li>
                        <li>
                            <a className="settings" href=" #" onClick={(e) => ontoggleMenuPanel(e)}>
                                <i className="font-icon icon-cog" />
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="menu-panel" style={showMenuPanel ? displayBlock : displayNone}>
                    <span className="row float-right p-y">
                        <i className="icon icon-cancel close" onClick={(e) => ontoggleMenuPanel(e)} />
                    </span>
                    <ul className="row">
                        {/* <li onClick={(e) => handleOpen(e, "isColorSkinShow")}>
                            <span className="skin-color">
                                Skin Color* <i className="icon icon-adjust"></i>
                            </span>
                        </li> */}
                        <li onClick={(e) => handleOpen(e, "isHelpShow")}>
                            <span className="help">
                                Help <i className="icon icon-help-circled" />
                            </span>
                        </li>
                        <li onClick={(e) => handleOpen(e, "isRulesShow")}>
                            <span className="rules">
                                Rules <i className="icon icon-book" />
                            </span>
                        </li>
                        {/* <li onClick={(e) => handleOpen(e, "isHistoryShow")}>
                            <span className="history">
                                History* <i className="icon icon-calendar" />
                            </span>
                        </li> */}
                        <li>
                            <Link to={ROUTE_PATH.LOGOUT.URL}>
                                <span className="logout">
                                    Logout <i className="icon icon-export" />
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <ModalWrapper
                modalTitle="Change Color Skin*"
                idRef="isColorSkinShow"
                show={show.isColorSkinShow}
                handleClose={handleClose}
            >
                <ColorSkinModalInner></ColorSkinModalInner>
            </ModalWrapper>
            <ModalWrapper modalTitle="Help" idRef="isHelpShow" show={show.isHelpShow} handleClose={handleClose}>
                <HelpModalInner></HelpModalInner>
            </ModalWrapper>
            <ModalWrapper modalTitle="Rules" idRef="isRulesShow" show={show.isRulesShow} handleClose={handleClose} childClass="rules-modal-inner">
                <RulesModalInner></RulesModalInner>
            </ModalWrapper>
            <ModalWrapper
                modalTitle="History"
                idRef="isHistoryShow"
                show={show.isHistoryShow}
                handleClose={handleClose}
            >
                <HistoryModalInner></HistoryModalInner>
            </ModalWrapper>
        </React.Fragment>
    );
}
