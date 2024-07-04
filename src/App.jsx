import * as React from "react";

import AddAudios from "utils/BaccaratAudioNew";
import Auth from "./auth/Auth";
import AuthGuard from "./auth/AuthGuard";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import Routes from "./routes/Routes";
import history from "routes/history";

const App = (props) => {
    return (
        <>
            <AddAudios />
            <Provider store={props.store}>
                <Auth>
                    <Router history={history}>
                        <AuthGuard>
                            <React.Suspense fallback={<b>loading...Suspense</b>}>
                                <Routes></Routes>
                            </React.Suspense>
                        </AuthGuard>
                    </Router>
                </Auth>
            </Provider>
        </>
    );
};

export default App;
