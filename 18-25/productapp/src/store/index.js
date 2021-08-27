import { createStore, combineReducers } from "redux";
import modelReducer from "./modelReducer";
import stateReducer from "./stateReducer";
import { customReducerEnhancer } from "./customReducerEnhancer";

export default createStore(
    customReducerEnhancer(
        combineReducers({
            modelData: modelReducer,
            stateData: stateReducer,
        })
    )
);

export {
    saveProduct,
    saveSupplier,
    deleteProduct,
    deleteSupplier,
} from "./modelActionCreators";
