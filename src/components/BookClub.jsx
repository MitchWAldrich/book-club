import { useContext } from "react";

import MemberList from "./MemberList";
import Nav from "./Nav";

import userContext from "../userContext";

const BookClub = () => {
  const user = useContext(userContext);

  const bookClub = {
    id: 1,
    name: 'My First Book Club',
    members: [
      {
        userName: 'userId1',
        image: 'https://avatars.githubusercontent.com/u/85146135?v=4',
        isOnline: false
      },
      {
        userName: 'userId2',
        image: 'https://media.istockphoto.com/id/1007763808/photo/portrait-of-handsome-latino-african-man.jpg?s=612x612&w=0&k=20&c=XPL1ukeC99OY8HBfNa_njDujOPf9Xz4yCEOo7O3evU0=',
        isOnline: true
      },
      {
        userName: 'userId3',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY4PolCRZG_SUGHzrbMdWczrLPDLPFjmAlXQ&usqp=CAU',
        isOnline: false
      },
      {
        userName: 'userId4',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8CldTqNpzN9ENCGC79zNXg6EfcqEHXTLjQg&usqp=CAU',
        isOnline: false
      },
      {
        userName: 'userId5',
        image: 'https://t4.ftcdn.net/jpg/02/61/52/95/360_F_261529596_YZWJaMnYFSCM0FSCrxs71o6RrZ9MpP4D.jpg',
        isOnline: true
      }],
    currentBook: 'Reese\'s Favourite Book',
    nextBook: 'Oprah\'s Favourite Book',
    previousBooks: ['Old Book', 'Other Old Book', 'A Graphic Novel'],
    meetingFrequency: 'weekly',
    nextMeetingDate: '12/24/2023'
}

  //invite members

  //set book (and next/future book(s))

  //archive book

  //schedule meeting

  return (
    <main className='container'>
      <Nav user={user ?? "Guest"} />
                <h2 className='homeTitle'>{bookClub.name}</h2>
                <form className='form'>
                  <MemberList members={bookClub.members} />
                {/* <form className='form' onSubmit={handleSubmit}> */}
                    <div>
                        <label htmlFor='Book Club Name'>Book Club Name</label>
                        {/* <Input
                            type="text"
                            label="Book Club Name"
                            value={bookClubName}
                            name="bookClubName"
                            error={error}
                            onChange={(e) => setBookClubName(e.target.value)}
                            placeholder="Book Club Name"
                        /> */}
                    </div>
                    <button className='btn'>CREATE BOOK CLUB</button>
                </form>
    </main>
  );
}

export default BookClub;