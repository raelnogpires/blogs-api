const express = require('express');
const userRouter = require('./routers/user');
const errorMiddleware = require('./middlewares/error');

const app = express();

app.use(userRouter);
app.use(errorMiddleware);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
