import { useState } from "react";
import instance from "../utils/axiosConfig";

import PropTypes from "prop-types";

import Input from "./Input";
import ProgressBar from "./ProgressBar";

import { calculateProgressInPercent } from "../utils/helpers";

const GoalListItem = (props) => {
  const { goalObj, valueCallback, userId } = props;

  const [isTrackClicked, setIsTrackClicked] = useState(false);
  const [goalProgressError, setGoalProgressError] = useState(false);
  const [updatedGoalProgress, setUpdatedGoalProgress] = useState(null);

  const {
    // goalId,
    goalName,
    // goalUserId,
    goal,
    goalUnit,
    goalTimeline,
    goalTimelineUnits,
    goalRecurrence,
    goalRecurrenceUnits,
    goalCurrentPages,
    goalTotalPages,
  } = goalObj;

  // const navigate = useNavigate();

  // const goalProgressPercentage = calculateProgressInPercent(
  //   goalCurrentPages,
  //   goalTotalPages
  // );

  const [goalProgress, setGoalProgress] = useState(
    calculateProgressInPercent(goalCurrentPages, goalTotalPages)
  );

  const handleTrackClick = (e) => {
    e.preventDefault();
    setIsTrackClicked(true);
    // valueCallback(goalId);
  };

  const handleClick = (e) => {
    e.preventDefault();
    // navigate(`/goals/${goalId}`);
    valueCallback(goalObj.goalId, "updateGoal");
  };

  const handlePagesRead = (e) => {
    if (!goalProgress) {
      setGoalProgressError(true);
    } else {
      setGoalProgressError(false);
    }

    setUpdatedGoalProgress(e.target.value);
  };

  const handleUpdateGoalProgress = (e) => {
    e.preventDefault();
    setGoalProgress(
      calculateProgressInPercent(
        Number(goalCurrentPages) + Number(updatedGoalProgress),
        goalTotalPages
      )
    );

    instance.patch(`/api/goals/${goalObj.goalId}`, {
      goalObj: goalObj,
      userId: userId,
      goalId: goalObj.goalId,
      id: goalObj.id,
      updatedGoalProgress: updatedGoalProgress,
    });
  };

  return (
    // Make clickable
    <div>
      <div className='GoalListItemContainer'>
        <h3>{goalName}</h3>
        <p>
          I will read
          <br />
          {goal} {goalUnit}
          <br />
          every
          <br />
          {goalTimeline} {goalTimelineUnits}
          {goalRecurrence ? (
            <>
              <br />
              for
              <br />
              {goalRecurrence} {goalRecurrenceUnits}
            </>
          ) : null}
        </p>
        <h3>Progress</h3>
        <ProgressBar progressPercentage={goalProgress} />
        {!isTrackClicked && (
          <div className='form'>
            <h2>How many pages did you read?</h2>
            <Input
              // className='searchBar'
              type='text'
              // label="search"
              value={updatedGoalProgress}
              name='updateProgress'
              error={goalProgressError}
              onChange={handlePagesRead}
              placeholder='Pages Read'
            />
            <button type='button' onClick={handleUpdateGoalProgress}>
              UPDATE
            </button>
          </div>
        )}
        <button type='button' onClick={handleTrackClick}>
          Track Progress
        </button>
        <button type='button' onClick={handleClick}>
          Change Goal
        </button>
      </div>
    </div>
  );
};

GoalListItem.propTypes = {
  goalObj: PropTypes.object,
  valueCallback: PropTypes.func,
  userId: PropTypes.string,
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
