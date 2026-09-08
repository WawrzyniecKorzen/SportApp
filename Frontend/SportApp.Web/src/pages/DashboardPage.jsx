import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { getCurrentUser } from "../api/userApi";

function DashboardPage() {
    const { t } = useTranslation();

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

                setError(t("dashboard.loadError"));
            }
        };

        loadUser();
    }, [t]);

    return (
        <div>
            <h1>{t("dashboard.title")}</h1>

            {error && <p>{error}</p>}

            {currentUser && (
                <div>
                    <p>
                        {t("dashboard.email")}: {currentUser.email}
                    </p>

                    <p>
                        {t("dashboard.firstName")}: {currentUser.firstName}
                    </p>

                    <p>
                        {t("dashboard.lastName")}: {currentUser.lastName}
                    </p>
                </div>
            )}
        </div>
    );
}

export default DashboardPage;