import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { useAuthViewModel } from '../viewmodels/useAuthViewModel';

export default function LoginScreen({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading, error } = useAuthViewModel();

    const handleLogin = async () => {
        const success = await login(username, password);
        if (success) {
        onLoginSuccess();
        }
    };

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <Text style={styles.subtitle}></Text>

        <TextInput
            style={styles.input}
            placeholder="Usuario"
            placeholderTextColor="#aaa"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
        />

        <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
            {loading ? (
            <ActivityIndicator color="#fff" />
            ) : (
            <Text style={styles.buttonText}>Ingresar</Text>
            )}
        </TouchableOpacity>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f6fa' },
    title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 5, color: '#2f3640' },
    subtitle: { fontSize: 14, textAlign: 'center', marginBottom: 30, color: '#718093' },
    input: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#dcdde1' },
    button: { backgroundColor: '#a50a83', padding: 15, borderRadius: 10, alignItems: 'center' },
    buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    errorText: { color: '#e84118', textAlign: 'center', marginBottom: 15 },
});