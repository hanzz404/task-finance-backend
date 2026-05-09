const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/task.routes');
const financeRoutes = require('./routes/finance.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/tasks', taskRoutes);
app.use('/finance', financeRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
});

module.exports = app;

app.get('/', (req, res) => {
  res.send('API is running...')
})