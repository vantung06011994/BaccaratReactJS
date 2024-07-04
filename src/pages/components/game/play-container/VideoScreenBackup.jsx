import { hiddenIdElement, showIdElement } from "utils";

import React from "react";
import { StreamRelay } from "utils/StreamRelay.min";
import { streamSelector } from "store/selector/UserSelector";
import { useSelector } from "react-redux";

function handleErrorStream(streamURL, checkError) {
    if (window.disconnectStream) window.errorStream = false;
    if (window.errorStream) window.disconnectStream = false;
    if (checkError) return;
    setTimeout(function () {
        startStream(streamURL);
    }, 5000);
}

function startStream(streamURL) {
    if (hiddenIdElement("video")) return;
    if (showIdElement("video_stream")) return;
    return new StreamRelay(
        streamURL,
        function () {
            if (window.errorStream === undefined) window.errorStream = true;
            handleErrorStream(streamURL, window.disconnectStream);
        },
        function () {
            if (window.disconnectStream === undefined) window.disconnectStream = true;
            handleErrorStream(streamURL, window.errorStream);
        },
    );
}
const VideoScreenComponent = () => {
    const streamURL = useSelector(streamSelector);
    React.useEffect(() => {
        let streamObject = null;
        if (streamURL && streamURL !== "") {
            streamObject = startStream(streamURL);
        }
        //component unmount
        return () => {
            if (streamObject) {
                streamObject.close();
            }
        };
    }, [streamURL]);

    window.addEventListener("offline", () => {
        handleErrorStream(streamURL, false);
    });

    return (
        <React.Fragment>
            <canvas id="video" style={{ width: "100%" }} width={458} height={257} />
            <div id="video_stream" style={{ width: "100%", height: "200px", display: "none" }}>
                <h2 style={{ marginTop: "20%", textAlign: "center" }}> VIDEO CONNECTING... </h2>
            </div>
        </React.Fragment>
    );
};

export default VideoScreenComponent;
