const express = require('express');

const userRouter = require('./routers/user');
const categoryRouter = require('./routers/category');
const postRouter = require('./routers/post');

const { errorMiddleware } = require('./middlewares/error');

const app = express();
app.use(express.json());

app.use(userRouter);
app.use(categoryRouter);
app.use(postRouter);

app.use(errorMiddleware);

// eslint-disable-next-line no-console
app.listen(3000, () => console.log('Listening at port 3000'));
