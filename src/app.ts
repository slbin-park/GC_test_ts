import express from 'express';
import cors from 'cors';
import routing from './routes/router';
import YAML from 'yamljs';
import path from 'path';
const swaggerUi = require('swagger-ui-express');

const app = express();
const swaggerSpec: any = YAML.load(path.join(__dirname, './swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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
