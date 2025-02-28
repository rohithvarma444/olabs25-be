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
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Increase timeout to 30s
})
.then(() => console.log("✅ MongoDB Connected Successfully"))
.catch(err => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit the process if connection fails
});
// API Routes
app.get('/', (req, res) => {
    res.send('Welcome to the API');
}
);
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