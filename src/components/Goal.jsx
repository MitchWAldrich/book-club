import { useState } from "react";
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
                <select id="units" name="units">
                  <option value="page(s)">Page(s)</option>
                  <option value="chapter(s)">Chapter(s)</option>
                  <option value="book(s)">Book(s)</option>
                </select>
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
                <select id="units" name="units">
                  <option value="week(s)">Week(s)</option>
                  <option value="month(s)">Month(s)</option>
                  <option value="year(s)">Year(s)</option>
                </select>
                </div>
            </div>
            <button className='btn' onSubmit={handleSubmit}>CREATE GOAL</button>
        </form>
    </main>
  )
};

export default Goal;