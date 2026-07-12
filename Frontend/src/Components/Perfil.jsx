import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import "./Perfil.css";

const Perfil = () => {
    const { user, updateUser } = useAuth();

    // Estados nombre
    const [editandoNombre, setEditandoNombre] = useState(false);
    const [nuevoNombre, setNuevoNombre] = useState(user?.nombre || "");

    // Estados email
    const [editandoEmail, setEditandoEmail] = useState(false);
    const [nuevoEmail, setNuevoEmail] = useState(user?.email || "");

    // Estados contraseña
    const [editandoPassword, setEditandoPassword] = useState(false);
    const [nuevoPassword, setNuevoPassword] = useState("");

    // Estados avatar
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const [exito, setExito] = useState("");

    const mostrarExito = (mensaje) => {
        setExito(mensaje);
        setTimeout(() => setExito(""), 3000);
    };

    // Handlers nombre
    const handleGuardarNombre = () => {
        if (nuevoNombre.trim() === "") return;
        updateUser({ nombre: nuevoNombre });
        setEditandoNombre(false);
        mostrarExito("✅ Nombre actualizado correctamente");
    };
    const handleCancelarNombre = () => {
        setNuevoNombre(user?.nombre || "");
        setEditandoNombre(false);
    };

    // Handlers email
    const handleGuardarEmail = () => {
        if (nuevoEmail.trim() === "") return;
        if (!nuevoEmail.includes("@")) {
            mostrarExito("❌ Ingresa un email válido");
            return;
        }
        updateUser({ email: nuevoEmail });
        setEditandoEmail(false);
        mostrarExito("✅ Email actualizado correctamente");
    };
    const handleCancelarEmail = () => {
        setNuevoEmail(user?.email || "");
        setEditandoEmail(false);
    };

    // Handlers password
    const handleGuardarPassword = () => {
        if (nuevoPassword.trim().length < 6) {
            mostrarExito("❌ La contraseña debe tener al menos 6 caracteres");
            return;
        }
        updateUser({ password: nuevoPassword });
        setEditandoPassword(false);
        setNuevoPassword("");
        mostrarExito("✅ Contraseña actualizada correctamente");
    };
    const handleCancelarPassword = () => {
        setNuevoPassword("");
        setEditandoPassword(false);
    };



    // parte de foto y lapiz
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateUser({ foto: reader.result });
                mostrarExito("✅ Foto actualizada correctamente");
            };
            reader.readAsDataURL(file);
        }
        handleClose();
    };

    const handleRemove = () => {
        updateUser({ foto: "" });
        mostrarExito("✅ Foto eliminada");
        handleClose();
    };

    return (
        <div className="perfil-container">
            <div className="perfil-header">
                <h1>Mi Perfil</h1>
                <p>Administra tu información personal</p>
            </div>

            <div className="perfil-card">
                {/* Avatar con lápiz */}
                <div style={{ position: "relative", display: "inline-block" }}>
                    <Avatar
                        alt={user?.nombre}
                        src={user?.foto}
                        sx={{ width: 80, height: 80, fontSize: 32 }}
                    >
                        {user?.nombre?.charAt(0).toUpperCase()}
                    </Avatar>

                    <IconButton
                        size="small"
                        onClick={handleClick}
                        sx={{
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                            backgroundColor: "white",
                            boxShadow: 1,
                        }}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                </div>

                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem>
                        <label style={{ cursor: "pointer" }}>
                            Subir imagen
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleUpload}
                            />
                        </label>
                    </MenuItem>
                    <MenuItem onClick={handleRemove}>Eliminar imagen</MenuItem>
                </Menu>

                <h2 className="perfil-nombre">{user?.nombre}</h2>
                <p className="perfil-email">{user?.email}</p>

                {/* Mensaje éxito/error */}
                {exito && (
                    <div className={`perfil-exito ${exito.startsWith("❌") ? "error" : ""}`}>
                        {exito}
                    </div>
                )}

                {/* Nombre */}
                <div className="perfil-seccion">
                    <label className="perfil-label">Nombre completo</label>
                    {editandoNombre ? (
                        <div className="perfil-editar">
                            <input
                                type="text"
                                value={nuevoNombre}
                                onChange={(e) => setNuevoNombre(e.target.value)}
                                className="perfil-input"
                                autoFocus
                            />
                            <div className="perfil-botones">
                                <button className="btn-guardar" onClick={handleGuardarNombre}>Guardar</button>
                                <button className="btn-cancelar" onClick={handleCancelarNombre}>Cancelar</button>
                            </div>
                        </div>
                    ) : (
                        /* MODIFICADO: Agregamos una tabla simple de una fila para forzar la separación en la misma línea */
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <tbody>
                                <tr>
                                    <td style={{ textAlign: "left", verticalAlign: "middle" }}>
                                        <span style={{ fontSize: "1rem", fontWeight: 500, color: "#1e293b" }}>
                                            {user?.nombre}
                                        </span>
                                    </td>
                                    <td style={{ textAlign: "right", verticalAlign: "middle", width: "1%" }}>
                                        <button className="btn-editar" onClick={() => setEditandoNombre(true)}>
                                            <i className="ti ti-pencil"></i> Editar
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Email */}
                <div className="perfil-seccion">
                    <label className="perfil-label">Email</label>
                    {editandoEmail ? (
                        <div className="perfil-editar">
                            <input
                                type="email"
                                value={nuevoEmail}
                                onChange={(e) => setNuevoEmail(e.target.value)}
                                className="perfil-input"
                                autoFocus
                            />
                            <div className="perfil-botones">
                                <button className="btn-guardar" onClick={handleGuardarEmail}>Guardar</button>
                                <button className="btn-cancelar" onClick={handleCancelarEmail}>Cancelar</button>
                            </div>
                        </div>
                    ) : (
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <tbody>
                                <tr>
                                    <td style={{ textAlign: "left", verticalAlign: "middle" }}>
                                        <span style={{ fontSize: "1rem", fontWeight: 500, color: "#1e293b" }}>
                                            {user?.email}  {/* ← antes decía user?.nombre */}
                                        </span>
                                    </td>
                                    <td style={{ textAlign: "right", verticalAlign: "middle", width: "1%" }}>
                                        <button className="btn-editar" onClick={() => setEditandoEmail(true)}>  {/* ← antes era setEditandoNombre */}
                                            <i className="ti ti-pencil"></i> Editar
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Contraseña */}
                <div className="perfil-seccion">
                    <label className="perfil-label">Contraseña</label>
                    {editandoPassword ? (
                        <div className="perfil-editar">
                            <input
                                type="password"
                                value={nuevoPassword}
                                onChange={(e) => setNuevoPassword(e.target.value)}
                                className="perfil-input"
                                autoFocus
                            />
                            <div className="perfil-botones">
                                <button className="btn-guardar" onClick={handleGuardarPassword}>Guardar</button>
                                <button className="btn-cancelar" onClick={handleCancelarPassword}>Cancelar</button>
                            </div>
                        </div>
                    ) : (
                        <table style={{ width: "100%", borderCollapse: "collapse" }}>
                            <tbody>
                                <tr>
                                    <td style={{ textAlign: "left", verticalAlign: "middle" }}>
                                        <span style={{ fontSize: "1rem", fontWeight: 500, color: "#1e293b" }}>
                                            ********
                                        </span>
                                    </td>
                                    <td style={{ textAlign: "right", verticalAlign: "middle", width: "1%" }}>
                                        <button className="btn-editar" onClick={() => setEditandoPassword(true)}>
                                            <i className="ti ti-pencil"></i> Editar
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Perfil;
