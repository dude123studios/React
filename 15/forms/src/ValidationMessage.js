import React, { useContext } from "react";
import { ValidationContext } from "./ValidationContext";

export function ValidationMessage(props) {
    const context = useContext(ValidationContext);

    return context.getMessagesForField(props.field).map((err) => (
        <div className="small bg-danger text-white mt-1 p-1" key={err}>
            {err}
        </div>
    ));
}
