import express from "express";
import morgan from "morgan";


//Routes
import languageRoutes from "./routes/language.routes";
import tareaRoutes from "./routes/tareas.routes";
const app=express();


// Configuraciones 
app.set("port", 4000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use("/api/practica", languageRoutes);
app.use("/api/tarea", tareaRoutes);

export default app;