import CanvasImage from "./CanvasImageComponent";
import React from "react";
import StreamRelayReconnect from "../../../../utils/stream-relay-reconnect";
import { streamSelector } from "../../../../store/selector/UserSelector";
import { useSelector } from "react-redux";

const VideoScreenComponent = () => {
    const streamURL = useSelector(streamSelector);
    const [imageState, setImageState] = React.useState({ url: "", image: null, hasImage: false });
    React.useEffect(() => {
        let streamObject = null;
        let processingOfflineMod = null;
        if (streamURL && streamURL !== "") {
            streamObject = new StreamRelayReconnect(streamURL);
            streamObject.onGetImageUrl((imgCallback) => {
                var t = new Image();
                t.onload = () => {
                    setImageState({
                        hasImage: true,
                        imageObject: t,
                    });
                    URL.revokeObjectURL(t.src);
                };
                t.src = URL.createObjectURL(imgCallback);
            });
            processingOfflineMod = () => {
                setImageState({ imageObject: null, hasImage: false });
                streamObject.reconnectStream();
            };
            window.addEventListener("offline", processingOfflineMod);
        }
        return () => {
            if (streamObject) {
                window.removeEventListener("offline", processingOfflineMod);
                streamObject.closeStream();
            }
        };
    }, [streamURL]);

    return (
        <React.Fragment>
            {imageState.hasImage ? (
                <CanvasImage image={imageState}></CanvasImage>
            ) : (
                <div style={{ width: "100%", height: "200px" }}>
                    <h2 style={{ marginTop: "20%", textAlign: "center" }}> VIDEO CONNECTING... </h2>
                </div>
            )}
        </React.Fragment>
    );
};

export default VideoScreenComponent;
