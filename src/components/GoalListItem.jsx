import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

const GoalListItem = (props) => {
  const { goalObj } = props;

  const {
    goalId,
    goalName,
    // goalUserId,
    goal,
    goalUnit,
    goalTimeline,
    goalTimelineUnit,
    goalRecurrence,
    goalRecurrenceUnit,
  } = goalObj;

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/goals/${goalId}`);
    // valueCallback(bookId);
  };

  return (
    // Make clickable
    <div>
      <button type='button' onClick={handleClick}>
        <div className='GoalListItemContainer'>
          <h3>{goalName}</h3>
          <p>
            I will read
            <br />
            {goal} {goalUnit}
            <br />
            every
            <br />
            {goalTimeline} {goalTimelineUnit}
            {goalRecurrence ? (
              <>
                <br />
                for
                <br />
                {goalRecurrence} {goalRecurrenceUnit}
              </>
            ) : null}
          </p>
        </div>
      </button>
    </div>
  );
};

GoalListItem.propTypes = {
  goalObj: PropTypes.object,
  // goalId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // goalName: PropTypes.string,
  // goalUserId: PropTypes.string,
  // goal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // goalUnit: PropTypes.string,
  // goalTimeline: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // goalTimelineUnit: PropTypes.string,
  // goalRecurrence: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // goalRecurrenceUnit: PropTypes.string,
};

export default GoalListItem;
