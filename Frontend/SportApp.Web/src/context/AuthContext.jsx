import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) 
        {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
    }, []);

    const login = (authResponse) => 
    {
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

    const logout = () => 
    {
        setUser(null);
        setToken(null);

        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{user, token, login, logout}} >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

export default AuthProvider;