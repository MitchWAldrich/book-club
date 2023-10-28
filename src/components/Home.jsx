import { useEffect, useState } from "react";
import BookItem from "./BookItem";
import Goal from "./Goal";
import Nav from "./Nav";
import SearchBar from "./Searchbar";
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

    const sampleBook = {
        author: 'Daniel Keyes',
        categories: ['Fiction', 'Non-Fiction'],
        averageRating: 4,
        description: 'Mentally retarded Charlie Gordon participates in an experiment which turns him into a genius, but only temporarily.',
        imageLinks: {
          smallThumbnail: "http://books.google.com/books/content?id=NRWlitmahXkC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
          thumbnail: "http://books.google.com/books/content?id=NRWlitmahXkC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
        },
        language: 'en',
        pageCount: 328,
        publisher: 'Houghton Mifflin Harcourt',
        title: 'Flowers for Algernon'
      };

    return (
        <>
            <Nav user={user || {}}/>
            <Goal />
            <BookItem author={sampleBook.author} categories={sampleBook.categories} averageRating={sampleBook.averageRating} description={sampleBook.description} imageLinks={sampleBook.imageLinks} language={sampleBook.language} pageCount={sampleBook.pageCount} publisher={sampleBook.publisher} title={sampleBook.title}/>
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
    );
};

export default Home;
