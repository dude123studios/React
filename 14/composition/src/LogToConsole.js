import React, { Component } from "react";

export function LogToConsole(
    FeatureComponent,
    label,
    logMount = false,
    logRender = false,
    logUnmount = false
) {
    return class extends Component {
        componentDidMount() {
            if (logMount) {
                console.log(`${label}: mount`);
            }
        }

        componentWillUnmount() {
            if (logUnmount) {
                console.log(`${label}: unmount`);
            }
        }

        render() {
            if (logRender) {
                console.log(`${label}: render`);
            }
            return <FeatureComponent {...this.props} />;
        }
    };
}
