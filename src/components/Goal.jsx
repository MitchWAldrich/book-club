import { useContext, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import PropTypes from "prop-types";

import Dropdown from "./Dropdown";
import Input from "./Input";

import userContext from "../userContext";
import { getGoalByGoalId } from "../utils/selectors";

import { goalsMock } from "../mocks/goals";

const Goal = (props) => {
  const user = useContext(userContext);
  let { goalObj, location } = props;
  const { id } = useParams();

  goalObj = getGoalByGoalId(goalsMock, id);

  const [goalName, setGoalName] = useState(goalObj?.goalName ?? "");
  const [number, setNumber] = useState(goalObj?.goal ?? "");
  const [numberUnits, setNumberUnits] = useState(goalObj?.goalUnits ?? "");
  const [recurrence, setRecurrence] = useState(goalObj?.goalRecurrence ?? "");
  const [recurrenceUnits, setRecurrenceUnits] = useState(
    goalObj?.goalRecurrenceUnits ?? ""
  );
  const [timeline, setTimeline] = useState(goalObj?.goalTimeline ?? "");
  const [timelineUnits, setTimelineUnits] = useState(
    goalObj?.goalTimelineUnits ?? ""
  );
  const [error, setError] = useState(false);

  /* {variable && (
    some code 
    )
    syntax */

  const handleNameChange = (e) => {
    setGoalName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleRecurrenceChange = (e) => {
    setRecurrence(e.target.value);
  };

  const handleTimelineChange = (e) => {
    setTimeline(e.target.value);
  };

  const getUnits = (val, location) => {
    if (location === "GoalUnitsDropdown") {
      setNumberUnits(val);
    }
    if (location === "GoalRecurrenceDropdown") {
      setRecurrenceUnits(val);
    }
    if (location === "GoalTimelineDropdown") {
      setTimelineUnits(val);
    }
  };

  const updateGoal = (goalObj) => {
    axios
      .post(`http://localhost:4000/api/goals/`, {
        goalObj: goalObj,
      })
      .then((response) => {
        console.log("goalObjResponse", response.data);
      })
      .catch((error) => console.error(error));

    axios
      .patch(`http://localhost:4000/api/users/${user.id}`, {
        userId: user.id,
        goalObj: goalObj,
      })
      .then((response) => {
        console.log("goalUserResponse", response.data);
      })
      .catch((error) => console.error(error));
    // add book object to user object
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !goalName ||
      !number ||
      !timeline ||
      !numberUnits ||
      !recurrenceUnits ||
      !timelineUnits ||
      !user ||
      !recurrence
    ) {
      if (!goalName) console.log("goalName");
      if (!number) console.log("number");
      if (!timeline) console.log("timeline");
      if (!numberUnits) console.log("numberUnits");
      if (!recurrenceUnits) console.log("recurrenceUnits");
      if (!timelineUnits) console.log("timelineUnits");
      if (!user) console.log("user");
      if (!recurrence) console.log("recurrence");
      setError(true);
    } else {
      setError(false);
    }

    const goalObject = {
      goalName: goalName,
      goalUserId: user.userId,
      goal: number,
      goalUnits: numberUnits,
      goalTimeline: timeline,
      goalTimelineUnits: timelineUnits,
      goalRecurrence: recurrence,
      goalRecurrenceUnits: recurrenceUnits,
    };

    updateGoal(goalObject);
  };

  const units = ["Page(s)", "Chapter(s)", "Book(s)"];
  const timeUnits = ["Day(s)", "Weeks(s)", "Month(s)", "Year(s)"];

  return (
    <main className='container'>
      <div className='GoalListItemContainer'>
        <h3>{goalName}</h3>
        <p>
          I will read
          <br />
          {number} {numberUnits}
          <br />
          every
          <br />
          {timeline} {timelineUnits}
          {recurrence ? (
            <>
              <br />
              for
              <br />
              {recurrence} {recurrenceUnits}
            </>
          ) : null}
        </p>
      </div>
      {location === "add" ? (
        <>
          <h2 className='homeTitle'>Create a Reading Goal</h2>
          <form className='form' onSubmit={handleSubmit}>
            <div>
              <label htmlFor='number'>Give your Goal a name</label>
              <div className='goalName'>
                <Input
                  type='text'
                  label=''
                  value={goalName}
                  name='goalName'
                  error={error}
                  onChange={handleNameChange}
                  placeholder='Goal Name'
                />
              </div>
              <br></br>
              <label htmlFor='number'>What is your goal?</label>
              <div className='timeline'>
                <Input
                  type='number'
                  label=''
                  value={number}
                  name='number'
                  error={error}
                  onChange={handleNumberChange}
                  placeholder='#'
                />
                <br></br>
                <Dropdown
                  category={"Units"}
                  options={units}
                  dropdownName='GoalUnitsDropdown'
                  valueCallback={getUnits}
                />
              </div>
              <br></br>
              <label htmlFor='units'>What is your goal timeline?</label>
              <div className='timeline'>
                <Input
                  type='number'
                  label=''
                  value={timeline}
                  name='timeline'
                  error={error}
                  onChange={handleTimelineChange}
                  placeholder='#'
                />
                <br></br>
                <Dropdown
                  category={"Units"}
                  options={timeUnits}
                  dropdownName='GoalTimelineDropdown'
                  valueCallback={getUnits}
                />
              </div>
              <br></br>
              <label htmlFor='units'>Is this a recurring goal?</label>
              <div className='timeline'>
                <Input
                  type='number'
                  label=''
                  value={recurrence}
                  name='recurrence'
                  error={error}
                  onChange={handleRecurrenceChange}
                  placeholder='#'
                />
                <br></br>
                <Dropdown
                  category={"TimeUnits"}
                  options={timeUnits}
                  dropdownName='GoalRecurrenceDropdown'
                  valueCallback={getUnits}
                />
              </div>
            </div>
            <button className='btn' onSubmit={handleSubmit}>
              CREATE GOAL
            </button>
          </form>
        </>
      ) : null}
    </main>
  );
};

Goal.propTypes = {
  goalObj: PropTypes.object,
  location: PropTypes.string,
};

export default Goal;
