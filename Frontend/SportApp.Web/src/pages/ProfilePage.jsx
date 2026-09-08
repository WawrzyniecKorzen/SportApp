import { useEffect, useState } from "react";

import {
    getCurrentUser,
    updateCurrentUser
} from "../api/userApi";

import { useAuth } from "../context/useAuth";

function ProfilePage() {
    const [user, setUser] = useState(null);
    const { updateUser } = useAuth();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const userData = await getCurrentUser();

                setUser(userData);
                setFirstName(userData.firstName);
                setLastName(userData.lastName);
                setEmail(userData.email);
            } catch (error) {
                console.error("Get current user error:", error);

                setError("Nie udało się pobrać danych użytkownika.");
            } finally {
                setIsLoading(false);
            }
        };

        loadUser();
    }, []);

    const handleEdit = () => {
        setError("");
        setSuccess("");
        setIsEditing(true);
    };

    const handleCancel = () => {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);

        setError("");
        setSuccess("");
        setIsEditing(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setSuccess("");
        setIsSaving(true);

        try {
            const updatedUser = await updateCurrentUser({
                firstName,
                lastName,
                email
            });

            setUser(updatedUser);
            updateUser(updatedUser);

            setFirstName(updatedUser.firstName);
            setLastName(updatedUser.lastName);
            setEmail(updatedUser.email);

            setIsEditing(false);
            setSuccess("Dane użytkownika zostały zapisane.");
        } catch (error) {
            console.error("Update current user error:", error);

            setError("Nie udało się zapisać danych użytkownika.");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return <p>Ładowanie danych użytkownika...</p>;
    }

    return (
        <div>
            <h1>Profil</h1>

            {error && <p>{error}</p>}
            {success && <p>{success}</p>}

            {user && !isEditing && (
                <div>
                    <p>Imię: {user.firstName}</p>
                    <p>Nazwisko: {user.lastName}</p>
                    <p>Email: {user.email}</p>

                    <button type="button" onClick={handleEdit}>
                        Edytuj
                    </button>
                </div>
            )}

            {user && isEditing && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="firstName">
                            Imię
                        </label>

                        <input
                            id="firstName"
                            type="text"
                            value={firstName}
                            onChange={(event) =>
                                setFirstName(event.target.value)
                            }
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="lastName">
                            Nazwisko
                        </label>

                        <input
                            id="lastName"
                            type="text"
                            value={lastName}
                            onChange={(event) =>
                                setLastName(event.target.value)
                            }
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            required
                        />
                    </div>

                    <button type="submit" disabled={isSaving}>
                        {isSaving ? "Zapisywanie..." : "Zapisz"}
                    </button>

                    <button
                        type="button"
                        onClick={handleCancel}
                        disabled={isSaving}
                    >
                        Anuluj
                    </button>
                </form>
            )}
        </div>
    );
}

export default ProfilePage;