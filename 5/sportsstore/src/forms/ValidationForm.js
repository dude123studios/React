import React, { Component } from "react";
import { ValidationError } from "./ValidationError";
import { GetMessages } from "./ValidationMessages";

export class ValidationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            validationErrors: {},
        };
        this.formElements = {};
    }

    handleSubmit = () => {
        this.setState(
            (state) => {
                const newState = { ...state, validationErrors: {} };
                Object.values(this.formElements).forEach((elem) => {
                    if (!elem.checkValidity()) {
                        newState.validationErrors[elem.name] =
                            GetMessages(elem);
                    }
                });
                return newState;
            },
            () => {
                if (Object.keys(this.state.validationErrors).length === 0) {
                    const data = Object.assign(
                        ...Object.entries(this.formElements).map((e) => ({
                            [e[0]]: e[1].value,
                        }))
                    );
                    this.props.submitCallback(data);
                }
            }
        );
    };

    registerRef = (element) => {
        if (element !== null) {
            this.formElements[element.name] = element;
        }
    };

    renderElement = (modelItem) => {
        const name = modelItem.name || modelItem.label.toLowerCase();
        return (
            <div className="form-group" key={modelItem.label}>
                <label>{modelItem.label} </label>
                <ValidationError errors={this.state.validationErrors} />
                <input
                    className="form-control"
                    name={name}
                    ref={this.registerRef}
                    {...this.props.defaultAttrs}
                    {...modelItem.attrs}
                />
            </div>
        );
    };

    render() {
        return <React.Fragment></React.Fragment>;
    }
}
