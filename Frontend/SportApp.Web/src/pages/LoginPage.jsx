import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { loginUser } from "../api/authApi";
import { useAuth } from "../context/useAuth";

function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const { t } = useTranslation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setIsLoading(true);

        try {
            const authResponse = await loginUser(email, password);

            login(authResponse);

            navigate("/dashboard");
        } catch (error) {
            console.error("Login error:", error);

            setError(t("login.error"));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1>{t("login.title")}</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">
                        {t("login.email")}
                    </label>

                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password">
                        {t("login.password")}
                    </label>

                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                        required
                    />
                </div>

                {error && <p>{error}</p>}

                <button type="submit" disabled={isLoading}>
                    {isLoading
                        ? t("login.loggingIn")
                        : t("common.login")}
                </button>
            </form>

            <button
                type="button"
                onClick={() => navigate("/register")}
            >
                {t("login.register")}
            </button>
        </div>
    );
}

export default LoginPage;