import { NavLink, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext'; 
import "./MainLayout.css";

const MainLayout = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="layout-container">
      <header className="layout-header">

        {/* Logo */}
        <Link to="/" className="layout-logo-wrapper">
          <div className="layout-logo-icon">📦</div>
          <span className="layout-logo-text">
            Presta<span>Cosa</span>
          </span>
        </Link>

        {/* Navegación */}
        <nav className="layout-nav">
          <ul>
            <li>
              <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
                <i className="ti ti-home" aria-hidden="true"></i>
                <span className="nav-label">Inicio</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/explorar" className={({ isActive }) => (isActive ? "active" : "")}>
                <i className="ti ti-search" aria-hidden="true"></i>
                <span className="nav-label">Explorar</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/mis-objetos" className={({ isActive }) => (isActive ? "active" : "")}>
                <i className="ti ti-package" aria-hidden="true"></i>
                <span className="nav-label">Mis Objetos</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/mis-solicitudes" className={({ isActive }) => (isActive ? "active" : "")}>
                <i className="ti ti-inbox" aria-hidden="true"></i>
                <span className="nav-label">Mis Solicitudes</span>
              </NavLink>
            </li>
            <li>                                          {/* ← agrega */}
              <NavLink to="/solicitudes-recibidas" className={({ isActive }) => (isActive ? "active" : "")}>
                <i className="ti ti-mail" aria-hidden="true"></i>
                <span className="nav-label">Solicitudes Recibidas</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/perfil" className={({ isActive }) => (isActive ? "active" : "")}>
                <i className="ti ti-user" aria-hidden="true"></i>
                <span className="nav-label">Perfil</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Salir */}
        <div className="layout-nav-divider"></div>
        <div className="layout-nav-actions">
          <button onClick={handleLogout}>
            <i className="ti ti-logout"></i>
            Salir
          </button>
        </div>

      </header>

      <main className="layout-main">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;