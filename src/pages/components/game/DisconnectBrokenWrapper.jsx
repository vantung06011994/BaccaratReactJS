import React, { useEffect } from "react";
import { offDisConnectBrokenTopic, onDisConnectBrokenTopic } from "core/adapters/emiiter/BaccaratEmitter";

import { useDispatch } from "react-redux";
import { userLogout } from "store/actions/UserAction";

const DisConnectBrokenWrapper = (props) => {
    const dispatch = useDispatch();
    useEffect(() => {
        onDisConnectBrokenTopic((isBroken) => {
            dispatch(userLogout());
        });
        return () => {
            offDisConnectBrokenTopic();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <React.Fragment>{props.children}</React.Fragment>;
};

export default DisConnectBrokenWrapper;
