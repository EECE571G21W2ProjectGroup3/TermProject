import React, { useState } from "react";

const Form = (props) => {
  let [textAreaId, textInput] = ["description", {}];
  let { title, details, textInputArray, submitFunction } = props;
  for (const [label] of textInputArray) textInput[[label]] = "";

  let [state, setState] = useState({
    [textAreaId]: "",
    ...textInput,
  });

  let getText = (event) => {
    const userValue = event.target.value;
    setState({ ...state, [event.target.id]: userValue });
  };

  return (
    <>
      <div className="error">
        <h3> {title} </h3>
      </div>
      <div className="single-house-info">
        <article className="desc">
          <h3>details</h3>
          <textarea
            className="house-description"
            rows="15"
            cols="50"
            id={textAreaId}
            placeholder={details}
            onChange={getText}
          ></textarea>
        </article>
        <article className="info">
          <h3>info</h3>
          <div className="col2">
            {textInputArray.map((each) => {
              let [label, placeHolder] = each;
              return (
                <div key={label}>
                  <label>{label}</label>
                  <input
                    type="text"
                    id={label}
                    placeholder={placeHolder}
                    onChange={getText}
                  />
                </div>
              );
            })}
            <button
              className="submit"
              onClick={() => {
                submitFunction(state);
              }}
            >
              Submit
            </button>
          </div>
        </article>
      </div>
    </>
  );
};

export default Form;
