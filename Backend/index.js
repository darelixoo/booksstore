import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";

const app = express();
dotenv.config();
const FRONTEND_URL = process.env.FRONTEND_URL;
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);

//console.log(process.env.FRONTEND_URL);

app.use(cors({
   //origin: 'https://booksstore-frontend.vercel.app',  // Replace with your frontend URL
    origin: FRONTEND_URL,

   //origin:'http://localhost:5173',
    //methods: 'GET,POST,PUT,DELETE',  // Specify allowed methods
    credentials: true  // If you need to allow credentials (cookies, HTTP authentication)
}));

//app.use(cors());

app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

// connect to mongoDB
try {
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Connected to mongoDB");
} catch (error) {
    console.log("Error: ", error);
}

// defining routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});