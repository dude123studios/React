import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";

export class ToggleLink extends Component {
    handleClick = (history) => {
        history.push(this.props.to);
    };

    render() {
        return (
            <Route
                path={this.props.to}
                exact={this.props.exact}
                children={(routeProps) => {
                    const baseClasses =
                        this.props.className || "m-2 btn btn-clock ";
                    const activeClass = this.props.activeClass || "btn-primary";
                    const inActiveClass =
                        this.props.inActiveClass || "btn-secondary";

                    const combinedClasses = `${baseClasses} ${
                        routeProps.match ? activeClass : inActiveClass
                    }`;

                    return (
                        <>
                            <button
                                className={combinedClasses}
                                onClick={() =>
                                    this.handleClick(routeProps.history)
                                }
                            >
                                {this.props.children}
                            </button>
                        </>
                    );
                }}
            />
        );
    }
}
