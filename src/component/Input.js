
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  isInvalid,
  feedback,
  showPasswordToggle = false,
  onPasswordToggle,
  className,
  ...props
}) => {
  return (
    <div className={`form-group ${className}`}>
      <label htmlFor={name} className="form-label fw-bold mb-1" style={{ fontSize: "1rem" }}>
        {label}
      </label>

      <div className="input-group">
        <span className="input-group-text bg-white border-end-0">
          <i
            className={`bi ${
              isInvalid ? "bi-exclamation-circle text-danger" :
              value ? "bi-check-circle text-success" : "bi-exclamation-circle text-warning"
            }`}
          ></i>
        </span>

        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className={`form-control ${isInvalid ? "is-invalid" : value ? "is-valid" : ""}`}
          style={{ height: "38px", paddingLeft: "10px", color:  "black" }}
          {...props}
        />

        {showPasswordToggle && (
          <button
            type="button"
            className="btn btn-outline-secondary input-group-text"
            onClick={onPasswordToggle}
            style={{ borderTopLeftRadius: "0", borderBottomLeftRadius: "0" }}
          >
            <i className={`bi ${type === "password" ? "bi-eye" : "bi-eye-slash"}`}></i>
          </button>
        )}

        {isInvalid && <div className="invalid-feedback">{feedback}</div>}
      </div>
    </div>
  );
};

export default InputField;

