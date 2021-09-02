import { PRODUCTS } from "./dataTypes";
import { saveProduct, saveSupplier } from ".";
import { endEditing } from "./stateActions";

export const saveAndEndEditing = (data, dataType) => {
    return [
        dataType === PRODUCTS ? saveProduct(data) : saveSupplier(data),
        endEditing(),
    ];
};
