import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "../context/useAuth";

function MainLayout() {
    const { logout } = useAuth();

    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/goodbye");
    };

    return (
        <div>
            <header>
                <h1>SportApp</h1>

                <nav>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                    {" | "}
                    <NavLink to="/training">Treningi</NavLink>
                    {" | "}
                    <NavLink to="/statistics">Statystyki</NavLink>
                    {" | "}
                    <NavLink to="/profile">Profil</NavLink>
                    {" | "}
                    <button type="button" onClick={handleLogout}>
                        Wyloguj
                    </button>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default MainLayout;