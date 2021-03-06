import React from "react";
const PhasesList = (props) => {
  return props.phasesDetails.map((val, idx) => {
    let phasename = `phasename-${idx}`,
      estHrs = `estHrs-${idx}`;

    return (
      <div className="form-row" key={val.index}>
        <div className={`${props.editable ? "col-6" : "col-5"}`}>
          <label>Phase Name</label>
          <input
            disabled={props.editable ? true : false}
            type="text"
            className="form-control required"
            placeholder="Name"
            name="phasename"
            data-id={idx}
            id={phasename}
            defaultValue={val.phasename}
          />
        </div>
        <div className={`${props.editable ? "col-6" : "col-5"}`}>
          <label>Estimate Hrs</label>
          <input
            disabled={props.editable ? true : false}
            type="number"
            className="form-control required"
            placeholder="Estimate Hours"
            name="estHrs"
            id={estHrs}
            data-id={idx}
            defaultValue={val.estHrs}
          />
        </div>

        <div className="d-flex justify-content-end col-2 p-4">
          {idx === 0 ? (
            props.editable ? (
              ""
            ) : (
              <button
                onClick={() => props.add()}
                type="button"
                className="btn btn-primary text-center"
              >
                <i className="fa fa-plus-circle" aria-hidden="true" />
              </button>
            )
          ) : props.editable ? (
            ""
          ) : (
            <button
              className="btn btn-danger"
              onClick={() => {
                props.delete(val);
                console.log(props.editable);
              }}
            >
              <i className="fa fa-minus" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    );
  });
};
export default PhasesList;
