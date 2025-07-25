const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
connectDB(); // Connect to MongoDB
dotenv.config();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/permits', require('./Routes/permitRoute'));
app.use('/api/auth', require('./Routes/authRoute'));
app.use('/api/boats', require('./Routes/boatRoute'));
app.use('/api/fishers', require('./Routes/fisherRoute'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});