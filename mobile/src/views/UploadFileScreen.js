import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useFileViewModel } from '../viewmodels/useFileViewModel';

export default function UploadFileScreen() {
    const { file, uploading, uploadResult, error, pickFile, upload , clearFile } = useFileViewModel();

    return (
        <View style={styles.container}>
        <Text style={styles.headerTitle}>Subida de Archivos</Text>

        <TouchableOpacity style={styles.selectButton} onPress={pickFile}>
            <Text style={styles.selectButtonText}>Seleccionar Imagen</Text>
        </TouchableOpacity>

        {file && (
            <View style={styles.previewContainer}>
            <Text style={styles.fileName}>Archivo: {file.uri.split('/').pop()}</Text>
            {file.uri.match(/\.(jpeg|jpg|png)$/i) && (
                <Image source={{ uri: file.uri }} style={styles.imagePreview} />
            )}
            </View>
        )}

        {file && !uploading && (
            <TouchableOpacity style={styles.uploadButton} onPress={upload}>
            <Text style={styles.uploadButtonText}>Subir</Text>
            </TouchableOpacity>
        )}

        {uploading && <ActivityIndicator size="large" color="#40739e" style={{ marginTop: 20 }} />}

        {uploadResult && (
            <View style={styles.successContainer}>
            <Text style={styles.successTitle}>¡Subido con éxito!</Text>
            <Text style={styles.successText}>Archivo: {uploadResult.fileName}</Text>
            <Text style={styles.successUrl} numberOfLines={2}>URL: {uploadResult.url}</Text>
            </View>
        )}

        {(file || uploadResult) && (
                <TouchableOpacity style={styles.clearButton} onPress={clearFile}>
                    <Text style={styles.clearButtonText}>Limpiar Pantalla</Text>
                </TouchableOpacity>
        )}

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f5f6fa', alignItems: 'center' },
    headerTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: '#2f3640' },
    selectButton: { backgroundColor: '#9e409e', padding: 15, borderRadius: 10, width: '100%', alignItems: 'center', marginBottom: 15 },
    selectButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    previewContainer: { width: '100%', alignItems: 'center', marginBottom: 15 },
    fileName: { fontSize: 14, color: '#2f3640', marginBottom: 10 },
    imagePreview: { width: 150, height: 150, borderRadius: 10, borderWidth: 1, borderColor: '#dcdde1' },
    uploadButton: { backgroundColor: '#a50a83', padding: 15, borderRadius: 10, width: '100%', alignItems: 'center', marginBottom: 10 },
    uploadButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    clearButton: { backgroundColor: '#8d02ff', padding: 12, borderRadius: 10, width: '100%', alignItems: 'center', marginTop: 15 },
    clearButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
    successContainer: { marginTop: 15, padding: 12, backgroundColor: '#d8caf8', borderRadius: 10, width: '100%' },
    successTitle: { fontWeight: 'bold', color: '#571557', marginBottom: 5 },
    successText: { color: '#571557', fontSize: 12 },
    successUrl: { color: '#004085', fontSize: 11, marginTop: 5 },
    errorText: { color: '#e84118', marginTop: 15 },
});