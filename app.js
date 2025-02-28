const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const sectionRoutes = require('./routes/sectionRoutes.js');
const subSectionRoutes = require('./routes/subSectionRoutes'); // Added subsection routes

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Ensure JSON body parsing

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/subsections', subSectionRoutes); // Added subsections route

// Commented out until implemented
// const quizRoutes = require('./routes/quizzes');
// const forumRoutes = require('./routes/forum');
// const roomRoutes = require('./routes/rooms');
// const deployRoutes = require('./routes/deploy');
// app.use('/api/quizzes', quizRoutes);
// app.use('/api/forum', forumRoutes);
// app.use('/api/rooms', roomRoutes);
// app.use('/api/deploy', deployRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});