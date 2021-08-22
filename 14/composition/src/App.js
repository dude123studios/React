import React, { Component } from "react";
import { GeneralList } from "./GeneralList";
import { SortedList } from "./SortedList";
import { ProModeContext } from "./ProModeContext";
import { ProModeToggle } from "./ProModeToggle";
//import { ProFeature } from "./ProFeature";
//import { ProController } from "./ProController";
//import { LogToConsole } from "./LogToConsole";

// const ProList = ProController(
//     LogToConsole(SortedList, "Sorted", true, true, true)
// );

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            names: ["Zoe", "Bob", "Alice", "Dora", "Joe"],
            cities: ["London", "New York", "Paris", "Milan", "Boston"],
            proContextData: {
                proMode: false,
                toggleProMode: this.toggleProMode,
            },
            superProContextData: {
                proMode: false,
                toggleProMode: this.toggleSuperMode,
            },
        };
    }

    toggleProMode = () => {
        this.setState({
            proContextData: {
                ...this.state.proContextData,
                proMode: !this.state.proContextData.proMode,
            },
        });
    };

    toggleSuperMode = () => {
        this.setState({
            superProContextData: {
                ...this.state.superProContextData,
                proMode: !this.state.superProContextData.proMode,
            },
        });
    };

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <ProModeContext.Provider value={this.state.proContextData}>
                        <div className="col-6 p-2">
                            <div className="bg-dark text-left text-white m-1 p-2">
                                <ProModeToggle label="Pro Mode" />
                            </div>
                        </div>
                    </ProModeContext.Provider>
                    <ProModeContext.Provider
                        value={this.state.superProContextData}
                    >
                        <div className="col-6 text-center p-2">
                            <ProModeToggle label="Super Pro Mode" />
                        </div>
                    </ProModeContext.Provider>
                </div>
                <div className="row">
                    <ProModeContext.Provider value={this.state.proContextData}>
                        <div className="col-6">
                            <SortedList list={this.state.names} />
                        </div>
                    </ProModeContext.Provider>
                    <ProModeContext.Provider
                        value={this.state.superProContextData}
                    >
                        <div className="col-6">
                            <SortedList list={this.state.cities} />
                        </div>
                    </ProModeContext.Provider>
                </div>
            </div>
        );
    }

    componentDidCatch() {
        console.log("err occored");
    }
}
