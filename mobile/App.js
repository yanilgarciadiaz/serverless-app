import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import LoginScreen from './src/views/LoginScreen';
import UsersScreen from './src/views/UsersScreen';
import UploadFileScreen from './src/views/UploadFileScreen';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentTab, setCurrentTab] = useState('users');

  if (!isLoggedIn) {
    return <LoginScreen onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {currentTab === 'users' ? <UsersScreen /> : <UploadFileScreen />}
      </View>

      <View style={styles.navBar}>
        <TouchableOpacity 
          style={[styles.navButton, currentTab === 'users' && styles.activeTab]} 
          onPress={() => setCurrentTab('users')}
        >
          <Text style={styles.navText}>Usuarios</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.navButton, currentTab === 'upload' && styles.activeTab]} 
          onPress={() => setCurrentTab('upload')}
        >
          <Text style={styles.navText}>Archivos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f5f6fa',
    paddingTop: 38 // Margen superior para despejar la cámara y la hora
  },
  content: { 
    flex: 1 
  },
  navBar: { 
    flexDirection: 'row', 
    backgroundColor: '#2f3640', 
    height: 65,
    paddingBottom: 10, // Margen para no chocar con la barra inferior del celular
    borderTopWidth: 1,
    borderTopColor: '#191c21'
  },
  navButton: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  activeTab: { 
    backgroundColor: '#9e4092' 
  },
  navText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
});