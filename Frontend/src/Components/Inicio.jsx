import React from 'react';
import { useAuth } from '../Context/AuthContext';  // ← importa el hook
import "./Inicio.css";

import { useObjetos } from "../Context/ObjetosContext";
import { useNavigate } from "react-router-dom";

const Inicio = () => {
  const { user } = useAuth();
  const { objetos } = useObjetos();
  const navigate = useNavigate();

  // Solo muestra los primeros 3 objetos
  const destacados = objetos.slice(0, 3);

  return (
    <div className="inicio-wrapper">

      {/* Saludo */}
      <div className="inicio-saludo">
        <h1>¡Hola, {user?.nombre}! 👋</h1>
        <p>Bienvenido a tu comunidad de préstamos entre vecinos</p>
      </div>

      {/* Cajas */}
      <div className="feature-cards">
        <div className="feature-card green">
          <i className="ti ti-users"></i>
          <h3>Comunidad Activa</h3>
          <p>Conecta con vecinos y comparte recursos</p>
        </div>
        <div className="feature-card blue">
          <i className="ti ti-trending-up"></i>
          <h3>Ahorra Dinero</h3>
          <p>No compres lo que solo usarás una vez</p>
        </div>
        <div className="feature-card purple">
          <i className="ti ti-sparkles"></i>
          <h3>Sostenible</h3>
          <p>Reduce el consumo y cuida el planeta</p>
        </div>
      </div>

      {/* Objetos Destacados */}
      <div className="inicio-seccion">
        <div className="inicio-seccion-header">
          <div>
            <h2>Objetos Destacados</h2>
            <p>Disponibles ahora en tu vecindad</p>
          </div>
          <button className="btn-ver-todos" onClick={() => navigate("/explorar")}>
            Ver Todos
          </button>
        </div>

        <div className="inicio-grid">
          {destacados.map((obj) => (
            <div key={obj.id} className="inicio-card">
              <img
                src={obj.imagen || "https://via.placeholder.com/400x200?text=Sin+imagen"}
                alt={obj.nombre}
                className="inicio-card-img"
              />
              <div className="inicio-card-body">
                <div className="inicio-card-top">
                  <h3>{obj.nombre}</h3>
                  <span className="inicio-categoria">{obj.categoria}</span>
                </div>
                <p>{obj.descripcion}</p>
                <div className="inicio-card-footer">
                  <div className="inicio-usuario">
                    <div className="inicio-avatar">
                      {obj.usuarioNombre?.charAt(0)}
                    </div>
                    <div>
                      <span className="inicio-usuario-nombre">{obj.usuarioNombre}</span>
                      <div className="inicio-rating">
                        <i className="ti ti-star-filled"></i>
                        <span>{obj.rating || "Nuevo"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carta publicar */}
      <div className="inicio-publicar">
        <h3>¿Tienes algo para prestar?</h3>
        <p>Publica tus objetos y ayuda a tus vecinos mientras generas confianza en la comunidad</p>
        <button className="btn-publicar" onClick={() => navigate("/mis-objetos")}>
          <i className="ti ti-plus"></i> Publicar Objeto
        </button>
      </div>

    </div>
  );
};

export default Inicio;