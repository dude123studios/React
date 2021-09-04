import { STORE, UPDATE, DELETE } from "../store/modelActionTypes";
import { RestDataSource } from "./RestDataSource";
import { PRODUCTS, SUPPLIERS } from "../store/dataTypes";

export const GET_DATA = "rest_get_data";

export const getData = (dataType) => {
    return {
        type: GET_DATA,
        dataType,
    };
};

export const createRestMiddleware = (productsURL, suppliersURL) => {
    const dataSources = {
        [PRODUCTS]: new RestDataSource(productsURL, () => {}),
        [SUPPLIERS]: new RestDataSource(suppliersURL, () => {}),
    };

    return ({ dispatch, getState }) =>
        (next) =>
        (action) => {
            switch (action.type) {
                case GET_DATA:
                    if (getState().modelData[action.dataType].length === 0) {
                        console.log("owo2");
                        //Once all the data has been read from api, store it in datastore
                        dataSources[action.dataType].GetData((data) =>
                            data.forEach((item) =>
                                next({
                                    type: STORE,
                                    dataType: action.dataType,
                                    payload: item,
                                })
                            )
                        );
                    }
                    break;

                case STORE:
                    action.payload.id = null;
                    //Once the data has been stored to api, store it in the datastore
                    dataSources[action.dataType].Store(action.payload, (data) =>
                        next({ ...action, payload: data })
                    );
                    break;

                case UPDATE:
                    dataSources[action.dataType].Update(
                        action.payload,
                        (data) => next({ ...action, payload: data })
                    );
                    break;

                case DELETE:
                    dataSources[action.dataType].Delete(action.payload, () =>
                        next(action)
                    );
                    break;
                default:
                    next(action);
            }
        };
};
