import React, { useState } from "react";

let themes = ["primary", "secondary", "success", "warning", "dark"];

export function ThemeSelector(props) {
    const [theme, setTheme] = useState("primary");
    const [reverseChildren, setReverseChildren] = useState(false);

    const updateTheme = (event) => {
        setTheme(event.target.value);
    };

    const toggleReverse = () => {
        setReverseChildren(!reverseChildren);
    };

    let modChildren = React.Children.map(props.children, (c) =>
        React.cloneElement(c, { theme })
    );

    if (reverseChildren) {
        modChildren.reverse();
    }

    return (
        <div className="bg-dark p-2">
            <button className="btn btn-primary" onClick={toggleReverse}>
                Reverse
            </button>
            <div className="form-group text-left">
                <label className="text-white">Theme:</label>
                <select
                    className="form-control"
                    value={theme}
                    onChange={updateTheme}
                >
                    {themes.map((theme) => (
                        <option key={theme} value={theme}>
                            {theme}
                        </option>
                    ))}
                </select>
            </div>
            <div className="bg-info p-2">{modChildren}</div>
        </div>
    );
}
