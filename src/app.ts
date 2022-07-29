import express from 'express';
import cors from 'cors';
import routing from './routes/router';
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger/swagger-output');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/api', routing);

export default app;

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`
  ################################################
  🛡️  Server listening on ${PORT} OPEN
  ################################################
`);
});
