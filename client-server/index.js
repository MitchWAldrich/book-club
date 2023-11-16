import express from 'express';
import cors from 'cors';
import { getBookClubById, getUserById } from '../src/utils/selectors.js';

const app = express();
const PORT = 4000;
// const PORT = process.env.PORT ||4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//Temp Users Object
const users = [
    {
        id: 1,
        userId: '34xc98(dfk',
        email: 'user1@email.com',
        password: 'password',
        username: 'user1',
        goals: [],
        library: {
            haveRead: [],
            toRead: []
        },
        bookClubs: {
            invited: [],
            accepted: []
        }
    },
    {
        id: 2,
        userId: '523dgf*5gn&',
        email: 'user2@email.com',
        password: 'password',
        username: 'user2',
        goals: [],
        library: {
            haveRead: [],
            toRead: []
        },
        bookClubs: {
            invited: [],
            accepted: []
        }
    },
    {
        id: 3,
        userId: '62jt*(kj!3',
        email: 'user3@email.com',
        password: 'password',
        username: 'user3',
        goals: [{
            name: 'My First Goal',
            number: '20 pages',
            timeline: '3 days',
        }],
        library: {
            haveRead: [{
                title: 'title1',
                authors: [ 'John Smith', 'Julie Black' ],
                categories: [ 'Non-Fiction' ],
                averageRating: 5,
                description: 'A great book about things',
                imageLinks: { smallThumbnail: 'http:', thumbnail: 'https:' },
                pageCount: 234,
                publisher: 'Clearly'
              },{
                title: 'title2',
                authors: [ 'Fred Smith', 'Julie Steinberg' ],
                categories: [ 'Fiction' ],
                averageRating: 4,
                description: 'A great book about stuff',
                imageLinks: { smallThumbnail: 'http:', thumbnail: 'https:' },
                pageCount: 154,
                publisher: 'Smithson'
              },
              {
                title: 'title3',
                authors: [ 'Fred Smith', 'Julie Steinberg' ],
                categories: [ 'Fiction' ],
                averageRating: 3,
                description: 'A great novel about stuff',
                imageLinks: { smallThumbnail: 'http:', thumbnail: 'https:' },
                pageCount: 200,
                publisher: 'Smithly'
              }],
              toRead: [{
                title: 'title4',
                authors: [ 'Whit Merrifield'],
                categories: [ 'Biography', 'Sports' ],
                averageRating: 5,
                description: 'A great book about Whit',
                imageLinks: { smallThumbnail: 'http:', thumbnail: 'https:' },
                pageCount: 234,
                publisher: 'Jays'
              },
              {
                title: 'title5',
                authors: [ 'Fred Smith Black', 'Julie Steinberg' ],
                categories: [ 'Fiction' ],
                averageRating: 4,
                description: 'A great book about stuff',
                imageLinks: { smallThumbnail: 'http:', thumbnail: 'https:' },
                pageCount: 34,
                publisher: 'New'
              }]
        },
        bookClubs: {
            invited: ['sdfjil234)'],
            accepted: []
        }
    }
];

// Temp Book Clubs Object

const bookClubs = [
    {
        id: 1,
        bookClubId: 'sdfjil234)',
        name: 'My First Book Club',
        members: {invited: ['62jt*(kj!3'], accepted: [ 'userId1', 'userId2', 'userId3', 'userId4', 'userId5']},
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
]

//👇🏻 generates a random string as ID
const generateID = () => Math.random().toString(36).substring(2, 10);
//Need to make unique


/* ***** ROUTES ***** */

// API Route
app.get("/api", (req, res) => {
    res.json({
        message: "Hello world",
    });
});

/* *** USER ROUTES *** */

app.get("/api/users", (req, res) => {
    res.json({
        users
    });
});

app.get("/api/users/:id", (req, res, next) => {
    const id = req.params.id;
    const user = getUserById(users, id)
    
    res.json({
        user
    });
    // res.send('USER')
    next()
  })

// Register Route
app.post("/api/users", async (req, res) => {
    const { email, password, username } = req.body;

    //👇🏻 holds the userID
    const userId = generateID();
    const userSearch = users.filter(
        (user) => user.email === email && user.password === password
    );

    if (userSearch.length === 0) {
        const newUser = { userId, email, password, username };
        users.push(newUser);

        return res.json({
            message: "Account created successfully!"
        });
    }

    res.json({
        error_message: "User already exists",
    })
    //👇🏻 logs all the user's credentials to the console.
    console.log({ email, password, username, userId });
});

app.patch("/api/users/:id", async (req) => {
    let { userId, bookObj, goalObj, readStatus, bookClubId, bookClubApprovalStatus } = req.body;

    const user = users.find(
        (user) => user.userId === userId
    );
    
    // Update Read Status
    if ( readStatus === 'toRead' ) user.library.toRead.push(bookObj)
    if ( readStatus === 'haveRead' ) user.library.haveRead.push(bookObj)

    // Update Goals
    if (goalObj) user.goals.push(goalObj)

    // Update Book Clubs
    if (bookClubApprovalStatus === 'invited') user.bookClubs.invited.push(bookClubId)
    if (bookClubApprovalStatus === 'accepted') {
        user.bookClubs.accepted.push(bookClubId);
        user.bookClubs.invited.splice(user.bookClubs.invited.indexOf(bookClubId))
    }
    if (bookClubApprovalStatus === 'rejected') {
        user.bookClubs.invited.splice(user.bookClubs.invited.indexOf(bookClubId))
    }
    //👇🏻 logs all the request fields to the console.
    console.log({ userId, bookObj, goalObj });
});


/* *** BOOKCLUBS ROUTES *** */
app.get("/api/bookclubs", (req, res) => {
    res.json({
        bookClubs
    });
});

app.get("/api/bookclubs/:id", (req, res) => {
    console.log('params', req.params)
    const bookClubId = req.params.id;
    const bookClub = getBookClubById(bookClubs, bookClubId)

    res.json({
        bookClub
    });
});


app.post("/api/bookclubs", async (req, res) => {
    const { bookClubName } = req.body;

    //👇🏻 holds the bookclub Id
    const bookClubId = generateID();

    const newBookClub = { bookClubId: bookClubId, bookClubName: bookClubName };

    bookClubs.push(newBookClub);

    //👇🏻 logs all the user's credentials to the console.
    console.log({ bookClubId, bookClubName });

    return res.json({
        message: "Bookclub created successfully!"
    });
});

app.patch("/api/bookclubs/:id", async (req) => {
    const { bookClubId, newMembers, acceptanceStatus } = req.body;

    const bookClub = bookClubs.find( bookClub => bookClub.bookClubId === bookClubId )

    if (newMembers) {
        if (acceptanceStatus === 'accepted') newMembers.forEach( (member) => {
            bookClub.members.accepted.push(member)
            bookClub.members.invited.splice(bookClub.members.invited.indexOf(member))
        })

        if (acceptanceStatus === 'rejected') newMembers.forEach( (member) => bookClub.members.invited.splice(bookClub.members.invited.indexOf(member)))
    }

    //👇🏻 logs all the request fields to the console.
    console.log({ bookClubId, newMembers });
});

// Login Route
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    //👇🏻 checks if the user exists
    let result = users.filter(
        (user) => user.email === email && user.password === password
    );
    //👇🏻 if the user doesn't exist
    if (result.length !== 1) {
        return res.json({
            error_message: "Incorrect credentials",
        });
    }
    //👇🏻 Returns the id if successfuly logged in
    res.json({
        message: "Login successfully",
        id: result[0].id,
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});