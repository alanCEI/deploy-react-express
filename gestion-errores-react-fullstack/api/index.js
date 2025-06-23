import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './db/database.js';
import studentRoutes from './routes/students.routes.js';
import errorHandler from './middlewares/errorHandler.js';

// Conectar a la base de datos MongoDB
connectDB();

const app = express();

app.use(cors());

app.use(express.json());

// Middleware para parsear datos de formularios
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// Rutas
app.get("/", (req, res) => {
  res.send("API para la gestión de estudiantes está funcionando!");
});
app.use("/api", studentRoutes);

// Middleware para manejar errores
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});
