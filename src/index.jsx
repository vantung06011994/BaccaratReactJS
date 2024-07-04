import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./App";
import { store } from "./store";

//import ChatPage from "./pages/chat-page";


const element: HTMLElement | null = document.getElementById("root");
const ConnectedApp = <App store={store} basename={"/"}></App>;
ReactDOM.render(ConnectedApp, element);
