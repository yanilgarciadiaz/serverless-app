import api from './api';

export const fileService = {
    uploadFile: async (fileUri, fileName, fileType) => {
    const formData = new FormData();
    formData.append('file', {
        uri: fileUri,
        name: fileName,
        type: fileType || 'text/plain',
    });

    const response = await api.post('/files/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data; // Retorna el fileName y la url
    },
};