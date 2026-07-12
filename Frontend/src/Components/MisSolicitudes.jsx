// Componentes/MisSolicitudes.jsx
import { useMemo } from "react";
import { useAuth } from "../Context/AuthContext";
import { useSolicitudes } from "../Context/SolicitudesContext";
import "./MisSolicitudes.css";

const estadoConfig = {
  pendiente:  { color: "amarillo", icono: "ti-clock",        texto: "Pendiente"  },
  aprobada:   { color: "verde",    icono: "ti-circle-check", texto: "Aprobada"   },
  rechazada:  { color: "rojo",     icono: "ti-circle-x",     texto: "Rechazada"  },
  cancelada:  { color: "gris",     icono: "ti-ban",          texto: "Cancelada"  },
};

const MisSolicitudes = () => {
  const { user } = useAuth();
  const { solicitudes, cancelarSolicitud } = useSolicitudes();

  // Solo las solicitudes que YO envié
  const misSolicitudes = useMemo(() => {
    return solicitudes.filter((s) => s.solicitanteId === user?.id);
  }, [solicitudes, user]);

  return (
    <div className="missol-container">

      <p>usuario: {user?.nombre}</p>
      <p>total solicitudes: {solicitudes?.length}</p>
      <p>mis solicitudes: {misSolicitudes?.length}</p>

      <div className="missol-header">
        <h1>Mis Solicitudes</h1>
        <p>Solicitudes de préstamo que has enviado</p>
      </div>

      {misSolicitudes.length === 0 ? (
        <div className="missol-vacio">
          <div className="vacio-icono">
            <i className="ti ti-inbox"></i>
          </div>
          <h3>No tienes solicitudes enviadas</h3>
          <p>Explora objetos y solicita los que necesites</p>
        </div>
      ) : (
        <div className="missol-lista">
          {misSolicitudes.map((sol) => {
            const config = estadoConfig[sol.estado] || estadoConfig.pendiente;
            return (
              <div key={sol.id} className="missol-card">
                <div className="missol-card-top">
                  <div className="missol-info">
                    <h3>{sol.objetoNombre}</h3>
                    <div className="missol-fechas">
                      <i className="ti ti-calendar"></i>
                      {sol.fechaInicio} → {sol.fechaFin}
                    </div>
                    <div className="missol-propietario">
                      <i className="ti ti-user"></i>
                      Dueño: {sol.propietarioNombre || "Usuario"}
                    </div>
                  </div>
                  <div className={`missol-badge ${config.color}`}>
                    <i className={`ti ${config.icono}`}></i>
                    {config.texto}
                  </div>
                </div>
                {sol.estado === "pendiente" && (
                  <div className="missol-card-footer">
                    <button
                      className="btn-cancelar-sol"
                      onClick={() => cancelarSolicitud(sol.id)}
                    >
                      <i className="ti ti-x"></i> Cancelar solicitud
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

export default MisSolicitudes;