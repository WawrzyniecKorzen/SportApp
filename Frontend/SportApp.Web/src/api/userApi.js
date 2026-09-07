import apiClient from "./apiClient";

export async function getCurrentUser() 
{
    const response = await apiClient.get("/api/users/me");

    return response.data;
}