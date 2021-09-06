import { connect } from "react-redux";
import { deleteProduct } from "./modelActionCreators";
import { PRODUCTS, SUPPLIERS } from "./dataTypes";
import { deleteSupplier } from ".";
import { withRouter } from "react-router-dom";
import { DataGetter } from "../DataGetter";
import { getData } from "../graphql/GraphQLMiddleware";

export const TableConnector = (dataType, presentationComponent) => {
    const mapStateToProps = (storeData) => {
        return { [dataType]: storeData.modelData[dataType] };
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
