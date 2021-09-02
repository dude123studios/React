import { Provider } from "react-redux";
import { ProductDisplay } from "./ProductDisplay";
import { Selector } from "./Selector";
import dataStore, { deleteProduct } from "./store";
import { SupplierDisplay } from "./SupplierDisplay";
import { startEditingProduct } from "./store/stateActions";
import { PRODUCTS, SUPPLIERS } from "./store/dataTypes";

export default function App() {
    return (
        <Provider store={dataStore}>
            <Selector>
                <ProductDisplay name="Products" dataType={PRODUCTS} />
                <SupplierDisplay name="Suppliers" dataType={SUPPLIERS} />
            </Selector>
        </Provider>
    );
}
