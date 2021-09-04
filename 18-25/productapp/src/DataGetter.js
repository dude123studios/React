import React, { Component } from "react";
import { PRODUCTS, SUPPLIERS } from "./store/dataTypes";

export const DataGetter = (dataType, WrappedContent) => {
    return class extends Component {
        render() {
            return <WrappedContent {...this.props} />;
        }

        componentDidMount() {
            console.log("owo");
            this.props.getData(PRODUCTS);
            if (dataType === SUPPLIERS) {
                this.props.getData(SUPPLIERS);
            }
        }
    };
};
