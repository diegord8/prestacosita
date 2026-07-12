// Context/ObjetosContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const API = import.meta.env.VITE_API_URL;
const ObjetosContext = createContext();

export const ObjetosProvider = ({ children }) => {
  const [objetos, setObjetos] = useState([]);

  const cargarObjetos = async () => {
    try {
      const res = await fetch(`${API}/objetos`);
      setObjetos(await res.json());
    } catch {
      console.error("No se pudo conectar con el servidor");
    }
  };

  // Carga inicial desde la base de datos
  useEffect(() => {
    cargarObjetos();
  }, []);

  const agregarObjeto = async (nuevoObjeto) => {
    await fetch(`${API}/objetos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoObjeto),
    });
    await cargarObjetos();
  };

  const editarObjeto = async (id, datosActualizados) => {
    await fetch(`${API}/objetos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datosActualizados),
    });
    await cargarObjetos();
  };

  const eliminarObjeto = async (id) => {
    await fetch(`${API}/objetos/${id}`, { method: "DELETE" });
    await cargarObjetos();
  };

  return (
    <ObjetosContext.Provider value={{ objetos, agregarObjeto, editarObjeto, eliminarObjeto }}>
      {children}
    </ObjetosContext.Provider>
  );
};

export const useObjetos = () => useContext(ObjetosContext);