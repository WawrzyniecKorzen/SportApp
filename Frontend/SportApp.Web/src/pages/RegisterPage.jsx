import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function RegisterPage() 
{
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (event) => 
    {
        event.preventDefault();

        setError("");

        // Rejestrację podłączymy w następnym kroku.
    };
    return (
        <div>
            <h1>{t("register.title")}</h1>

            {error && <p>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">
                        {t("profile.firstName")}
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
                        {t("profile.lastName")}
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
                        {t("profile.email")}
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

                <div>
                    <label htmlFor="password">
                        {t("register.password")}
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

                <button type="submit" disabled={isLoading}>
                    {isLoading
                        ? t("register.registering")
                        : t("register.submit")}
                </button>
            </form>
            <button
                type="button"
                onClick={() => navigate("/login")}
            >
                {t("register.backToLogin")}
            </button>
        </div>
    );
}

export default RegisterPage;