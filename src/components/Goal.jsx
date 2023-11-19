import { useContext, useState } from "react";
import axios from 'axios';

import Dropdown from "./Dropdown";
import Input from "./Input";

import userContext from "../userContext";

const Goal = () => {
  const user = useContext(userContext);

  const [goalName, setGoalName] = useState('');
  const [number, setNumber] = useState('');
  const [timeline, setTimeline] = useState('');
  const [error, setError] = useState(false);

  const handleNameChange = (e) => {
    setGoalName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleTimelineChange = (e) => {
    setTimeline(e.target.value);
  };

  const updateGoal = (goalObj) => {
    axios.patch(`http://localhost:4000/api/users/${user.id}`, {userId: user.id, goalObj: goalObj })
  .then(response => {
    console.log('goalObjResponse', response.data)  
  })
  .catch(error => console.error(error)); 
    // add book object to user object
}

  const handleSubmit = (e) => {
    e.preventDefault();
  
  if (!goalName || !number || !timeline ) {
    setError(true)
  } else {
    setError(false)
  }

  const goalObj = {
    name: goalName,
    number: number,
    timelime: timeline
  }

  updateGoal(goalObj);
  }

const units = ['Page(s)', 'Chapter(s)', 'Book(s)'];
const timeUnits = ['Day(s)', 'Weeks(s)', 'Month(s)', 'Year(s)'];
  
  return (
    <main className='container'>
        <h2 className='homeTitle'>Create a Reading Goal</h2>
        <form className='form' onSubmit={handleSubmit}>
            <div>
                <label htmlFor='number'>What is your goal?</label>
                <div className='goalName'>
                <Input
                    type="text"
                    label=""
                    value={goalName}
                    name="goalName"
                    error={error}
                    onChange={handleNameChange}
                    placeholder="Goal Name"
                />
                </div>
                <div className='timeline'>
                <Input
                    type="number"
                    label=""
                    value={number}
                    name="number"
                    error={error}
                    onChange={handleNumberChange}
                    placeholder="#"
                />
                <br></br>
                {/* missing valueCallback? */}
                <Dropdown category={'Units'} options={units} dropdownName='GoalUnitsDropdown' />
                </div>
                <br></br>
                <label htmlFor='units'>What is your goal timeline?</label>
                <div className='timeline'>
                <Input
                    type="number"
                    label=""
                    value={timeline}
                    name="number"
                    error={error}
                    onChange={handleTimelineChange}
                    placeholder="#"
                />
                <br></br>
                <Dropdown category={'TimeUnits'} options={timeUnits} />
                </div>
            </div>
            <button className='btn' onSubmit={handleSubmit}>CREATE GOAL</button>
        </form>
    </main>
  )
};

export default Goal;