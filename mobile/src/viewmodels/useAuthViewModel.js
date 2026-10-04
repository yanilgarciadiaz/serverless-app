import { useState } from 'react';
import { authService } from '../services/authService';
import { authRepository } from '../repositories/authRepository';

export const useAuthViewModel = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (username, password) => {
        setLoading(true);
        setError(null);
        try {
            const data = await authService.login(username, password);

        // El backend retorna el token (asumiendo que viene en data.token o directo en data)
            const token = data.token || data; 
            await authRepository.saveToken(token);
            setLoading(false);
            return true;
        } catch (err) {
            setError(err.response?.data?.message || 'Error al iniciar sesión');
            setLoading(false);
            return false;
        }
    };

    return { login, loading, error };
};