import React from 'react';
import {StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {ButtonProfileTypeProps} from '../models/Button';
import LinearGradient from 'react-native-linear-gradient';

const ButtonProfile = ({onPress, title, icon}: ButtonProfileTypeProps) => {
  return (
    <LinearGradient
      colors={['#FF0A00', '#FF890B']}
      start={{x: 0.0, y: 0.5}}
      end={{x: 1.0, y: 0.5}}
      style={styles.button}>
      <TouchableOpacity onPress={onPress} style={styles.buttonAction}>
        <Image source={icon} style={styles.icon} />
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
  },
  icon: {
    width: 24,
    height: 24,
  },
  buttonAction: {flexDirection: 'row', gap: 10, paddingHorizontal: 10},
});

export default ButtonProfile;
