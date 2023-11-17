import { useContext, useState } from "react";

import Goal from "./Goal";
import Input from "./Input";
import Invitation from "./Invitation";
import Nav from "./Nav";
import SearchBar from "./Searchbar";

import userContext from "../userContext"; 
import { getBookClubById } from "../utils/selectors";
import { bookClubsMock } from "../mocks/bookClubs";

const Home = () => {
    const user = useContext(userContext);
    console.log('homeUser', user);

    const [bookClubName, setBookClubName] = useState("");
    const [error, setError] = useState(false);

    const handleCreateBookClub = (e) => {
        e.preventDefault();

        if (!bookClubName) {
            setError(true)
          }
        
        console.log({ bookClubName });

        setBookClubName(e.target.value);
    };

    const isInvited = true;

    return (
        <>
            <Nav user={user} />
            <Goal />
            { isInvited ? (
                <Invitation bookClubObj={getBookClubById(bookClubsMock, user.bookClubs.invited[0])} userId={user.userId} />
            ) : null
            }
            <SearchBar />
            <main className='container'>
                <h2 className='homeTitle'>Create a Book Club</h2>
                <form className='form' onSubmit={handleCreateBookClub}>
                    <div>
                        <label htmlFor='Book Club Name'>Book Club Name</label>
                        <Input
                            type="text"
                            label="Book Club Name"
                            value={bookClubName}
                            name="bookClubName"
                            error={error}
                            onChange={(e) => setBookClubName(e.target.value)}
                            placeholder="Book Club Name"
                        />
                    </div>
                    <button className='btn'>CREATE BOOK CLUB</button>
                </form>
            </main>
        </>
    )}

export default Home;
