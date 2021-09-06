import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import * as queries from "./queries";
import * as mutations from "./mutations";
import { PRODUCTS, SUPPLIERS } from "../store/dataTypes";
import { ProductTable } from "../ProductTable";
import { SupplierTable } from "../SupplierTable";

export const GraphQLTable = (dataType) => {
    const getAll = gql(queries[dataType].getAll.graphql);
    const deleteItem = gql(mutations[dataType].delete.graphql);

    return class extends Component {
        constructor(props) {
            super(props);
            this.editCallback = (item) =>
                this.props.history.push(`/${dataType}/edit/${item.id}`);
            this.createCallback = () =>
                this.props.history.push(`/${dataType}/create`);
        }

        removeItemFromCache(cache, mutationResult) {
            const deleteId =
                mutationResult.data[mutations[dataType].delete.name];

            const data = cache.readQuery({ query: getAll })[
                queries[dataType].getAll.name
            ];

            cache.writeQuery({
                query: getAll,
                data: {
                    [dataType]: data.filter((item) => item.id !== deleteId),
                },
            });
        }

        getRefetchQueries() {
            return dataType === PRODUCTS
                ? [{ query: gql(queries[SUPPLIERS].getAll.graphql) }]
                : [];
        }

        render() {
            return (
                <Query query={getAll}>
                    {({ loading, data, refetch }) => {
                        if (loading) {
                            return (
                                <h5 className="bg-info tex-white text-center m-2 p-2">
                                    Loading...
                                </h5>
                            );
                        } else {
                            return (
                                <Mutation
                                    mutation={deleteItem}
                                    update={this.removeItemFromCache}
                                    refetchQueries={this.getRefetchQueries}
                                >
                                    {(doDelete) => (
                                        <React.Fragment>
                                            {dataType === PRODUCTS && (
                                                <ProductTable
                                                    products={data.products}
                                                    editCallback={
                                                        this.editCallback
                                                    }
                                                    deleteCallback={(p) =>
                                                        doDelete({
                                                            variables: {
                                                                id: p.id,
                                                            },
                                                        })
                                                    }
                                                />
                                            )}
                                            {dataType === SUPPLIERS && (
                                                <SupplierTable
                                                    suppliers={data.suppliers}
                                                    editCallback={
                                                        this.editCallback
                                                    }
                                                    deleteCallback={(p) =>
                                                        doDelete({
                                                            variables: {
                                                                id: p.id,
                                                            },
                                                        })
                                                    }
                                                />
                                            )}
                                            <div className="text-center">
                                                <button
                                                    className="btn btn-primary p-2"
                                                    onClick={() => refetch()}
                                                >
                                                    Reload Data
                                                </button>
                                            </div>
                                            <div className="text-center">
                                                <button
                                                    className="btn btn-primary p-2"
                                                    onClick={
                                                        this.createCallback
                                                    }
                                                >
                                                    Create New {dataType}
                                                </button>
                                            </div>
                                        </React.Fragment>
                                    )}
                                </Mutation>
                            );
                        }
                    }}
                </Query>
            );
        }
    };
};
