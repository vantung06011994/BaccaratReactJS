import React from "react";

function CollapseContent(props) {
    const { show } = props;
    return (
        <div className="collapse" style={{display: show ? 'block' : 'none' }}>
            {props.children}
        </div>
    );
}

export default function HelpModalInner() {

    const [toggle, setToggle] = React.useState({
        isObjectiveShow: false,
        isHowToPlayShow: false,
        isWinningConditionShow: false,
        isThirdCardShow: false,
        isPayOutsShow: false,
    });

    const handleToggle = React.useCallback(
        (e, k) => {
            e.preventDefault();
            setToggle({ ...toggle, [k]: !toggle[k] });
        },
        [toggle],
    );

    return (
        <div className="row">
            <ul className="w-100">
                <li>
                    <div className="dropdown" onClick={(e) => handleToggle(e, "isObjectiveShow")}>
                        <i className="font-icon icon-down-open" /> Objective
                    </div>
                    <CollapseContent show={toggle.isObjectiveShow}>
                        <p>
                            In Live Baccarat, the player places bets to predict which of the two hands (Player and
                            Banker) will win.
                        </p>
                    </CollapseContent>
                </li>
                <li>
                    <div className="dropdown" onClick={(e) => handleToggle(e, "isHowToPlayShow")}>
                        <i className="font-icon icon-down-open" /> How to Play
                    </div>
                    <CollapseContent show={toggle.isHowToPlayShow}>
                        <h4>BETTING:</h4>
                        <p>The player selects betting chips and places them in the PLAYER, TIE or BANKER slots.</p>
                        <p>Bet amounts are limited by MAX BET and MIN BET.</p>
                        <h4>PLAYING:</h4>
                        <p>Each hand is dealt 2 cards.</p>
                        <p>Numbered cards have face value. 10, J, Q and K are counted as 0. Aces are counted as 1.</p>
                        <p>
                            If the total points of a hand exceed 10, only the last digit is considered. Hence, 9 is the
                            highest possible.
                        </p>
                        <p>A third card may be dealt to each hand (see The Third Card).</p>
                    </CollapseContent>
                </li>
                <li>
                    <div className="dropdown" onClick={(e) => handleToggle(e, "isWinningConditionShow")}>
                        <i className="font-icon icon-down-open" /> Winning Conditions
                    </div>
                    <CollapseContent show={toggle.isWinningConditionShow}>
                        <p>The hand with the higher points wins. If they are equal, it is a tie.</p>
                    </CollapseContent>
                </li>
                <li>
                    <div className="dropdown" onClick={(e) => handleToggle(e, "isThirdCardShow")}>
                        <i className="font-icon icon-down-open" /> The Third Card
                    </div>
                    <CollapseContent show={toggle.isThirdCardShow}>
                        <p>
                            A third card may be dealt to each hand according to these rules which the player need not
                            memorize:
                        </p>
                        <p>
                            1. If either the player's or banker's two-card hand has a total of 8 or 9 points, the hand
                            is called a natural and no more card is dealt.
                        </p>
                        <p>2. If the player's hand is below 6, a third card is dealt to the player.</p>
                        <p>
                            3. If no third card is dealt to the player, the banker stands on 6 and above and gets a
                            third card on 5 or less.
                        </p>
                        <p>4. If a third card is dealt to the player, the banker follows these rules:</p>
                        <p>4.1. On 2 or less, the banker draws a third card.</p>
                        <p>4.2. On 3, the banker draws a third card unless the player's third card is an 8.</p>
                        <p>
                            4.3. On 4, the banker draws a third card unless the player's third card is a 0, 1, 8, or 9.
                        </p>
                        <p>4.4. On 5, the banker draws a third card if the player's third card is 4, 5, 6, or 7.</p>
                        <p>4.5. On 6, the banker draws a third card if the player's third card is a 6 or 7.</p>
                        <p>4.6. On 7, the banker stands.</p>
                    </CollapseContent>
                </li>
                <li className="last-dropdown padding-bottom">
                    <div className="dropdown" onClick={(e) => handleToggle(e, "isPayOutsShow")}>
                        <i className="font-icon icon-down-open" /> Pay-Outs
                    </div>
                    <CollapseContent show={toggle.isPayOutsShow}>
                        <p>Baccarat pays 1 to 1, except the TIE bet which pays 8 to 1.</p>
                        <p>There's a 5% commission for all winning bets on the Banker hand.</p>
                    </CollapseContent>
                </li>
                {/* <li className="dropdown">
                    <div className="dropdown">
                        <i className="font-icon icon-down-open"></i> Hotkeys
                    </div>
                    <div className="collapse">
                        <ul>
                            <li>1-5 - Select betting chips $1-$500</li>
                            <li>Up - Switch between betting chips</li>
                            <li>Left/ Right/ Down - Place bet at left, right or middle slot</li>
                            <li>Space - Place same bet</li>
                            <li>Esc - Exit</li>
                        </ul>
                    </div>
                </li> */}
            </ul>
        </div>
    );
}
