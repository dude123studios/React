import { STORE, UPDATE, DELETE } from "../store/modelActionTypes";
import { PRODUCTS, SUPPLIERS } from "../store/dataTypes";
import { GraphQLDataSource } from "./GraphQLDataSource";

export const GET_DATA = "graphql_get_data";

export const getData = (dataType) => {
    return {
        type: GET_DATA,
        dataType: dataType,
    };
};

export const createGraphQLMiddleware = () => {
    const dataSources = {
        [PRODUCTS]: new GraphQLDataSource(PRODUCTS, () => {}),
        [SUPPLIERS]: new GraphQLDataSource(SUPPLIERS, () => {}),
    };

    return ({ dispatch, getState }) =>
        (next) =>
        (action) => {
            switch (action.type) {
                case GET_DATA:
                    if (getState().modelData[action.dataType].length === 0) {
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
                    dataSources[action.dataType].Delete(
                        { id: action.payload },
                        () => next(action)
                    );
                default:
                    next(action);
            }
        };
};
