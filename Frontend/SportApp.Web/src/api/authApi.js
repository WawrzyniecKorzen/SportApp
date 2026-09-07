import apiClient from "./apiClient";

export async function loginUser(email, password) {
    const response = await apiClient.post("/api/Auth/login", {
        email,
        password
    });

    return response.data;
}