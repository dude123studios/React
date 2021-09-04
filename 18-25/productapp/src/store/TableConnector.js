import { connect } from "react-redux";
import { deleteProduct } from "./modelActionCreators";
import { PRODUCTS, SUPPLIERS } from "./dataTypes";
import { deleteSupplier } from ".";
import { withRouter } from "react-router-dom";
import { DataGetter } from "../DataGetter";
import { getData } from "../webservice/RestMiddleware";

export const TableConnector = (dataType, presentationComponent) => {
    const mapStateToProps = (storeData, ownProps) => {
        if (dataType === PRODUCTS) {
            return { products: storeData.modelData[PRODUCTS] };
        } else {
            return {
                suppliers: storeData.modelData[SUPPLIERS].map((supp) => ({
                    ...supp,
                    products: supp.products
                        .map(
                            (id) =>
                                storeData.modelData[PRODUCTS].find(
                                    (p) => p.id === Number(id)
                                ) || id
                        )
                        .map((val) => val.name || val),
                })),
            };
        }
    };

    //Can only include dispatchable methods here
    const mapDispatchToProps = (dispatch, ownProps) => {
        return {
            getData: (type) => dispatch(getData(type)),
            deleteCallback:
                dataType === PRODUCTS
                    ? (...args) => dispatch(deleteProduct(...args))
                    : (...args) => dispatch(deleteSupplier(...args)),
        };
    };

    const mergeProps = (dataProps, functionProps, ownProps) => {
        let routedDispatchers = {
            editCallback: (target) => {
                ownProps.history.push(`/${dataType}/edit/${target.id}`);
            },
            deleteCallback: functionProps.deleteCallback,
            getData: functionProps.getData,
        };
        return Object.assign({}, dataProps, routedDispatchers, ownProps);
    };

    return withRouter(
        connect(
            mapStateToProps,
            mapDispatchToProps,
            mergeProps
        )(DataGetter(dataType, presentationComponent))
    );
};
