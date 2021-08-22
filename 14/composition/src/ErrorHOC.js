import React, { Component } from "react";

export function ErrorHOC(FeatureComponent) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                errorThrown: false,
            };
        }

        componentDidCatch = (error, info) =>
            this.setState({ errorThrown: true });

        render() {
            return (
                <React.Fragment>
                    {this.state.errorThrown && (
                        <h3 className="bg-danger text-white text-center m-2 p-2">
                            {this.props.errorMessage}
                        </h3>
                    )}
                    <FeatureComponent {...this.props} />
                </React.Fragment>
            );
        }
    };
}
