// Componentes/SolicitudesRecibidas.jsx
import { useMemo, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useSolicitudes } from "../Context/SolicitudesContext";
import "./SolicitudesRecibidas.css";

const estadoConfig = {
  pendiente:  { color: "amarillo", icono: "ti-clock",        texto: "Pendiente"  },
  aprobada:   { color: "verde",    icono: "ti-circle-check", texto: "Aprobada"   },
  rechazada:  { color: "rojo",     icono: "ti-circle-x",     texto: "Rechazada"  },
  cancelada:  { color: "gris",     icono: "ti-ban",          texto: "Cancelada"  },
};

const SolicitudesRecibidas = () => {
  const { user } = useAuth();
  const { solicitudes, aprobarSolicitud, rechazarSolicitud } = useSolicitudes();
  const [mensajes, setMensajes] = useState({}); // { [id]: { tipo, texto } }

  // Solo las solicitudes sobre MIS objetos
  const solicitudesRecibidas = useMemo(() => {
    return solicitudes.filter((s) => s.propietarioId === user?.id);
  }, [solicitudes, user]);

  // Separadas por estado para mejor organización
  const pendientes = solicitudesRecibidas.filter((s) => s.estado === "pendiente");
  const resueltas  = solicitudesRecibidas.filter((s) => s.estado !== "pendiente");

   const handleAprobar = async (id) => {
    const resultado = await aprobarSolicitud(id);

    setMensajes((prev) => ({ ...prev, [id]: resultado }));

    // Oculta el mensaje a los 4 segundos
    setTimeout(() => {
      setMensajes((prev) => {
        const nuevo = { ...prev };
        delete nuevo[id];
        return nuevo;
      });
    }, 4000);
  };

  const handleRechazar = (id) => {
    rechazarSolicitud(id);
  };

  const renderCard = (sol) => {
    const config = estadoConfig[sol.estado] || estadoConfig.pendiente;
    const mensaje = mensajes[sol.id];

    return (
      <div key={sol.id} className="solrec-card">

        <div className="solrec-card-top">
          <div className="solrec-info">
            <h3>{sol.objetoNombre}</h3>
            <div className="solrec-solicitante">
              <div className="solrec-avatar">
                {sol.solicitanteNombre?.charAt(0)}
              </div>
              <span>{sol.solicitanteNombre}</span>
            </div>
            <div className="solrec-fechas">
              <i className="ti ti-calendar"></i>
              {sol.fechaInicio} → {sol.fechaFin}
            </div>
          </div>

          <div className={`solrec-badge ${config.color}`}>
            <i className={`ti ${config.icono}`}></i>
            {config.texto}
          </div>
        </div>

        {/* Mensaje de conflicto o éxito */}
        {mensaje && (
          <div className={`solrec-mensaje ${mensaje.exito ? "exito" : "error"}`}>
            {mensaje.exito ? "✅" : "❌"} {mensaje.mensaje}
          </div>
        )}

        {/* Botones solo si está pendiente */}
        {sol.estado === "pendiente" && (
          <div className="solrec-acciones">
            <button
              className="btn-aprobar"
              onClick={() => handleAprobar(sol.id)}
            >
              <i className="ti ti-check"></i> Aprobar
            </button>
            <button
              className="btn-rechazar"
              onClick={() => handleRechazar(sol.id)}
            >
              <i className="ti ti-x"></i> Rechazar
            </button>
          </div>
        )}

      </div>
    );
  };

  return (
    <div className="solrec-container">

      <div className="solrec-header">
        <h1>Solicitudes Recibidas</h1>
        <p>Gestiona las solicitudes de préstamo sobre tus objetos</p>
      </div>

      {solicitudesRecibidas.length === 0 ? (
        <div className="solrec-vacio">
          <div className="vacio-icono">
            <i className="ti ti-mail"></i>
          </div>
          <h3>No tienes solicitudes recibidas</h3>
          <p>Cuando alguien solicite tus objetos aparecerán aquí</p>
        </div>
      ) : (
        <>
          {/* Pendientes */}
          {pendientes.length > 0 && (
            <div className="solrec-seccion">
              <h2 className="solrec-seccion-titulo">
                <i className="ti ti-clock"></i>
                Pendientes ({pendientes.length})
              </h2>
              <div className="solrec-lista">
                {pendientes.map(renderCard)}
              </div>
            </div>
          )}

          {/* Resueltas */}
          {resueltas.length > 0 && (
            <div className="solrec-seccion">
              <h2 className="solrec-seccion-titulo resueltas">
                <i className="ti ti-history"></i>
                Historial ({resueltas.length})
              </h2>
              <div className="solrec-lista">
                {resueltas.map(renderCard)}
              </div>
            </div>
          )}
        </>
      )}

    </div>
  );
};

export default SolicitudesRecibidas;