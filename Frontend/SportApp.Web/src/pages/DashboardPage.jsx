import { useAuth } from "../context/AuthContext";

function DashboardPage() {
    const { user, token } = useAuth();

    return (
        <div>
            <h1>Dashboard</h1>

            <p>User: {user ? user.email : "brak"}</p>
            <p>Token: {token ? token : "brak"}</p>
        </div>
    );
}

export default DashboardPage; 