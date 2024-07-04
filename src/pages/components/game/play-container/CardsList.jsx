import { get, isArray, isEmpty } from "lodash";

import { CARD_FACE } from "../../../../constraints/CardConst";
import CardsItem from "./CardsItem";
import React from "react";
import { calcPoint } from "../../../../utils/index";
import { connect } from "react-redux";
import { getCardListSelector } from "store/selector/GameSelector";

function CardsList(props) {
    const { listOrObjectCard, root_class, card_float, card_rotate, card_result } = props;
    const listCard = React.useMemo(() => {
        if (!isEmpty(listOrObjectCard)) {
            return isArray(listOrObjectCard) ? listOrObjectCard : [listOrObjectCard];
        }
        return [];
    }, [listOrObjectCard]);
    return (
        listCard.length > 0 && (
            <div className={root_class}>
                {listCard.map((item, index) => (
                    <div key={index} className="clean-card">
                        <div className={index === 2 ? card_float + card_rotate : card_float}>
                            <CardsItem class_name={get(CARD_FACE, [item.face, "class_name"])} value={item.value} />
                        </div>
                    </div>
                ))}
                <div className={card_result}>{calcPoint(listCard)}</div>
            </div>
        )
    );
}
const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        listOrObjectCard: get(getCardListSelector(state), [ownProps.id, "Card"]),
    };
};
export default connect(mapStateToProps)(CardsList);
