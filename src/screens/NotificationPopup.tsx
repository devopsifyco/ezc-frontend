import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';

interface Props {
  isVisible: boolean;
  onClose: (event: GestureResponderEvent) => void;
  message: string;
}

const NotificationModal = ({ isVisible, onClose, message }: Props) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.popupContainer}>
        <View style={styles.popupContent}>
          <Text style={styles.popupText}>{message}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  popupContent: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '80%',
  },
  popupText: {
    fontSize: 16,
    color: "#000",
    marginBottom: 10,
  },
  popupTime: {
    color: 'gray',
    marginBottom: 10,
  },
  popupDetail: {
    fontSize: 14,
    color: "#000",
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 15,
    alignSelf: 'flex-end',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FF0A00',
  },
  closeButtonText: {
    fontSize: 16,
    color: "#FFF",
  },
});

export default NotificationModal;
