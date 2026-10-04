import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { fileService } from '../services/fileService';

export const useFileViewModel = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadResult, setUploadResult] = useState(null);
    const [error, setError] = useState(null);

    // Seleccionar archivo o imagen del dispositivo
    const pickFile = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 1,
        });

        if (!result.canceled) {
        setFile(result.assets[0]);
        setUploadResult(null);
        }
    };

    // Subir archivo a la API consumiendo el servicio
    const upload = async () => {
        if (!file) return;
        setUploading(true);
        setError(null);
        try {
        const fileName = file.uri.split('/').pop();
        const match = /\.(\w+)$/.exec(fileName);
        const type = match ? `image/${match[1]}` : `image/jpeg`;

        const response = await fileService.uploadFile(file.uri, fileName, type);
        setUploadResult(response); // Contiene el fileName y la URL retornada por tu backend
        setUploading(false);
        } catch (err) {
        setError('Error al subir el archivo al servidor');
        setUploading(false);
        }
    };

    // Función para limpiar o borrar la pantalla de archivos
    const clearFile = () => {
        setFile(null);
        setUploadResult(null);
        setError(null);
    };
    
    return { file, uploading, uploadResult, error, pickFile, upload , clearFile};
};