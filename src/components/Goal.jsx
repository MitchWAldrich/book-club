import { useState } from "react";
import Dropdown from "./Dropdown";
import Input from "./Input";

const Goal = () => {
  const [number, setNumber] = useState('');
  const [timeline, setTimeline] = useState('');
  const [error, setError] = useState(false);

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleTimelineChange = (e) => {
    setTimeline(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  if (!number) {
    setError(true)
  } else {
    setError(false)
  }
  if (!timeline) {
    setError(true)
  } else {
    setError(false)
  }
}

const units = ['Page(s)', 'Chapter(s)', 'Book(s)'];
const timeUnits = ['Day(s)', 'Weeks(s)', 'Month(s)', 'Year(s)'];
  
  return (
    <main className='container'>
        <h2 className='homeTitle'>Create a Reading Goal</h2>
        {/* <form className='form' onSubmit={handleSubmit}> */}
        <form className='form'>
            <div>
                <label htmlFor='number'>What is your goal?</label>
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
                <Dropdown category={'Units'} options={units} />
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