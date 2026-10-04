import { userService } from '../services/userService';

export const userRepository = {
    getDashboardData: async () => {
        // Aquí el repositorio coordina las llamadas que consumirá el ViewModel
        const users = await userService.getUsers();
        return users;
    }
};