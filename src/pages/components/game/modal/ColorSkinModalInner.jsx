import React from "react";

export default function ColorSkinModalInner() {
    return (
        <div className="row">
            <div className="col col-33 text-center">
                <i className="font-icon icon-adjust" style={{ color: "#c21818" }} /> <span>RED*</span>
            </div>
            <div className="col col-33 text-center">
                <i className="font-icon icon-adjust" style={{ color: "#03A9F4" }} /> <span>BLUE*</span>
            </div>
            <div className="col col-33 text-center">
                <i className="font-icon icon-adjust" style={{ color: "#ccc" }} /> <span>GRAY*</span>
            </div>
        </div>
    );
}
