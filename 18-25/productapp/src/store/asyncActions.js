import { STORE_RESET } from "./customReducerEnhancer";

export const asyncActions =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        if (action.type === STORE_RESET) {
            new Promise((res, rej) => {
                setTimeout(() => {
                    next(action);
                }, 2000);
            }).then(() => {});
        } else next(action);
    };
