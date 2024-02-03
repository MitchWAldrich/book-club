// import { useNavigate } from "react-router-dom";
import { useState } from "react";

import PropTypes from "prop-types";

import { calculateProgressInPercent } from "../utils/helpers";
import ProgressBar from "./ProgressBar";

const GoalListItem = (props) => {
  const { goalObj, valueCallback, goalProgress } = props;

  const {
    goalId,
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

  const handleTrackClick = (e) => {
    e.preventDefault();
    valueCallback(goalId, "trackProgress");
  };

  const handleClick = (e) => {
    e.preventDefault();
    // navigate(`/goals/${goalId}`);
    valueCallback(goalId, "updateGoal");
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
        <p>{goalProgress}</p>
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
  goalProgress: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
