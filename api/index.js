import express from 'express';
import consultasRoutes from './routes/consultas.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", consultasRoutes);

app.listen(8800);