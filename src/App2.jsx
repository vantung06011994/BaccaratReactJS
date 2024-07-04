import * as React from "react";

import { suma } from "./utils";

export default function App2(props: { s: number }): JSX.Element {
    const [state, setState] = React.useState(0);
    const decement = React.useCallback(() => {
        setState(state - 1);
    }, [state]);

    const increment = React.useCallback(() => {
        setState(state + 1);
    }, [state]);

    React.useEffect(() => {
        setState(suma(state));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // const increment = a;
    return (
        <>
            <h1>{state}</h1>
            <button onClick={decement}>decement</button>
            <button onClick={increment}>increment</button>
        </>
    );
}
