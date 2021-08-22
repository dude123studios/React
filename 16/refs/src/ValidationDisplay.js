import React from "react";

export function ValidationDisplay(props) {
    return props.errors
        ? props.errors.map((err) => (
              <div className="small bg-danger text-white mt-1 p-1" key={err}>
                  {err}
              </div>
          ))
        : null;
}
