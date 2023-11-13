import PropTypes from "prop-types";

const Input = (props) => {
  const { type, label, value, name, placeholder, error, disabled, onChange } =
    props;

  return (
    <div className="input-wrapper">
      <label htmlFor={label}>{label}</label>
      <input
        type={type}
        id={label}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
      />
      {error && <p className="error">Input filed can't be empty!</p>}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string || PropTypes.number,
  label: PropTypes.string,
  value: PropTypes.string || PropTypes.number || PropTypes.func,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

export default Input;
