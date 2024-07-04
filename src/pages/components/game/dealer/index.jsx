import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import { ACCOUNT_TYPE, defaultDealer } from "core/domain/game/GameCodes";
import { accountTypeSelector, listDealerSelector } from "store/selector/UserSelector";
import { balanceTempSelector, dealerSelector } from "store/selector/GameSelector";
import { tipDealerRequestAction, updateCustomPopupMessageAction } from "store/actions/GameAction";
import { useDispatch, useSelector } from "react-redux";

import { CDN_URL } from "core/adapters.infrastructures.config";
import { DEBUG_ON } from "globalconfig";
import React from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import { formatNumber } from "utils/index";
import { getDealer } from "core/domain/game/GameUtils";

export default function Dealer() {
    const convertToImageLink = (imgSource) => {        
        return imgSource !== "" ? CDN_URL + imgSource.replace("../", "/livecasino/game/") : "";
    };
    const [show, setShow] = React.useState(false);
    const [amount, setAmount] = React.useState(2);
    const [dealerName, setDealerName] = React.useState(defaultDealer.fullname);
    const [dealerThumb, setDealerThumb] = React.useState(convertToImageLink(defaultDealer.photoURL));
    const [dealerAge, setDealerAge] = React.useState(defaultDealer.age);
    const [canTip, setCanTip] = React.useState("disable");
    const options = {
        title: "Title",
        message: "Message",
        // eslint-disable-next-line react/display-name
        customUI: ({ onClose }) => {
            return (
              <div className='custom-ui'>
                <h1>Thank you!</h1>
                <p>You are about to tip ${amount}</p>
                <button className="cancel-button" onClick={onClose}>No</button>
                <button className="accept-button" onClick={() => {
                    dispatch(tipDealerRequestAction(amount));
                    onClose();}}
                >
                    Yes
                </button>
              </div>
            );
          }
      };

    const dispatch = useDispatch();
    const { accountType, dealerString, balanceTemp, listDealer} = useSelector((state) => ({
        accountType: accountTypeSelector(state),
        dealerString: dealerSelector(state),
        balanceTemp: balanceTempSelector(state),
        listDealer: listDealerSelector(state),
    }));
    
    const onToggleDealerPanel = (e) => {
        e.preventDefault();
        setShow(!show);
    };

    const handleChange = (e) => {
        setAmount(e.target.value);
    };

    const onTipDealer = (e) => {
        e.preventDefault();
        if (accountType === ACCOUNT_TYPE.FUN) {
            dispatch(updateCustomPopupMessageAction("cantTipDealer"));
        } else {
            confirmAlert(options);
            // dispatch(tipDealerRequestAction(amount));
        }
        setAmount(2);
        setShow(false);
    };

    React.useEffect(() => {
        if(dealerString){
            try {
                const dealerId = dealerString.split("-").shift();
                const dealerObj = getDealer(dealerId, listDealer);
                if(typeof dealerObj.photoURL !== undefined && dealerObj.photoURL !== "")
                    setDealerThumb(convertToImageLink(dealerObj.photoURL));
                if(typeof dealerObj.fullname !== undefined && dealerObj.fullname !== "")
                    setDealerName(dealerObj.fullname);            
                if(typeof dealerObj.age !== undefined && formatNumber(dealerObj.age) > 0)
                    setDealerAge(dealerObj.age);           
            }
            catch(err) {
                if (DEBUG_ON) console.log("Dealer -> " + err.message);  
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dealerString]);

    React.useEffect(() => {
        if (amount > 0 && amount <= balanceTemp){
            setCanTip("");
        } else {
            setCanTip("disable");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [amount]);

    return (
        <div className="dealer">
            <div className="btn" onClick={(e) => onToggleDealerPanel(e)}>
                <i className="font-icon icon-plus-circled" /> <img src="/images/dealer/irene.png" alt={dealerName} />
                <span className="dealer-name text-center">{dealerName}</span>
            </div>
            <div className="profile-panel" style={{ display: show ? "block" : "none" }}>
                <span className="row float-right text-right close" onClick={(e) => onToggleDealerPanel(e)}>
                    <i className="icon icon-cancel " />
                </span>
                <div className="row">
                    { dealerName !== "Dealer" ? <h4> {dealerName} {dealerAge ? " (" + dealerAge + ") " : ""}</h4> : "" }
                    { dealerThumb !== "" ? <img src={dealerThumb} alt={dealerName} /> : <h4>Thank you!</h4> }
                    <p>
                        <input
                            type="text"
                            name="tip"
                            placeholder="$$ Tip Here"
                            className="text-center"
                            value={amount}
                            onChange={(e) => handleChange(e)}
                        />
                        <input
                            disabled={canTip}
                            type="submit"
                            name="send"
                            defaultValue="SEND"
                            className="text-center tipActionSend submit"
                            onClick={(e) => onTipDealer(e)}
                        />
                    </p>
                </div>
            </div>
        </div>
    );
}
