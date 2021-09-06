import React, { Component } from "react";

export const DataGetter = (dataType, WrappedContent) => {
    return class extends Component {
        render() {
            return <WrappedContent {...this.props} />;
        }

        componentDidMount() {
            this.props.getData(dataType);
        }
    };
};
