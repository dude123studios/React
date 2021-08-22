import React, { useState, useContext } from "react";
import { ProModeContext } from "./ProModeContext";

export function ActionButton(props) {
    const context = useContext(ProModeContext);

    const [clickCount, setClickCount] = useState(0);

    const handleClick = () => {
        setClickCount(clickCount + 1);
        props.callback();
    };

    const getClasses = () => {
        let col = context.proMode ? props.theme : "danger";
        return `btn btn-${col} m-2`;
    };

    if (clickCount > 1) {
        console.log("err");
        throw new Error("Click Counter Error");
    }

    return (
        <button
            className={getClasses()}
            disabled={!context.proMode}
            onClick={handleClick}
        >
            {props.text}
        </button>
    );
}
