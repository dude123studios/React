import React, { useState } from "react";
import { GeneralList } from "./GeneralList";
import { ActionButton } from "./ActionButton";
import { ErrorBoundary } from "./ErrorBoundary";
import { ErrorHOC } from "./ErrorHOC";

const erroredComponent = ErrorHOC(GeneralList);

export function SortedList(props) {
    const [sort, setSort] = useState(false);

    const getList = () => (sort ? [...props.list].sort() : props.list);

    const toggleSort = () => setSort(!sort);

    return (
        <div>
            <erroredComponent list={getList()} theme="info" />
            <div className="text-center m-2">
                <ActionButton
                    theme="primary"
                    text="Sort"
                    callback={toggleSort}
                    proMode={props.proMode}
                />
            </div>
        </div>
    );
}
