// Import Express
import express from 'express';
// Import Multer
import multer from 'multer';
// Import mongoose for DB connect
import mongoose from 'mongoose';
// Import custom validation for users
import { registerValidation, loginValidation } from './validations/auth.js';
// Utilities
import { checkAuth, handleValidationErrors } from './utils/index.js';
// Controllers
import { UserController, PostController } from './controllers/index.js';
// Import custom validation for posts
import {postCreateValidation} from "./validations/post.js";
// Connect to MongoDB
mongoose
    .connect('mongodb+srv://avoit:wwwwww@cluster0.5kzzvkn.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('DB IS CONNECTED'))
    .catch((err) => console.log('DB IS DISCONNECTED', err));

// Init express
const app = express();
// Configuration of Multer
const storage = multer.diskStorage({
   destination: (_, __, cb) => {
       cb(null, 'uploads');
   },
   filename: (_, file, cb) => {
        cb(null, file.originalname);
   }
});
const upload = multer({ storage });

// Express need to know about json
app.use(express.json());
// Check static image and show
app.use('/uploads', express.static('uploads'));

// Auth the user : login
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
// Register post action
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
// Check if user exists / LoggedIn
app.get('/auth/me', checkAuth, UserController.getMe);

// Posts actions
app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, PostController.update);

// Upload Multer requests
app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

// Listen localhost port
app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('SERVER IS CONNECTED');
});