import React, { useState } from "react";
import { Editor } from "./Editor";
import { Display } from "./Display";

export default function App(props) {
    const [formData, setFormData] = useState({});

    const submitData = (newData) => setFormData(newData);

    return (
        <div className="containter-fluid">
            <div className="row p-2">
                <div className="col-6">
                    <Editor submit={submitData} />
                </div>
                <div className="col-6">
                    <Display data={formData} />
                </div>
            </div>
        </div>
    );
}
