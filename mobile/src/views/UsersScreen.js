import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useUserViewModel } from '../viewmodels/useUserViewModel';

export default function UsersScreen() {
    const { users, loading, error, fetchDashboardDataConcurrently, createUser, updateUser, deleteUser } = useUserViewModel();
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchDashboardDataConcurrently();
    }, []);

    const handleSave = () => {
        if (!username.trim()) {
            Alert.alert('Error', 'El nombre de usuario es obligatorio');
            return;
        }
        
        // Estructura de datos a enviar
        const userData = { username, email, password };

        if (editingId) {
            updateUser(editingId, userData);
            setEditingId(null);
        } else {
            createUser(userData);
        }
        
        // Limpiar campos
        setUsername('');
        setEmail('');
        setPassword('');
    };

    const handleEdit = (item) => {
        setEditingId(item.id);
        setUsername(item.username || item.name || '');
        setEmail(item.email || '');
        setPassword('');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Usuarios</Text>
            
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Usuario"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Correo electrónico"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder={editingId ? "Nueva contraseña (opcional)" : "Contraseña"}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>{editingId ? 'Actualizar Usuario' : 'Registrar Usuario'}</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.refreshButton} onPress={fetchDashboardDataConcurrently}>
                <Text style={styles.refreshButtonText}>Recargar Datos</Text>
            </TouchableOpacity>

            {loading ? (
                <ActivityIndicator size="large" color="#40739e" style={{ marginTop: 20 }} />
            ) : error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : (
                <FlatList
                    data={users}
                    keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
                    renderItem={({ item }) => (
                        <View style={styles.userCard}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.userName}>{item.username || item.name || 'Usuario'}</Text>
                                <Text style={styles.userEmail}>{item.email || 'Sin correo'}</Text>
                            </View>
                            <View style={styles.actionButtons}>
                                <TouchableOpacity style={styles.editBtn} onPress={() => handleEdit(item)}>
                                    <Text style={styles.btnText}>Editar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.deleteBtn} onPress={() => deleteUser(item.id)}>
                                    <Text style={styles.btnText}>Borrar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 15, backgroundColor: '#f5f6fa' },
    headerTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#2f3640', textAlign: 'center' },
    formContainer: { backgroundColor: '#fff', padding: 10, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#dcdde1' },
    input: { backgroundColor: '#f5f6fa', padding: 10, borderRadius: 6, marginBottom: 8, borderWidth: 1, borderColor: '#dcdde1' },
    saveButton: { backgroundColor: '#a50a83', padding: 10, borderRadius: 6, alignItems: 'center' },
    saveButtonText: { color: '#fff', fontWeight: 'bold' },
    refreshButton: { backgroundColor: '#9e409e', padding: 10, borderRadius: 8, alignItems: 'center', marginBottom: 20, marginTop: 40 },
    refreshButtonText: { color: '#fff', fontWeight: 'bold' },
    userCard: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 8, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#dcdde1' },
    userName: { fontSize: 15, fontWeight: 'bold', color: '#2f3640' },
    userEmail: { fontSize: 13, color: '#718093' },
    actionButtons: { flexDirection: 'row', gap: 5 },
    editBtn: { backgroundColor: '#8d02ff', padding: 8, borderRadius: 6 },
    deleteBtn: { backgroundColor: '#e2303f', padding: 8, borderRadius: 6 },
    btnText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
    errorText: { color: '#e84118', textAlign: 'center', marginTop: 20 },
});