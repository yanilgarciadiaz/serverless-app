import api from './api';

export const notificationService = {
    sendNotification: async (email, subject, message) => {
        const response = await api.post('/notifications/send', { email, subject, message });
        return response.data;
    },
};