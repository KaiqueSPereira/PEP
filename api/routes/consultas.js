import express from 'express';
import { getConsultas } from '../controllers/consultas.js';

const router = express.Router();

router.get('/', getConsultas);


export default router