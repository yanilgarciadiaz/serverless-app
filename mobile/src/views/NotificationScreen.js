import React from 'react';
import {
    StyleSheet, Text, View, TextInput, TouchableOpacity,
    ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useNotificationViewModel } from '../viewmodels/useNotificationViewModel';

export default function NotificationScreen() {
    const {
        email, setEmail, subject, setSubject, message, setMessage,
        sending, result, send,
    } = useNotificationViewModel();

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <Text style={styles.headerTitle}>Enviar Correo</Text>

            <TextInput
            style={styles.input}
            placeholder="Correo destino"
            placeholderTextColor="#7f8fa6"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            />
            <TextInput
            style={styles.input}
            placeholder="Asunto"
            placeholderTextColor="#7f8fa6"
            value={subject}
            onChangeText={setSubject}
            />
            <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Mensaje"
            placeholderTextColor="#7f8fa6"
            value={message}
            onChangeText={setMessage}
            multiline
            textAlignVertical="top"
            />

            <TouchableOpacity
            style={[styles.sendButton, sending && { opacity: 0.6 }]}
            onPress={send}
            disabled={sending}
            >
            <Text style={styles.sendButtonText}>Enviar</Text>
            </TouchableOpacity>

            {sending && <ActivityIndicator size="large" color="#9e409e" style={{ marginTop: 20 }} />}

            {result && (
            <View style={[styles.resultBox, result.ok ? styles.okBox : styles.errBox]}>
                <Text style={result.ok ? styles.okText : styles.errText}>{result.text}</Text>
            </View>
            )}
        </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: '#f5f6fa', alignItems: 'center', flexGrow: 1 },
    headerTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: '#2f3640' },
    input: {
        width: '100%', backgroundColor: '#fff', borderWidth: 1, borderColor: '#dcdde1',
        borderRadius: 10, padding: 12, fontSize: 15, color: '#2f3640', marginBottom: 12,
    },
    textArea: { height: 130 },
    sendButton: { backgroundColor: '#9e409e', padding: 15, borderRadius: 10, width: '100%', alignItems: 'center', marginTop: 5 },
    sendButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    resultBox: { marginTop: 20, padding: 12, borderRadius: 10, width: '100%' },
    okBox: { backgroundColor: '#d8caf8' },
    errBox: { backgroundColor: '#fadbd8' },
    okText: { color: '#571557', fontWeight: 'bold' },
    errText: { color: '#e84118', fontWeight: 'bold' },
});