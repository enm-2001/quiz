const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users')
const categoryRoutes = require('./routes/categories')
const questionsRoutes = require('./routes/questions')
const quizRoutes = require('./routes/quiz')

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.json());
app.use(userRoutes)
app.use(categoryRoutes)
app.use(questionsRoutes)
app.use(quizRoutes)

app.listen(5000, () => {
    console.log("Server running on port 5000....");
  });