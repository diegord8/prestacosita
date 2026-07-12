// Context/SolicitudesContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const API = import.meta.env.VITE_API_URL;
const SolicitudesContext = createContext();

export const SolicitudesProvider = ({ children }) => {
  const [solicitudes, setSolicitudes] = useState([]);

  const cargarSolicitudes = async () => {
    try {
      const res = await fetch(`${API}/solicitudes`);
      setSolicitudes(await res.json());
    } catch {
      console.error("No se pudo conectar con el servidor");
    }
  };

  useEffect(() => {
    cargarSolicitudes();
  }, []);

  const crearSolicitud = async (nuevaSolicitud) => {
    await fetch(`${API}/solicitudes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevaSolicitud),
    });
    await cargarSolicitudes();
  };

  const cancelarSolicitud = async (id) => {
    await fetch(`${API}/solicitudes/${id}/cancelar`, { method: "PUT" });
    await cargarSolicitudes();
  };

  const aprobarSolicitud = async (id) => {
    const res = await fetch(`${API}/solicitudes/${id}/aprobar`, { method: "PUT" });
    const data = await res.json();
    await cargarSolicitudes();
    if (!res.ok) {
      return { exito: false, mensaje: data.error };
    }
    return { exito: true, mensaje: "Solicitud aprobada" };
  };

  const rechazarSolicitud = async (id) => {
    await fetch(`${API}/solicitudes/${id}/rechazar`, { method: "PUT" });
    await cargarSolicitudes();
  };

  return (
    <SolicitudesContext.Provider value={{
      solicitudes,
      crearSolicitud,
      cancelarSolicitud,
      aprobarSolicitud,
      rechazarSolicitud,
    }}>
      {children}
    </SolicitudesContext.Provider>
  );
};

export const useSolicitudes = () => useContext(SolicitudesContext);