// LoadingSpinner.js
import React from 'react';
import { View, ActivityIndicator, Text, Modal } from 'react-native';

const LoadingSpinner = ({ visible = false, message = 'Loading...' }) => {
  if (!visible) return null;

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.3)',
        }}
      >
        <View
          style={{
            width: 120,
            height: 120,
            backgroundColor: '#fff',
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 8,
          }}
        >
          <ActivityIndicator size="large" color="#F66B04" />
          <Text style={{ marginTop: 10, color: '#451805', fontWeight: '600' }}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default LoadingSpinner;
