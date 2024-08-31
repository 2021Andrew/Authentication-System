import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode"; // Corrected the import
import api from "../api";
import { REFRESH_TOKEN, ACCES_TOKEN } from "../constants";
import { useState, useEffect } from "react";

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false)); // Fixed the .cat() typo to .catch()
    }, []);

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                localStorage.setItem(ACCES_TOKEN, res.data.access);
                setIsAuthorized(true); // Fixed the typo in setIsAuthorized
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };

    const auth = async () => {
        const token = localStorage.getItem(ACCES_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000; // Corrected the division by 1000

        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true); // Fixed the typo in setIsAuthorized
        }
    };

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
