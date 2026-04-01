const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const studentRoutes = require('./routes/studentRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Mongo ERROR:", err));

app.get('/', (req, res) => {
  res.json({ 
    message: '🎓 Student Information System API is running!',
    status: 'Server is healthy',
    timestamp: new Date().toLocaleString(),
    endpoints: {
      students: '/api/students',
      createStudent: 'POST /api/students',
      getAllStudents: 'GET /api/students',
      getStudent: 'GET /api/students/:id',
      updateStudent: 'PUT /api/students/:id',
      deleteStudent: 'DELETE /api/students/:id'
    }
  });
});

app.use('/api/students', studentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('🚀 Server is running!');
  console.log(`📡 Listening on http://localhost:${PORT}`);
  console.log('📚 API Endpoints:');
  console.log('   - GET    /api/students      (Get all students)');
  console.log('   - POST   /api/students      (Create student)');
  console.log('   - GET    /api/students/:id  (Get one student)');
  console.log('   - PUT    /api/students/:id  (Update student)');
  console.log('   - DELETE /api/students/:id  (Delete student)');
  console.log('💡 Press Ctrl+C to stop the server');
});

