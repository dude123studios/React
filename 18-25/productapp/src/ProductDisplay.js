import React, { Component } from "react";
import { ProductTable } from "./ProductTable";
import { ProductEditor } from "./ProductEditor";
import { connect } from "react-redux";
import { EditorConnector } from "./store/EdiorConnector";
import { PRODUCTS } from "./store/dataTypes";
import { TableConnector } from "./store/TableConnector";
import { startCreatingProduct } from "./store/stateActions";

const ConnectedEditor = EditorConnector(PRODUCTS, ProductEditor);
const ConnectedTable = TableConnector(PRODUCTS, ProductTable);

const mapStateToProps = (storeData) => ({
    editing: storeData.stateData.editing,
    selected: storeData.selectedId || null,
});

const mapDispatchToProps = {
    createProduct: startCreatingProduct,
};

const connectFunction = connect(mapStateToProps, mapDispatchToProps);

export const ProductDisplay = connectFunction(
    class extends Component {
        render() {
            if (this.props.editing) {
                return <ConnectedEditor key={this.props.selected || -1} />;
            } else {
                return (
                    <div className="m-2">
                        <ConnectedTable />
                        <div className="text-center">
                            <button
                                className="btn btn-primary m-1"
                                onClick={this.props.createProduct}
                            >
                                Create Product
                            </button>
                        </div>
                    </div>
                );
            }
        }
    }
);
