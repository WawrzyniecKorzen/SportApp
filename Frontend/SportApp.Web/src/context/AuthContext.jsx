import { useState } from "react";

import { AuthContext } from "./AuthContext";

function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");

        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [token, setToken] = useState(() => {
        return localStorage.getItem("token");
    });

    const login = (authResponse) => {
        const userData = {
            id: authResponse.userId,
            email: authResponse.email,
            firstName: authResponse.firstName,
            lastName: authResponse.lastName
        };

        setUser(userData);
        setToken(authResponse.token);

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", authResponse.token);
    };

    const logout = () => {
        setUser(null);
        setToken(null);

        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

export { AuthContext };