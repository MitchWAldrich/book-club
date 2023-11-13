import { useContext, useState } from "react";

import Goal from "./Goal";
import Nav from "./Nav";
import SearchBar from "./Searchbar";

import userContext from "../userContext"; 

const Home = () => {
    const user = useContext(userContext);

    const [club, setClub] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ club });
        setClub("");
    };

    return (
        <>
            <Nav user={user} />
            <Goal />
            <SearchBar />
            <main className='container'>
                <h2 className='homeTitle'>Create a Book Club</h2>
                <form className='form' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='thread'>Title</label>
                        <input
                            type='text'
                            name='thread'
                            required
                            value={club}
                            onChange={(e) => setClub(e.target.value)}
                        />
                    </div>
                    <button className='btn'>CREATE CLUB</button>
                </form>
            </main>
        </>
    )}

export default Home;
