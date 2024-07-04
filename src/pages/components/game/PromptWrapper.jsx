import React, { useEffect } from "react";

import { Prompt } from "react-router-dom";

export function withPromptWrapper(Component) {
    return function PromptWrapper({ ...props }) {
        useEffect(() => {
            onbeforeunload = (e) => "Are you sure want to leave game";
            const pagehideFunc = (e) => "Are you sure want to leave game";
            const preventDefaultFunc = (event) => event.preventDefault();
            // document.addEventListener("contextmenu", preventDefaultFunc);
            window.addEventListener("pagehide", pagehideFunc);
            document.addEventListener("beforeunload", pagehideFunc);
            return () => {
                //componentWillUnmount
                onbeforeunload = null;
                document.removeEventListener("contextmenu", preventDefaultFunc);
                window.removeEventListener("pagehide", pagehideFunc);
                document.removeEventListener("beforeunload", pagehideFunc);
            };
        }, []);
        return (
            <React.Fragment>
                <Prompt when={true} message={"Are you sure want to leave game?"} />
                <Component {...props} />
            </React.Fragment>
        );
    };
}
