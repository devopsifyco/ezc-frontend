import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ButtonTypeProps} from '../models/Button';
import LinearGradient from 'react-native-linear-gradient';

const Button = ({onPress, title}: ButtonTypeProps) => {
  return (
    <LinearGradient
      colors={['#FF0A00', '#FF890B']}
      start={{x: 0.0, y: 0.5}}
      end={{x: 1.0, y: 0.5}}
      style={styles.button}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Button;
