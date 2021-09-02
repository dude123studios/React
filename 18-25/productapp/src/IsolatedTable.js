import React, { Component } from "react";
import { RestDataSource } from "./webservice/RestDataSource";

export class IsolatedTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
        };
        this.dataSource = new RestDataSource(
            "http://localhost:3500/api/products"
        );
    }

    render() {
        return (
            <table className="table table-sm table-striped table-bordered">
                <thead>
                    <tr>
                        <th
                            colSpan="5"
                            className="bg-info text-white text-center h4 p-2"
                        >
                            (Isolated) Products
                        </th>
                    </tr>
                    <tr></tr>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th className="text-right">Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.products.map((p) => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.name}</td>
                            <td>{p.category}</td>
                            <td className="text-right">
                                {Number(p.price).toFixed(2)}
                            </td>
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    componentDidMount() {
        this.dataSource.GetData((data) => this.setState({ products: data }));
    }
}
