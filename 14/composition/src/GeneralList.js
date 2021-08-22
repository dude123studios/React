import React from "react";

export function GeneralList(props) {
    return (
        <div className={`bg-${props.theme} text-white p-2`}>
            {props.list.map((item, index) => (
                <div key={item}>
                    {index + 1}: {item}
                </div>
            ))}
        </div>
    );
}
