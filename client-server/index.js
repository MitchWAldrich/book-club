import express from 'express';
import cors from 'cors';

import { getBookClubById, getUserById } from '../src/utils/selectors.js';
import { bookClubsMock } from '../src/mocks/bookClubs.js';
import { usersMock } from '../src/mocks/users.js';

const app = express();
const PORT = 4000;
// const PORT = process.env.PORT ||4000;

// add error handling

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

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
    res.json(
        usersMock
    );
});

app.get("/api/users/:id", (req, res, next) => {
    const id = req.params.id;
    const user = getUserById(usersMock, id)

    res.json({
        user
    });
    next()
  })

// Register Route
app.post("/api/users", async (req, res) => {
    const { email, password, username } = req.body;

    //👇🏻 holds the userID
    const userId = generateID();
    const userSearch = usersMock.filter(
        (user) => user.email === email && user.password === password
    );

    if (userSearch.length === 0) {
        const newUser = { userId, email, password, username };
        usersMock.push(newUser);

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
    let { userId, bookObj, goalObj, readStatus, bookClubId, bookClubApprovalStatus, requestStatus } = req.body;

    const user = usersMock.find(
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
    if (requestStatus === 'request') {
        user.bookClubs.requested.push(bookClubId)
    }
    //👇🏻 logs all the request fields to the console.
    console.log({ userId, bookObj, goalObj });
});


/* *** BOOKCLUBS ROUTES *** */
app.get("/api/bookclubs", (req, res) => {
    res.json(
        bookClubsMock
    );
});

app.get("/api/bookclubs/:id", (req, res) => {
    console.log('params', req.params);
    const bookClubId = req.params.id;
    const bookClub = getBookClubById(bookClubsMock, bookClubId)

    res.json({
        bookClub
    });
});


app.post("/api/bookclubs", async (req, res) => {
    const { bookClubName, bookClubHost } = req.body;

    //👇🏻 holds the bookclub Id
    // make unique
    const bookClubId = generateID();

    const newBookClub = {
        bookClubId: bookClubId,
        bookClubHostId: bookClubHost,
        name: bookClubName,
        members: {invited: [], accepted: []},
        books: {
            currentBook: '',
            nextBook: '',
            upcomingBooks: [],
            previousBooks: [],
        },
        meetings: {
            meetingFrequency: '',
            nextMeetingDate: '',
            nextMeetingTime: '',
            nextMeetingLocation: {
              online: 'N/A',
              inPerson: {
                'streetNumber': '',
                'unitNumber': '',
                'streetName': '',
                'city': '',
                'province': '',
                'country': ''
              }
            }
        },
        isNewBookClub: true, 
    }

    bookClubsMock.push(newBookClub);

    //👇🏻 logs all the user's credentials to the console.
    console.log({ bookClubId, bookClubName });

    return res.json({
        message: "Bookclub created successfully!"
    });
});

app.patch("/api/bookclubs/:id", async (req) => {
    const { bookClubId, newMembers, acceptanceStatus, bookObj, location, requestStatus, userId } = req.body;

    const bookClub = bookClubsMock.find( bookClub => bookClub.bookClubId === bookClubId )

    if (newMembers) {
        if (acceptanceStatus === 'accepted') newMembers.forEach( (member) => {
            bookClub.members.accepted.push(member)
            bookClub.members.invited.splice(bookClub.members.invited.indexOf(member))
        })

        if (acceptanceStatus === 'rejected') newMembers.forEach( (member) => bookClub.members.invited.splice(bookClub.members.invited.indexOf(member)))

        if (location === 'bookClubCreate') newMembers.invited.forEach( (member) => bookClub.members.invited.push(member));
        
        if (requestStatus === 'join') {
            bookClub.members.accepted.push(userId)
        }
    
        if (requestStatus === 'request') {
            bookClub.members.requested.push(userId)
        }
    }

    if (bookObj) {
        bookClub.upcomingBooks.push(bookObj);
    }

    //👇🏻 logs all the request fields to the console.
    console.log({ bookClubId, newMembers });
});

// Login Route
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    //👇🏻 checks if the user exists
    let result = usersMock.filter(
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