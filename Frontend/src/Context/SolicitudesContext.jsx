// Context/SolicitudesContext.jsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import API from "../config/api";

const SolicitudesContext = createContext();

export const SolicitudesProvider = ({ children }) => {
  const [solicitudes, setSolicitudes] = useState([]);

  const cargarSolicitudes = async () => {
    try {
      const res = await fetch(`${API}/solicitudes`);
      const data = await res.json();

      if (!res.ok) {
        console.error(
          data.error || "No se pudieron cargar las solicitudes"
        );
        return;
      }

      setSolicitudes(data);
    } catch (error) {
      console.error(
        "No se pudo conectar con el servidor:",
        error
      );
    }
  };

  useEffect(() => {
    cargarSolicitudes();
  }, []);

  const crearSolicitud = async (nuevaSolicitud) => {
    try {
      const res = await fetch(`${API}/solicitudes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaSolicitud),
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          exito: false,
          mensaje:
            data.error || "No se pudo crear la solicitud",
        };
      }

      await cargarSolicitudes();

      return {
        exito: true,
        mensaje: "Solicitud creada correctamente",
      };
    } catch (error) {
      console.error("Error al crear solicitud:", error);

      return {
        exito: false,
        mensaje: "No se pudo conectar con el servidor",
      };
    }
  };

  const cancelarSolicitud = async (id) => {
    try {
      const res = await fetch(
        `${API}/solicitudes/${id}/cancelar`,
        {
          method: "PUT",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return {
          exito: false,
          mensaje:
            data.error || "No se pudo cancelar la solicitud",
        };
      }

      await cargarSolicitudes();

      return {
        exito: true,
        mensaje: "Solicitud cancelada correctamente",
      };
    } catch (error) {
      console.error("Error al cancelar solicitud:", error);

      return {
        exito: false,
        mensaje: "No se pudo conectar con el servidor",
      };
    }
  };

  const aprobarSolicitud = async (id) => {
    try {
      const res = await fetch(
        `${API}/solicitudes/${id}/aprobar`,
        {
          method: "PUT",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return {
          exito: false,
          mensaje:
            data.error || "No se pudo aprobar la solicitud",
        };
      }

      await cargarSolicitudes();

      return {
        exito: true,
        mensaje: "Solicitud aprobada correctamente",
      };
    } catch (error) {
      console.error("Error al aprobar solicitud:", error);

      return {
        exito: false,
        mensaje: "No se pudo conectar con el servidor",
      };
    }
  };

  const rechazarSolicitud = async (id) => {
    try {
      const res = await fetch(
        `${API}/solicitudes/${id}/rechazar`,
        {
          method: "PUT",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return {
          exito: false,
          mensaje:
            data.error || "No se pudo rechazar la solicitud",
        };
      }

      await cargarSolicitudes();

      return {
        exito: true,
        mensaje: "Solicitud rechazada correctamente",
      };
    } catch (error) {
      console.error("Error al rechazar solicitud:", error);

      return {
        exito: false,
        mensaje: "No se pudo conectar con el servidor",
      };
    }
  };

  return (
    <SolicitudesContext.Provider
      value={{
        solicitudes,
        cargarSolicitudes,
        crearSolicitud,
        cancelarSolicitud,
        aprobarSolicitud,
        rechazarSolicitud,
      }}
    >
      {children}
    </SolicitudesContext.Provider>
  );
};

export const useSolicitudes = () =>
  useContext(SolicitudesContext);