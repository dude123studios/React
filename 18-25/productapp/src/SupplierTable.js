import React from "react";
import { SuplierTableRow } from "./SupplierTableRow";

export function SupplierTable(props) {
    return (
        <table className="table table-sm table-striped table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>City</th>
                    <th>Products</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {props.suppliers.map((s) => (
                    <SuplierTableRow
                        key={s.id}
                        supplier={s}
                        editCallback={props.editCallback}
                        deleteCallback={props.deleteCallback}
                    />
                ))}
            </tbody>
        </table>
    );
}
