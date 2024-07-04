import React from "react";

export default function BlockMessage() {
    return (
        <>
            <div className="block-message landscape">
                <img src="images/icon/rotate-to-portrait.svg" alt="images/icon/rotate-to-portrait.svg" />
                <h2 className="text-white">Please rotate your device to portrait*</h2>
            </div>
            <div className="block-message portrait">
                <img src="images/icon/rotate-to-landscape.svg" alt="images/icon/rotate-to-portrait.svg" />
                <h2 className="text-white">Please rotate your device to landscape*</h2>
            </div>
        </>
    );
}
