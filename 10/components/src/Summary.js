import React, { useState } from "react";
import { HooksButton } from "./HooksButton";
//import { CallbackButton } from "./CallbackButton";
import { SimpleButton } from "./SimpleButton";

export function Summary(props) {
    // const [counter, setCounter] = useState(0);

    // const incrementCounter = (increment) => {
    //     setCounter(counter + increment);
    // };

    return (
        <React.Fragment>
            <td>{props.index + 1}</td>
            <td>{props.name}</td>
            <td>{props.name.length}</td>
            <td>
                <SimpleButton
                    className="btn btn-warning btn-sm m-1"
                    callback={props.reverseCallback}
                    text={`Reverse (${props.name})`}
                    counter={counter}
                    incrementCallback={incrementCounter}
                    {...this.props}
                />
                <HooksButton
                    className="btn btn-info btn-sm m-1"
                    callback={() => props.promoteCallback(props.name)}
                    text={`Promote (${props.name})`}
                    counter={counter}
                    incrementCallback={incrementCounter}
                    {...this.props}
                />
            </td>
        </React.Fragment>
    );
}
