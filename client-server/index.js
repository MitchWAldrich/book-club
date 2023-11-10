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
    },
    {
        id: 2,
        email: 'user2@email.com',
        password: 'password',
        username: 'user2',
    },
    {
        id: 3,
        email: 'user3@email.com',
        password: 'password',
        username: 'user3',
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
    let { id, bookObj } = req.body;

    const user = users.find(
        (user) => user.id === id
    );
    
    user['toRead'] = bookObj;

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