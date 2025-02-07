import React from "react";

function Input(props){

return(
    <>
      <div className="mb-3">
                    <label htmlFor={props.htmlFor} className="form-label">{props.labelName}</label>
                    <input
                        type="text"
                        className="form-control"
                        id={props.id}
                        name={props.name}
                    
                        onChange={props.onChange}
                        placeholder={props.placeholder}
                        required
                    />
                </div>
    </>
)

}
export default Input;  //export the function as a default export