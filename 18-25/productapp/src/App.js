import { Provider } from "react-redux";
import { ProductDisplay } from "./ProductDisplay";
import { Selector } from "./Selector";
import dataStore from "./store";
import { SupplierDisplay } from "./SupplierDisplay";

export default function App() {
    return (
        <Provider store={dataStore}>
            <Selector>
                <ProductDisplay name="Products" />
                <SupplierDisplay name="Suppliers" />
            </Selector>
        </Provider>
    );
}
