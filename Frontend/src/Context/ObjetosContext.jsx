// Context/ObjetosContext.jsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import API from "../config/api";

const ObjetosContext = createContext();

export const ObjetosProvider = ({ children }) => {
  const [objetos, setObjetos] = useState([]);

  const cargarObjetos = async () => {
    try {
      const res = await fetch(`${API}/objetos`);
      const data = await res.json();

      if (!res.ok) {
        console.error(
          data.error || "No se pudieron cargar los objetos"
        );
        return;
      }

      setObjetos(data);
    } catch (error) {
      console.error(
        "No se pudo conectar con el servidor:",
        error
      );
    }
  };

  useEffect(() => {
    cargarObjetos();
  }, []);

  const agregarObjeto = async (nuevoObjeto) => {
    try {
      const res = await fetch(`${API}/objetos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoObjeto),
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          exito: false,
          mensaje:
            data.error || "No se pudo registrar el objeto",
        };
      }

      await cargarObjetos();

      return {
        exito: true,
        mensaje: "Objeto registrado correctamente",
      };
    } catch (error) {
      console.error("Error al registrar objeto:", error);

      return {
        exito: false,
        mensaje: "No se pudo conectar con el servidor",
      };
    }
  };

  const editarObjeto = async (id, datosActualizados) => {
    try {
      const res = await fetch(`${API}/objetos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosActualizados),
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          exito: false,
          mensaje:
            data.error || "No se pudo actualizar el objeto",
        };
      }

      await cargarObjetos();

      return {
        exito: true,
        mensaje: "Objeto actualizado correctamente",
      };
    } catch (error) {
      console.error("Error al actualizar objeto:", error);

      return {
        exito: false,
        mensaje: "No se pudo conectar con el servidor",
      };
    }
  };

  const eliminarObjeto = async (id) => {
    try {
      const res = await fetch(`${API}/objetos/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          exito: false,
          mensaje:
            data.error || "No se pudo eliminar el objeto",
        };
      }

      await cargarObjetos();

      return {
        exito: true,
        mensaje: "Objeto eliminado correctamente",
      };
    } catch (error) {
      console.error("Error al eliminar objeto:", error);

      return {
        exito: false,
        mensaje: "No se pudo conectar con el servidor",
      };
    }
  };

  return (
    <ObjetosContext.Provider
      value={{
        objetos,
        cargarObjetos,
        agregarObjeto,
        editarObjeto,
        eliminarObjeto,
      }}
    >
      {children}
    </ObjetosContext.Provider>
  );
};

export const useObjetos = () =>
  useContext(ObjetosContext);