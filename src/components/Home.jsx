import { useEffect, useState } from "react";
import Nav from "./Nav";
import instance from "../utils/axiosConfig";
import { getUser } from "../utils/selectors";

const Home = () => {
    const [user, setUser] = useState("loading");

    useEffect(() => {
        instance.get('http://localhost:4000/api/users')
            .then(function (response) {
                const usersResult = response.data.users;
                setUser(getUser(usersResult, 1));
                // console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                // always executed
            }); 
    }, []);

    const [club, setClub] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ club });
        setClub("");
    };

    return (
        <>
            <Nav user={user || {}}/>
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
    );
};

export default Home;
