// Componentes/Explorar.jsx
import { useState } from "react";
import { useObjetos } from "../Context/ObjetosContext";
import { useNavigate } from "react-router-dom";        
import "./Explorar.css";

const categorias = ["Todas", "Herramientas", "Deportes", "Cocina", "Electrónica", "Ropa", "Jardín"];

const Explorar = () => {
  const { objetos } = useObjetos();
  const navigate = useNavigate();                       
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todas");

  // Filtra por categoría y búsqueda
  const objetosFiltrados = objetos
    .filter((obj) => categoria === "Todas" || obj.categoria === categoria)
    .filter((obj) => obj.nombre.toLowerCase().includes(busqueda.toLowerCase()));

  return (
    <div className="explorar-container">

      {/* Título */}
      <div className="explorar-header">
        <h1>Explorar Objetos</h1>
        <p>Encuentra lo que necesitas en tu vecindad</p>
      </div>

      {/* Buscador + Filtro */}
      <div className="explorar-buscador">
        <div className="explorar-input-wrapper">
          <i className="ti ti-search explorar-search-icon"></i>
          <input
            type="text"
            placeholder="Buscar objetos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="explorar-input"
          />
        </div>

        <div className="explorar-filtro-wrapper">
          <i className="ti ti-adjustments-horizontal explorar-filtro-icon"></i>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="explorar-select"
          >
            {categorias.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Resultado vacío */}
      {objetosFiltrados.length === 0 && (
        <div className="explorar-vacio">
          <i className="ti ti-search-off"></i>
          <p>No se encontraron objetos</p>
        </div>
      )}

      {/* Grid de tarjetas */}
      <div className="explorar-grid">
        {objetosFiltrados.map((obj) => (
          <div key={obj.id} className="explorar-card">
            <img
              src={obj.imagen || "https://via.placeholder.com/400x200?text=Sin+imagen"}
              alt={obj.nombre}
              className="explorar-card-img"
            />
            <div className="explorar-card-body">
              <div className="explorar-card-top">
                <h3>{obj.nombre}</h3>
                <span className="explorar-categoria">{obj.categoria}</span>
              </div>
              <p>{obj.descripcion}</p>
              <div className="explorar-card-footer">
                <div className="explorar-usuario">
                  <div className="explorar-avatar">
                    {obj.usuarioNombre?.charAt(0)}
                  </div>
                  <div>
                    <span className="explorar-usuario-nombre">{obj.usuarioNombre}</span>
                    <div className="explorar-rating">
                      <i className="ti ti-star-filled"></i>
                      <span>{obj.rating || "Nuevo"}</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                className="btn-ver-detalle"
                onClick={() => navigate(`/objeto/${obj.id}`)}
              >
                Ver detalle
              </button>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Explorar;