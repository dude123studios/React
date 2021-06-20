import React, { Component } from "react";
import { Message } from "./Message";
import { List } from "./List";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0,
        };
    }

    incrementCounter = () => {
        this.setState({ counter: this.state.counter + 1 });
    };

    render() {
        console.log("Render App Component");
        return (
            <div className="container text-center">
                <div className="row p-2">
                    <div className="col p-6">
                        <Message
                            message={`Counter: ${this.state.counter}`}
                            callback={this.incrementCounter}
                            text="Increment Counter"
                        ></Message>
                    </div>
                    <div className="col-6">
                        <List />
                    </div>
                </div>
            </div>
        );
    }
}
