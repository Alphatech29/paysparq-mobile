import React, { useEffect, useState } from 'react';
import { View, Text, Animated, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const toastConfig = {
  success: { color: '#4BB543', icon: 'check-circle' },
  error: { color: '#FF4C4C', icon: 'error' },
  info: { color: '#1E90FF', icon: 'info' },
};

const Toast = ({ message, type = 'info', duration = 3000, position = 'bottom', onClose }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(position === 'bottom' ? 50 : -50));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: position === 'bottom' ? 50 : -50,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        if (onClose) onClose();
      });
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  const { color, icon } = toastConfig[type];

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
        position: 'absolute',
        left: 20,
        right: 20,
        [position]: 30,
        backgroundColor: color,
        padding: 16,
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 6,
      }}
    >
      <MaterialIcons
        name={icon}
        size={24}
        color="#fff"
        style={{ marginRight: 12 }}
      />
      <Text style={{ color: '#fff', fontWeight: '600', flex: 1 }}>{message}</Text>
      <TouchableOpacity onPress={onClose}>
        <MaterialIcons name="close" size={20} color="#fff" />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Toast;
