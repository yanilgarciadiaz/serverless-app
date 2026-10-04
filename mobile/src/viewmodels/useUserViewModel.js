import { useState } from 'react';
import { userService } from '../services/userService';

export const useUserViewModel = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchDashboardDataConcurrently = async () => {
        setLoading(true);
        setError(null);
        try {
            const [usersResponse] = await Promise.all([
                userService.getUsers(),
                userService.getProfile().catch(() => ({})),
                userService.getConfig().catch(() => ({}))
            ]);
            setUsers(usersResponse);
            setLoading(false);
        } catch (err) {
            setError('Error al cargar datos en paralelo desde la API');
            setLoading(false);
        }
    };

    // Métodos CRUD
    const createUser = async (userData) => {
        setLoading(true);
        try {
            await userService.createUser(userData);
            await fetchDashboardDataConcurrently();
        } catch (err) {
            setError('Error al crear el usuario');
            setLoading(false);
        }
    };

    const updateUser = async (id, userData) => {
        setLoading(true);
        try {
            await userService.updateUser(id, userData);
            await fetchDashboardDataConcurrently();
        } catch (err) {
            setError('Error al actualizar el usuario');
            setLoading(false);
        }
    };

    const deleteUser = async (id) => {
        setLoading(true);
        try {
            await userService.deleteUser(id);
            await fetchDashboardDataConcurrently();
        } catch (err) {
            setError('Error al eliminar el usuario');
            setLoading(false);
        }
    };

    return { users, loading, error, fetchDashboardDataConcurrently, createUser, updateUser, deleteUser };
};