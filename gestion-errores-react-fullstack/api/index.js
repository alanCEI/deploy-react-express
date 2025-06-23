import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './db/database.js';
import studentRoutes from './routes/students.routes.js';
import errorHandler from './middlewares/errorHandler.js';

// Conectar a la base de datos MongoDB
connectDB();

const app = express();

// Middleware para permitir peticiones desde otros orígenes (CORS)
app.use(cors());

// Middleware para parsear el cuerpo de las peticiones a JSON
app.use(express.json());

// Middleware para parsear datos de formularios
app.use(express.urlencoded({ extended: true }));

// Middleware para servir archivos estáticos
app.use(express.static("public"));

// Rutas de la API
app.get("/", (req, res) => {
  res.send("API para la gestión de estudiantes está funcionando!");
});
app.use("/api", studentRoutes);

// Middleware para manejar errores
app.use(errorHandler);

// Usar el puerto definido en las variables de entorno, o el 4000 por defecto
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});
