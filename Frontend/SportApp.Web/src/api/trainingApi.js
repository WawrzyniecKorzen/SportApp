import apiClient from "./apiClient";

export async function getTrainings(from, to, type,  page, pageSize, limit) {
    const response = await apiClient.get("/api/Training", { params: { From: from, To: to, Type: type, Page: page, PageSize: pageSize, Limit: limit } });

    return response.data;
}

export async function createTraining(trainingData) {
    const response = await apiClient.post("/api/Training", trainingData );

    return response.data;
}

export async function getTrainingById(id) 
{ 
    const response = await apiClient.get( `/api/Training/${id}` );
    return response.data;
}

export async function updateTraining(id, trainingData) 
{ 
    const response = await apiClient.put( `/api/Training/${id}`, trainingData );
    return response.data; 
}

export async function deleteTraining(id) 
{ 
    const response = await apiClient.delete( `/api/Training/${id}` );
    return response.data;
}

export async function getTrainingStats({ from, to, type } = {}) 
{ 
    const response = await apiClient.get( "/api/Training/stats", { params: { from, to, type } } );
    return response.data;
}