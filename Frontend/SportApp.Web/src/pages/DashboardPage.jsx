import { useEffect, useState } from "react";

import { getCurrentUser } from "../api/userApi";

function DashboardPage() {
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadUser = async () => {
            try {
                const user = await getCurrentUser();

                console.log("Current user:", user);

                setCurrentUser(user);
            } catch (error) {
                console.error("Get current user error:", error);

                setError("Nie udało się pobrać danych użytkownika.");
            }
        };

        loadUser();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>

            {error && <p>{error}</p>}

            {currentUser && (
                <div>
                    <p>Email: {currentUser.email}</p>
                    <p>Imię: {currentUser.firstName}</p>
                    <p>Nazwisko: {currentUser.lastName}</p>
                </div>
            )}
        </div>
    );
}

export default DashboardPage;