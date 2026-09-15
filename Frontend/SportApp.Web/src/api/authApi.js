import apiClient from "./apiClient";

export async function loginUser(email, password) {
    const response = await apiClient.post("/api/Auth/login", {
        email,
        password
    });

    return response.data;
}

export async function registerUser(firstName, lastName, email, password) {
    const response = await apiClient.post("/api/Auth/register", {
        firstName,
        lastName,
        email,
        password
    });

    return response.data;
}