const req = require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db.js');
const webRoutes = require('./routes/web.js');
const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());

console.log('Mongo URI:', process.env.MONGO_URI);

connectDB();

app.use('/', webRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})