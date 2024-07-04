import { customPopupMessageSelector, disconnectMessageSelector } from "store/selector/GameSelector";
import {getPopUpText, getPopupTextJokerReached, getPopupTextTip} from "../../../../constraints/TextConst";
import { useDispatch, useSelector } from "react-redux";

import { ACTION_MSG_HEADER } from "../../../../core/domain/game/GameCodes";
import ModalWrapper from "./ModalWrapper";
import React from "react";
import { userLogout } from "store/actions/UserAction";

function getHandleMsg(messageType, message, action, text) {    
    let title = "INFOMATION";
    let msg = "";

    if (messageType || text !== undefined) {
        switch (action) {
            case ACTION_MSG_HEADER.CHAT.id:
                title = "INFOMATION";
                // msg = getI18nKeyByCode(message) + " chatmsg";
                msg = getPopUpText(message);
                break;
            case ACTION_MSG_HEADER.KICK.id:
                title = "INFOMATION";
                // msg = getI18nKeyByCode(message) + " chatmsg";
                msg = getPopUpText(text);
                break;
            case ACTION_MSG_HEADER.BETTOR_JOKER_REACHED.id:
                title = "INFOMATION";
                // msg = TEXT_MESSAGE.JOKERREACHED.I18N_KEY;
                msg = getPopupTextJokerReached(text);
                break;
            case ACTION_MSG_HEADER.TIP.id:
                title = "INFOMATION";
                // msg = TEXT_MESSAGE.JOKERREACHED.I18N_KEY;
                msg = getPopupTextTip(text);
                break;
            default:
                if (text !== 100) {
                    msg = getPopUpText(text);
                }
                break;
        }
    }
    return {
        title: title,
        msg: msg,
    };
}

export default function ModalHandleMessageBox() {
    const dispatch = useDispatch();
    const { messageType, message, action, text, type, customPopupMessage, disconnectMessage } = useSelector((state) => ({
    
        messageType: state.game.socketData?.messageType,
        message: state.game.socketData?.message,
        action: state.game.socketData?.action,
        text: state.game.socketData?.text,
        type: state.user.type,
        customPopupMessage: customPopupMessageSelector(state),
        disconnectMessage: disconnectMessageSelector(state),
    }));
    
    const [show, setShow] = React.useState({
        isShow: true,
        title: "INFOMATION",
        mgs: "You are playing for " + type + ". Click x to start playing now.",
    });
    React.useEffect(() => {      
        const decodeMsg = customPopupMessage === "" ? getHandleMsg(messageType, message, action, text) : getHandleMsg(messageType, message, action, customPopupMessage);
        if (decodeMsg.msg.length > 0) {
            setShow({
                isShow: true,
                title: decodeMsg.title,
                mgs: decodeMsg.msg,
            });
        }

        if (action === ACTION_MSG_HEADER.KICK.id || action === ACTION_MSG_HEADER.DISCONNECT.id || disconnectMessage === ACTION_MSG_HEADER.DISCONNECT.id) {
            setTimeout(() => {
                dispatch(userLogout());
            }, 2000);
            return;
        }

        
        
    }, [messageType, message, action, text, customPopupMessage, disconnectMessage, dispatch]);
    const handleClose = React.useCallback(
        (k) => {
            setShow({ ...show, isShow: false });
        },
        [show],
    );
    return (
        <ModalWrapper modalTitle={show.title} idRef="modalShowMessage" show={show.isShow} handleClose={handleClose}>
            <div className="row">
                <p>{show.mgs}</p>
            </div>
        </ModalWrapper>
    );
}
