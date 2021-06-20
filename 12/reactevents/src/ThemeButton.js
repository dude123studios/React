import React, { Component } from "react";

export class ThemeButton extends Component {
    handleClick = (event, capturePhase = false) => {
        console.log(
            `ThemeButton: Type: ${event.type} ` +
                `Target: ${event.target.tagName} ` +
                `CurrentTarget: ${event.currentTarget.tagName}`
        );
        if (capturePhase) {
            console.log("Skipped function prop: Capture Phase");
            if (this.props.theme === "danger") {
                event.stopPropogation();
                console.log("Stopped event");
            }
        } else if (event.bubbles && event.currentTarget !== event.target) {
            console.log("Sipped function prop: bubble phase");
        } else {
            console.log("Invoked function prop");
            this.props.callback(this.props.theme);
        }
    };

    render() {
        return (
            <span
                className="m-1"
                onClick={this.handleClick}
                onClickCapture={(e) => this.handleClick(e, true)}
            >
                <button
                    className={`btn btn-${this.props.theme}`}
                    onClick={this.handleClick}
                >
                    Select {this.props.theme} Theme
                </button>
            </span>
        );
    }
}
