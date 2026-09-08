import apiClient from "./apiClient";

export async function getTrainings() {
    const response = await apiClient.get("/api/Training");

    return response.data;
}