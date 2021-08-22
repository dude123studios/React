import React, { useState } from "react";

export function ProductTable(props) {
    return (
        <table className="table table-sm table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {props.products.map((p) => (
                    <tr key={p.name}>
                        <td>{p.name}</td>
                        <td>{p.category}</td>
                        <td>${p.price}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
