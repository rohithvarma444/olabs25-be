const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));




//app.use('/api/auth', authRoutes);
//app.use('/api/sections', sectionRoutes);
//app.use('/api/quizzes', quizRoutes);
//app.use('/api/forum', forumRoutes);
//app.use('/api/rooms', roomRoutes);
//app.use('/api/deploy', deployRoutes);

app.use(cors());

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
