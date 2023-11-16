import { useContext, useState } from "react";

import Goal from "./Goal";
import Input from "./Input";
import Invitation from "./Invitation";
import Nav from "./Nav";
import SearchBar from "./Searchbar";

import userContext from "../userContext"; 
import { getBookClubById } from "../utils/selectors";

const Home = () => {
    const user = useContext(userContext);
    console.log('homeUser', user);
    const bookClubs = [
        {
            id: 1,
            bookClubId: 'sdfjil234)',
            name: 'My First Book Club',
            members: {invited: [], accepted: [ 'userId1', 'userId2', 'userId3', 'userId4', 'userId5']},
            currentBook: 'Reese\'s Favourite Book',
            nextBook: 'Oprah\'s Favourite Book',
            previousBooks: ['Old Book', 'Other Old Book', 'A Graphic Novel'],
            meetingFrequency: 'weekly',
            nextMeetingDate: '12/24/2023'
        },
        {
            id: 2,
            bookClubId: 'fsqjil$t72',
            name: 'My Second Book Club',
            members: {invited: [], accepted: [ 'userId6', 'userId7', 'userId8', 'userId9', 'userId10']},
            currentBook: 'Reese\'s 2nd Favourite Book',
            nextBook: 'Oprah\'s 2nd Favourite Book',
            previousBooks: ['Old Book 2', 'A 2nd Old Book', 'A 2nd Graphic Novel'],
            meetingFrequency: 'monthly',
            nextMeetingDate: '12/27/2023'
        },
        {
            id: 3,
            bookClubId: 'fdul694*',
            name: 'Book Clubbing',
            members: {invited: [], accepted: [ 'userId11', 'userId12', 'userId13', 'userId14', 'userId15']},
            currentBook: 'Reese\'s 3rd Favourite Book',
            nextBook: 'Oprah\'s 3rd Favourite Book',
            previousBooks: ['Old Book 3', 'Third Old Book', 'A 3rd Graphic Novel'],
            meetingFrequency: 'bi-weekly',
            nextMeetingDate: '11/24/2023'
        }
    ];

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
                <Invitation bookClubObj={getBookClubById(bookClubs, user.bookClubs.invited[0])} userId={user.userId} />
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
