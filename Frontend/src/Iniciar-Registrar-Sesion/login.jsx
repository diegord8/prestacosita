// Componentes/Login.jsx
import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const { login, error } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

        const handleSubmit = async (e) => {
        e.preventDefault();
        const exitoso = await login(form.email, form.password);
        if (exitoso) {
            navigate("/");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">

                {/* Logo */}
                <div className="auth-logo">
                    <div className="auth-logo-icon">📦</div>
                    <span className="auth-logo-text">Presta<span>Cosa</span></span>
                </div>

                <h2 className="auth-title">Bienvenido de vuelta</h2>
                <p className="auth-subtitle">Ingresa a tu cuenta para continuar</p>

                {/* Error */}
                {error && <div className="auth-error">{error}</div>}

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="auth-field">
                        <label htmlFor="email">Email</label>
                        <div className="auth-input-wrapper">
                            <i className="ti ti-mail"></i>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="tu@email.com"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="auth-field">
                        <label htmlFor="password">Contraseña</label>
                        <div className="auth-input-wrapper">
                            <i className="ti ti-lock"></i>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="auth-btn">
                        Iniciar sesión
                    </button>
                </form>

                <p className="auth-redirect">
                    ¿No tienes cuenta?{" "}
                    <Link to="/register">Regístrate aquí</Link>
                </p>

            </div>
        </div>
    );
};

export default Login;
