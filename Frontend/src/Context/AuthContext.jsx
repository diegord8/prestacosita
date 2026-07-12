/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import API from "../config/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const [error, setError] = useState("");

    const login = async (email, password) => {
        try {
            const res = await fetch(`${API}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "No se pudo iniciar sesión");
                return false;
            }

            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            setError("");

            return true;
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            setError("No se pudo conectar con el servidor");

            return false;
        }
    };

    const register = async (nombre, email, password) => {
        try {
            const res = await fetch(`${API}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombre,
                    email,
                    password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "No se pudo registrar el usuario");
                return false;
            }

            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            setError("");

            return true;
        } catch (error) {
            console.error("Error al registrar:", error);
            setError("No se pudo conectar con el servidor");

            return false;
        }
    };

    const updateUser = async (datos) => {
        try {
            if (!user?.id) {
                setError("No existe un usuario autenticado");
                return false;
            }

            const res = await fetch(`${API}/auth/usuarios/${user.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(datos),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "No se pudo actualizar el usuario");
                return false;
            }

            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            setError("");

            return true;
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            setError("No se pudo conectar con el servidor");

            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        setError("");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                error,
                login,
                register,
                logout,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);