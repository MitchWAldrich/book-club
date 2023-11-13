import express from 'express';
import cors from 'cors';
import { getUserById } from '../src/utils/selectors.js';

const app = express();
const PORT = 4000;
// const PORT = process.env.PORT ||4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const users = [
    {
        id: 1,
        email: 'user1@email.com',
        password: 'password',
        username: 'user1',
        goals: [],
        library: {
            haveRead: [],
            toRead: []
        }
    },
    {
        id: 2,
        email: 'user2@email.com',
        password: 'password',
        username: 'user2',
        goals: [],
        library: {
            haveRead: [],
            toRead: []
        }
    },
    {
        id: 3,
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
        }
    }
];

app.get("/api", (req, res) => {
    res.json({
        message: "Hello world",
    });
});

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

//👇🏻 generates a random string as ID
const generateID = () => Math.random().toString(36).substring(2, 10);

// Register Route
app.post("/api/users", async (req, res) => {
    const { email, password, username } = req.body;
    //👇🏻 holds the ID
    const id = generateID();
    const result = users.filter(
        (user) => user.email === email && user.password === password
    );

    if (result.length === 0) {
        const newUser = { id, email, password, username };
        users.push(newUser);

        return res.json({
            message: "Account created successfully!"
        });
    }

    res.json({
        error_message: "User already exists",
    })
    //👇🏻 logs all the user's credentials to the console.
    console.log({ email, password, username, id });
});

app.patch("/api/users/:id", async (req) => {
    let { id, bookObj, goalObj, status } = req.body;

    const user = users.find(
        (user) => user.id === id
    );
    
   if ( status === 'toRead' ) user.library.toRead.push(bookObj)
   if ( status === 'haveRead' ) user.library.haveRead.push(bookObj)
   user.goals.push(goalObj)

    //👇🏻 logs all the request fields to the console.
    console.log({ id, bookObj });
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