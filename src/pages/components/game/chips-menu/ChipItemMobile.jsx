import Chip from "./Chip";
import React from "react";

export default function ChipItemMobile(props) {
    return (
        <li className="menu-item">
            <Chip {...props} mobile></Chip>
        </li>
    );
}
