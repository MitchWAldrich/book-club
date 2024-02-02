import PropTypes from "prop-types";

const ProgressBar = (props) => {
  const { progressPercentage } = props;

  const width = 200 * (progressPercentage / 100);

  return (
    <>
      <div className='progress-bar-container'>
        <div
          style={{
            display: "flex",
            "justify-content": "center",
            "align-items": "center",
            width: `${width}px`,
            height: "50px",
            "background-color": "red",
          }}
        >
          <h4>{`${progressPercentage}%`}</h4>
        </div>
      </div>
      <h5>*DAYS* to complete goal</h5>
    </>
  );
};

ProgressBar.propTypes = {
  progressPercentage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ProgressBar;
