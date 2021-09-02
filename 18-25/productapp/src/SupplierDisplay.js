import React, { Component } from "react";
import { SupplierEditor } from "./SupplierEditor";
import { SupplierTable } from "./SupplierTable";
import { connect } from "react-redux";
import { TableConnector } from "./store/TableConnector";
import { EditorConnector } from "./store/EdiorConnector";
import { startCreatingSupplier } from "./store/stateActions";
import { SUPPLIERS } from "./store/dataTypes";

const mapStateToProps = (storeData) => ({
    editing: storeData.stateData.editing,
    selected: storeData.stateData.selectedId || null,
});

const mapDispatchToProps = {
    createSupplier: startCreatingSupplier,
};

const ConnectedTable = TableConnector(SUPPLIERS, SupplierTable);
const ConnectedEditor = EditorConnector(SUPPLIERS, SupplierEditor);

const connectFunction = connect(mapStateToProps, mapDispatchToProps);

export const SupplierDisplay = connectFunction(
    class extends Component {
        render() {
            if (this.props.editing) {
                return <ConnectedEditor key={this.props.selected || -1} />;
            } else {
                return (
                    <div className="m-2">
                        <ConnectedTable needSuppliers={true} />
                        <div className="text-center">
                            <button
                                className="btn btn-primary m-1"
                                onClick={this.props.createSupplier}
                            >
                                Create Supplier
                            </button>
                        </div>
                    </div>
                );
            }
        }
    }
);
