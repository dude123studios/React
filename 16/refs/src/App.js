import React, { useState, useRef } from "react";
import { ForwardFormField } from "./FormField";
import { PortalWrapper } from "./PortalWrapper";

export default function App(props) {
    const fieldRef = useRef(null);
    const portalFieldRef = useRef(null);

    const focusLocal = () => {
        fieldRef.current.focus();
    };

    const focusPortal = () => {
        portalFieldRef.current.focus();
    };

    return (
        <div className="m-2">
            <PortalWrapper>
                <ForwardFormField label="Name" ref={portalFieldRef} />
            </PortalWrapper>
            <ForwardFormField label="Name" ref={fieldRef} />
            <div className="text-center m-2">
                <button className="btn btn-primary m-1" onClick={focusLocal}>
                    Focus Local
                </button>
                <button className="btn btn-primary m-1" onClick={focusPortal}>
                    Focus Portal
                </button>
            </div>
        </div>
    );
}
