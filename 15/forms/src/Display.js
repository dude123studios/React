import React, { useState } from "react";

export function Display(props) {
    const formatValue = (data) =>
        Array.isArray(data) ? data.join(", ") : data.toString();

    const keys = Object.keys(props.data);
    if (keys.length === 0) {
        return <div className="h5 bg-secondary p-2 text-white">No data</div>;
    } else {
        return (
            <div className="container-fluid bg-secondary p-2">
                {keys.map((key) => (
                    <div key={key} className="row h5 text-white">
                        <div className="col">{key}</div>
                        <div className="col">
                            {formatValue(props.data[key])}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}
