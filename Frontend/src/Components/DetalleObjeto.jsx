// Componentes/DetalleObjeto.jsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useObjetos } from "../Context/ObjetosContext";
import { useSolicitudes } from "../Context/SolicitudesContext";
import "./DetalleObjeto.css";

const DetalleObjeto = () => {
  const { id } = useParams(); // lee el id de la URL 
  const navigate = useNavigate();
  const { user } = useAuth();
  const { objetos } = useObjetos();
  const { crearSolicitud } = useSolicitudes();

  const objeto = objetos.find((obj) => obj.id === parseInt(id));

  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [mensaje, setMensaje] = useState(null); // { tipo: "exito"|"error", texto }

  // Si no existe el objeto
  if (!objeto) {
    return (
      <div className="detalle-container">
        <p>Objeto no encontrado.</p>
        <button onClick={() => navigate("/explorar")}>Volver</button>
      </div>
    );
  }

  const esMiObjeto = objeto.usuarioId === user?.id;

  const handleSolicitar = (e) => {
    e.preventDefault();

    if (fechaInicio >= fechaFin) {
      setMensaje({ tipo: "error", texto: "La fecha de fin debe ser mayor a la de inicio" });
      return;
    }

   crearSolicitud({
    objetoId: objeto.id,
    objetoNombre: objeto.nombre,
    solicitanteId: user.id,
    solicitanteNombre: user.nombre,
    propietarioId: objeto.usuarioId,
    propietarioNombre: objeto.usuarioNombre,  // ← agrega esta línea
    fechaInicio,
    fechaFin,
  });

    setMensaje({ tipo: "exito", texto: "¡Solicitud enviada! El dueño la revisará pronto." });
    setFechaInicio("");
    setFechaFin("");
  };

  return (
    <div className="detalle-container">

      {/* Botón volver */}
      <button className="detalle-volver" onClick={() => navigate("/explorar")}>
        <i className="ti ti-arrow-left"></i> Volver a Explorar
      </button>

      <div className="detalle-grid">

        {/* Imagen */}
        <div className="detalle-imagen-wrapper">
          <img
            src={objeto.imagen || "https://via.placeholder.com/600x400?text=Sin+imagen"}
            alt={objeto.nombre}
            className="detalle-imagen"
          />
          <span className="detalle-categoria">{objeto.categoria}</span>
        </div>

        {/* Info + formulario */}
        <div className="detalle-info">

          <h1>{objeto.nombre}</h1>
          <p className="detalle-descripcion">{objeto.descripcion}</p>

          {/* Dueño */}
          <div className="detalle-dueno">
            <div className="detalle-avatar">{objeto.usuarioNombre?.charAt(0)}</div>
            <div>
              <span className="detalle-dueno-nombre">{objeto.usuarioNombre}</span>
              <div className="detalle-rating">
                <i className="ti ti-star-filled"></i>
                <span>{objeto.rating || "Nuevo"}</span>
              </div>
            </div>
          </div>

          {/* Formulario solicitud — solo si no es mi objeto */}
          {esMiObjeto ? (
            <div className="detalle-propio">
              <i className="ti ti-info-circle"></i>
              Este es tu objeto — no puedes solicitarlo
            </div>
          ) : (
            <div className="detalle-form-card">
              <h2>Solicitar préstamo</h2>

              {mensaje && (
                <div className={`detalle-mensaje ${mensaje.tipo}`}>
                  {mensaje.tipo === "exito" ? "✅" : "❌"} {mensaje.texto}
                </div>
              )}

              <form onSubmit={handleSolicitar} className="detalle-form">
                <div className="form-row">
                  <div className="form-field">
                    <label>Fecha de inicio</label>
                    <input
                      type="date"
                      value={fechaInicio}
                      onChange={(e) => setFechaInicio(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label>Fecha de fin</label>
                    <input
                      type="date"
                      value={fechaFin}
                      onChange={(e) => setFechaFin(e.target.value)}
                      min={fechaInicio || new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn-solicitar">
                  <i className="ti ti-send"></i> Enviar solicitud
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default DetalleObjeto;