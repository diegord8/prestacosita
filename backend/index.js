require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");

const app = express();

const normalizarOrigen = (origen) => {
  return origen.trim().replace(/\/+$/, "");
};

const allowedOrigins = (
  process.env.FRONTEND_URLS || "http://localhost:5173"
)
  .split(",")
  .map(normalizarOrigen)
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Permite Postman, Thunder Client y peticiones sin Origin
      if (!origin) {
        return callback(null, true);
      }

      const origenNormalizado = normalizarOrigen(origin);

      if (allowedOrigins.includes(origenNormalizado)) {
        return callback(null, true);
      }

      const error = new Error("Origen no permitido por CORS");
      error.status = 403;

      return callback(error);
    },

    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// Ruta principal
app.get("/", (req, res) => {
  return res.status(200).json({
    ok: true,
    mensaje: "API de PrestaCosa funcionando correctamente",
  });
});

// Comprueba servidor y conexión con Neon
app.get("/health", async (req, res) => {
  try {
    await sequelize.authenticate();

    return res.status(200).json({
      ok: true,
      servidor: "activo",
      baseDeDatos: "conectada",
    });
  } catch (error) {
    console.error(
      "Error de conexión con la base de datos:",
      error.message
    );

    return res.status(500).json({
      ok: false,
      servidor: "activo",
      baseDeDatos: "desconectada",
      mensaje: error.message,
    });
  }
});

// Rutas
app.use(
  "/api/auth",
  require("./routes/auth")
);

app.use(
  "/api/objetos",
  require("./routes/objetos")
);

app.use(
  "/api/solicitudes",
  require("./routes/solicitudes")
);

// Ruta inexistente
app.use((req, res) => {
  return res.status(404).json({
    ok: false,
    mensaje: `La ruta ${req.method} ${req.originalUrl} no existe`,
  });
});

// Manejador de errores
app.use((error, req, res, next) => {
  console.error("Error del servidor:", error.message);

  const status = error.status || 500;

  return res.status(status).json({
    ok: false,
    mensaje:
      status === 403
        ? "El origen del frontend no está permitido por CORS"
        : "Ocurrió un error interno en el servidor",
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `API de PrestaCosa corriendo en el puerto ${PORT}`
  );

  console.log(
    `Entorno actual: ${process.env.NODE_ENV || "development"}`
  );
});