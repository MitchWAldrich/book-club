const Goal = () => {
  
  return (
    <main className='container'>
        <h2 className='homeTitle'>Create a Reading Goal</h2>
        {/* <form className='form' onSubmit={handleSubmit}> */}
        <form className='form'>
            <div>
                <label htmlFor='number'>What is your goal?</label>
                <div className='timeline'>
                <input
                    className='units'
                    type='number'
                    name='number'
                    required
                    value={'three'}
                    // onChange={(e) => setClub(e.target.value)}
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
                <input
                    type='number'
                    name='units'
                    required
                    value={'three'}
                    // onChange={(e) => setClub(e.target.value)}
                />
            </div>
            <button className='btn'>CREATE GOAL</button>
        </form>
    </main>
  )
};

export default Goal;