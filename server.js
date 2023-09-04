const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define routes
const taskRoutes = require('./routes/task');
app.use('/api/tasks', taskRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
