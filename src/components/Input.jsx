import PropTypes from "prop-types";

const Input = (props) => {
  const {
    type,
    label,
    name,
    placeholder,
    error,
    disabled,
    onChange,
    className,
  } = props;

  let value = props.value;

  if (value === null) value = "";

  return (
    <div className={className}>
      {/* <label htmlFor={label}>{label}</label> */}
      <input
        type={type}
        id={label}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        // style={{ backgroundColor: 'orange', height: '100%' }}
        style={{ height: "100%" }}
      />
      {error && <p className='error'>Input field can't be empty!</p>}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
  ]),
  name: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

export default Input;
