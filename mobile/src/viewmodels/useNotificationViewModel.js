import { useState } from 'react';
import { notificationService } from '../services/notificationService';

export const useNotificationViewModel = () => {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);
    const [result, setResult] = useState(null); // { ok: boolean, text: string }

    const send = async () => {
    setSending(true);
    setResult(null);
    try {
        await notificationService.sendNotification(email.trim(), subject.trim(), message.trim());
        setResult({ ok: true, text: 'Mensaje enviado correctamente.' });
        setSubject('');
        setMessage('');
    } catch (err) {
        const status = err?.response?.status;
        const backendMsg = err?.response?.data?.message;
      // En validación (400) se muestra el motivo que devuelve el backend
        const text = status === 400 && backendMsg ? backendMsg : 'Error al enviar mensaje.';
        setResult({ ok: false, text });
    } finally {
        setSending(false);
    }
    };

    return { email, setEmail, subject, setSubject, message, setMessage, sending, result, send };
};