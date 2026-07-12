// Componentes/MisObjetos.jsx
import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useObjetos } from "../Context/ObjetosContext";
import "./MisObjetos.css";

const categorias = ["Herramientas", "Deportes", "Cocina", "Electrónica", "Ropa", "Jardín"];

const formInicial = {
  nombre: "",
  descripcion: "",
  categoria: "",
  imagen: "",
};

const MisObjetos = () => {
  const { user } = useAuth();
  const { objetos, agregarObjeto, editarObjeto, eliminarObjeto } = useObjetos();

  const [mostrarForm, setMostrarForm] = useState(false);
  const [form, setForm] = useState(formInicial);
  const [editandoId, setEditandoId] = useState(null); // null = agregando, número = editando

  // Filtra solo los objetos del usuario logueado
  const misObjetos = objetos.filter((obj) => obj.usuarioId === user?.id);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editandoId !== null) {
      // Modo edición
      editarObjeto(editandoId, form);
    } else {
      // Modo agregar
      agregarObjeto({
        ...form,
        usuarioId: user.id,
        usuarioNombre: user.nombre,
      });
    }

    setForm(formInicial);
    setMostrarForm(false);
    setEditandoId(null);
  };

  const handleEditar = (obj) => {
    setForm({
      nombre: obj.nombre,
      descripcion: obj.descripcion,
      categoria: obj.categoria,
      imagen: obj.imagen,
    });
    setEditandoId(obj.id);
    setMostrarForm(true);
  };

  const handleCancelar = () => {
    setForm(formInicial);
    setMostrarForm(false);
    setEditandoId(null);
  };

  return (
    <div className="misobjetos-container">

      {/* Header */}
      <div className="misobjetos-header">
        <div>
          <h1>Mis Objetos</h1>
          <p>Gestiona los objetos que tienes disponibles para prestar</p>
        </div>
        <button
          className="btn-publicar"
          onClick={() => setMostrarForm(true)}
        >
          <i className="ti ti-plus"></i> Publicar Objeto
        </button>
      </div>

      {/* Formulario publicar/editar */}
      {mostrarForm && (
        <div className="misobjetos-form-card">
          <h2>{editandoId !== null ? "Editar Objeto" : "Publicar Objeto"}</h2>

          <form onSubmit={handleSubmit} className="misobjetos-form">
            <div className="form-field">
              <label>Nombre</label>
              <input
                type="text"
                name="nombre"
                placeholder="Ej: Taladro Eléctrico"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label>Descripción</label>
              <textarea
                name="descripcion"
                placeholder="Describe el objeto..."
                value={form.descripcion}
                onChange={handleChange}
                required
                rows={3}
              />
            </div>

            <div className="form-field">
              <label>Categoría</label>
              <select
                name="categoria"
                value={form.categoria}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona una categoría</option>
                {categorias.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label>URL de imagen</label>
              <input
                type="text"
                name="imagen"
                placeholder="https://..."
                value={form.imagen}
                onChange={handleChange}
              />
            </div>

            <div className="form-botones">
              <button type="submit" className="btn-guardar">
                {editandoId !== null ? "Guardar Cambios" : "Publicar"}
              </button>
              <button type="button" className="btn-cancelar" onClick={handleCancelar}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de objetos o estado vacío */}
      {misObjetos.length === 0 && !mostrarForm ? (
        <div className="misobjetos-vacio">
          <div className="vacio-icono">
            <i className="ti ti-box"></i>
          </div>
          <h3>No tienes objetos publicados</h3>
          <p>Publica tu primer objeto y empieza a ayudar a tu comunidad</p>
          <button className="btn-publicar" onClick={() => setMostrarForm(true)}>
            <i className="ti ti-plus"></i> Publicar Objeto
          </button>
        </div>
      ) : (
        <div className="misobjetos-grid">
          {misObjetos.map((obj) => (
            <div key={obj.id} className="misobjetos-card">
              <img
                src={obj.imagen || "https://via.placeholder.com/400x200?text=Sin+imagen"}
                alt={obj.nombre}
                className="card-imagen"
              />
              <div className="card-body">
                <div className="card-top">
                  <h3>{obj.nombre}</h3>
                  <span className="card-categoria">{obj.categoria}</span>
                </div>
                <p>{obj.descripcion}</p>
                <div className="card-acciones">
                  <button className="btn-editar" onClick={() => handleEditar(obj)}>
                    <i className="ti ti-pencil"></i> Editar
                  </button>
                  <button className="btn-eliminar" onClick={() => eliminarObjeto(obj.id)}>
                    <i className="ti ti-trash"></i> Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default MisObjetos;