const express = require('express');
const connectDB = require('./config/db');

const app = express();

//mongo
connectDB();

//middleware
app.use(express.json({extended: false}));

app.get('/', (req, res) => res.send('API Running'));

//routes
app.use('/api/users', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/vehicles', require('./routes/api/vehicle'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));