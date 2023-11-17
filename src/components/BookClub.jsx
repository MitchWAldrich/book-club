import { useContext } from "react";

import MemberList from "./MemberList";
import Nav from "./Nav";
import SingleBookItem from "./SingleBookItem";

import userContext from "../userContext";

const BookClub = () => {
  const user = useContext(userContext);

  const bookClub = {
    id: 'sdfjil234)',
    name: 'My First Book Club',
    members: [
      {
        userName: 'Mitch Aldrich',
        image: 'https://avatars.githubusercontent.com/u/85146135?v=4',
        isOnline: false
      },
      {
        userName: 'Felix Agabi',
        image: 'https://media.istockphoto.com/id/1007763808/photo/portrait-of-handsome-latino-african-man.jpg?s=612x612&w=0&k=20&c=XPL1ukeC99OY8HBfNa_njDujOPf9Xz4yCEOo7O3evU0=',
        isOnline: true
      },
      {
        userName: 'Zayneb Mahmoud',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY4PolCRZG_SUGHzrbMdWczrLPDLPFjmAlXQ&usqp=CAU',
        isOnline: false
      },
      {
        userName: 'Ken Smith',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8CldTqNpzN9ENCGC79zNXg6EfcqEHXTLjQg&usqp=CAU',
        isOnline: false
      },
      {
        userName: 'Aliyah Jones',
        image: 'https://t4.ftcdn.net/jpg/02/61/52/95/360_F_261529596_YZWJaMnYFSCM0FSCrxs71o6RrZ9MpP4D.jpg',
        isOnline: true
      }],
    currentBook: 'Reese\'s Favourite Book',
    nextBook: 'Oprah\'s Favourite Book',
    previousBooks: ['Old Book', 'Other Old Book', 'A Graphic Novel'],
    meetingFrequency: 'weekly',
    nextMeetingDate: '12/24/2023'
}

const bookObj = {
  authors: ["Daniel Keyes"],
  categories: ["Fiction", "Non-Fiction"],
  averageRating: 4,
  description:
    "Mentally retarded Charlie Gordon participates in an experiment which turns him into a genius, but only temporarily.",
  imageLinks: {
    smallThumbnail:
      "http://books.google.com/books/content?id=NRWlitmahXkC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    thumbnail:
      "http://books.google.com/books/content?id=NRWlitmahXkC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
  },
  language: "en",
  pageCount: 328,
  publisher: "Houghton Mifflin Harcourt",
  title: "Flowers for Algernon",
};

  //set book (and next/future book(s))

  //archive book

  //schedule meeting

  return (
    <main className='container'>
      <Nav user={user ?? "Guest"} />
      <h2 className='homeTitle'>{bookClub.name}</h2>
      <div>
      <SingleBookItem
            authors={bookObj.authors}
            categories={bookObj.categories}
            averageRating={bookObj.averageRating}
            description={bookObj.description}
            imageLinks={bookObj.imageLinks}
            language={bookObj.language}
            pageCount={bookObj.pageCount}
            publisher={bookObj.publisher}
            title={bookObj.title}
            userId={3}
            location={'expanded'}
          />
        <SingleBookItem
          authors={bookObj.authors}
          imageLinks={bookObj.imageLinks}
          title={bookObj.title}
          location={'bookClubFeature'}
        />
        <MemberList members={bookClub.members} bookClubId={bookClub.id} />
      </div>
    </main>
  );
}

export default BookClub;