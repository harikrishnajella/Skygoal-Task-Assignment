require('dotenv').config();
const express = require('express');
const DBconnection = require('./config/db');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.listen(PORT, async () => {
    await DBconnection()
    console.log(`Server is running at port: ${PORT}...`)
})