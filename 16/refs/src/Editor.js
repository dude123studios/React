import React, { Component } from "react";
import { GetValidationMessages } from "./ValidationMessages";
import { ValidationDisplay } from "./ValidationDisplay";

export class Editor extends Component {
    constructor(props) {
        super(props);
        this.formEelements = {
            name: {
                label: "Name",
                name: "name",
                validation: { required: true, minLength: 3 },
            },
            category: {
                label: "Category",
                name: "category",
                validation: { required: true, minLength: 5 },
            },
            price: {
                label: "Price",
                name: "price",
                validation: { type: "number", required: true, min: 5 },
            },
        };

        this.state = {
            errors: {},
            wrapContent: false,
        };
    }

    // handleChange = (event) => {
    //     event.persist();
    //     this.setState(
    //         (state) => (state[event.target.name] = event.target.value)
    //     );
    // };
    setElement = (element) => {
        if (element !== null) {
            this.formEelements[element.name].element = element;
        }
    };

    handleAdd = () => {
        if (this.validateFormElements()) {
            let data = {};
            Object.values(this.formEelements).forEach((v) => {
                data[v.element.name] = v.element.value;
                v.element.value = "";
            });
            this.props.callback(data);
            this.formEelements.name.element.focus();
        }
    };

    validateFormElement = (name) => {
        let errors = GetValidationMessages(this.formEelements[name].element);
        this.setState((state) => (state.errors[name] = errors));
        return errors.length === 0;
    };

    validateFormElements = () => {
        let valid = true;
        Object.keys(this.formEelements).forEach((name) => {
            if (!this.validateFormElement(name)) valid = false;
        });
        return valid;
    };

    toggleWrap = (ev) => {
        this.setState({ wrapContent: ev.target.checked });
    };

    wrapContent(content) {
        return this.state.wrapContent ? (
            <div className="bg-secondary p-2">
                <div className="bg-light">{content}</div>
            </div>
        ) : (
            content
        );
    }

    getSnapshotBeforeUpdate(props, state) {
        return Object.values(this.formEelements).map((item) => {
            return { name: [item.name], value: [item.element.value] };
        });
    }

    componentDidUpdate(oldProps, oldState, snapshot) {
        snapshot.forEach((item) => {
            let element = this.formEelements[item.name].element;
            if (element.value !== item.value) {
                element.value = item.value;
            }
        });
    }

    render() {
        return this.wrapContent(
            <React.Fragment>
                <div className="form-group text-center p-2">
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={this.state.wrapContent}
                            onChange={this.toggleWrap}
                        />
                        <label className="form-check-label">Wrap Content</label>
                    </div>
                </div>
                {Object.values(this.formEelements).map((el) => (
                    <div className="form-group p-2">
                        <label>{el.label}</label>
                        <input
                            className="form-control"
                            name={el.name}
                            autoFocus={el.name === "name"}
                            ref={this.setElement}
                            onChange={() => this.validateFormElement(el.name)}
                            {...el.validation}
                        />
                        <ValidationDisplay
                            errors={this.state.errors[el.name]}
                        />
                    </div>
                ))}
                <div className="text-center">
                    <button
                        className="btn btn-primary"
                        onClick={this.handleAdd}
                    >
                        Add
                    </button>
                </div>
            </React.Fragment>
        );
    }
}
