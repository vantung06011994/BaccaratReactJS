import Stomp from "stompjs";

const url = "ws://localhost:8080/broadcast";
const stompClient = Stomp.client(url);
//Stomp.overWS("ws://echo.websocket.org");
export function disconnectWs(callback) {
    stompClient.disconnect(callback);
}
export function sendMessage(message: string) {
    stompClient.send(message);
    /*stompClient.send(URL_SEND_TO_MAP.concat(getStorage("channel")),
					getWsHeaders(), message);*/
}
export function onMessage(callback) {
    // stompClient.subscribe(URL_SUBSCRIBE.concat(channel),
    // callback, getWsHeaders());
}
export default stompClient;
// var WebsocketModule = (function() {
// 	var stompClient;
// 	var channel;

// 	function getWsHeaders() {
// 		return {
// 			token : getStorage("token"),
// 			channel : getStorage("channel")
// 		};
// 	}

// 	function connectWsBettor() {
// 		stompClient = Stomp.client(URL_ENDPOINT);
// 		if (!DEBUG) {
// 			stompClient.debug = null;
// 		}
// 		stompClient.connect(getWsHeaders(), successWebsocket, failWebsocket);
// 	}

// 	function successWebsocket(frame) {
// 		channel = getStorage("channel");
// 		stompClient.subscribe(URL_SUBSCRIBE.concat(channel),
// 				processMessageUserSession, getWsHeaders());
// 	}

// 	function handleActionResponse(msgBody) {
// 		let action = getValueOfJsonByKey(msgBody, 'action');
// 		if (!action)
// 			return;

// 		if (action == TIP_ACTION) {
// 			tipActionResponse(msgBody);
// 		}

// 		if (action == RESULT_ACTION) {
// 			resultActionResponse(msgBody);
// 		}

// 		if (action == KICK_ACTION || action == DISCONNECT_ACTION) {
// 			kickActionResponse(msgBody);
// 		}
// 	}

// 	function sendMessage(message) {
// 		try {
// 			message = JSON.stringify(message);
// 			stompClient.send(URL_SEND_TO_MAP.concat(getStorage("channel")),
// 					getWsHeaders(), message);
// 		} catch (e) {
// 			throw "This is not json object";
// 		}
// 	}

// 	function getStompClient() {
//         return stompClient
//     }
