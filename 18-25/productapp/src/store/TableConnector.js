import { connect } from "react-redux";
import { startEditingProduct, startEditingSupplier } from "./stateActions";
import { deleteProduct } from "./modelActionCreators";
import { PRODUCTS, SUPPLIERS } from "./dataTypes";
import { deleteSupplier } from ".";

export const TableConnector = (dataType, presentationComponent) => {
    const mapStateToProps = (storeData) => ({
        products: storeData.modelData[PRODUCTS],
        suppliers: storeData.modelData[SUPPLIERS],
    });

    const mapDispatchToProps = {
        editCallback:
            dataType === PRODUCTS ? startEditingProduct : startEditingSupplier,
        deleteCallback: dataType === PRODUCTS ? deleteProduct : deleteSupplier,
    };

    return connect(mapStateToProps, mapDispatchToProps)(presentationComponent);
};
