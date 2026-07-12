// Componentes/Register.jsx
import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const { register, error } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nombre: "",
        email: "",
        password: "",
        confirmar: "",
    });

    const [errorLocal, setErrorLocal] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmar) {
            setErrorLocal("Las contraseñas no coinciden");
            return;
        }

        setErrorLocal("");
        const exitoso = await register(form.nombre, form.email, form.password);
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

                <h2 className="auth-title">Crear cuenta</h2>
                <p className="auth-subtitle">Únete a tu comunidad de vecinos</p>

                {/* Errores */}
                {(error || errorLocal) && (
                    <div className="auth-error">{errorLocal || error}</div>
                )}

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="auth-field">
                        <label htmlFor="nombre">Nombre completo</label>
                        <div className="auth-input-wrapper">
                            <i className="ti ti-user"></i>
                            <input
                                id="nombre"
                                type="text"
                                name="nombre"
                                placeholder="Tu nombre"
                                value={form.nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

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
                                placeholder="Mínimo 6 caracteres"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="auth-field">
                        <label htmlFor="confirmar">Confirmar contraseña</label>
                        <div className="auth-input-wrapper">
                            <i className="ti ti-lock-check"></i>
                            <input
                                id="confirmar"
                                type="password"
                                name="confirmar"
                                placeholder="Repite tu contraseña"
                                value={form.confirmar}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="auth-btn">
                        Crear cuenta
                    </button>
                </form>

                <p className="auth-redirect">
                    ¿Ya tienes cuenta?{" "}
                    <Link to="/login">Inicia sesión</Link>
                </p>

            </div>
        </div>
    );
};

export default Register;
