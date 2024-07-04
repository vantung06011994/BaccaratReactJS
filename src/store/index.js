import { applyMiddleware, createStore } from "redux";
import rootReducer, { initialState } from "./reducers";

import { DEBUG_ON } from "globalconfig";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas";

//import { persistReducer, persistStore } from "redux-persist";

//import localStorage from "redux-persist/lib/storage"; // defaults to localStorage for web

// const persistConfig = {
//     key: "non-persisted",
//     storage: localStorage,
//     whitelist: ["whitelistReducer"],
//     blacklist: ["rootReducer"],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [];
const sagaMiddleware = createSagaMiddleware();
middleware.push(sagaMiddleware);
// eslint-disable-next-line no-undef
// if (process.env.NODE_ENV !== "production") {
//     middleware.push(createLogger());
// }

if (DEBUG_ON) {
    middleware.push(createLogger());
}
const composeEnhancer = composeWithDevTools({
    name: "Redux live baccarat",
});
export const store: any = createStore(rootReducer, initialState, composeEnhancer(applyMiddleware(...middleware)));
sagaMiddleware.run(rootSaga);

// export const persistor = persistStore(store);
