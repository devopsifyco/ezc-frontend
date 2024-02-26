import React from 'react';
import {StyleSheet, Text, Image, TouchableOpacity, View} from 'react-native';
import {ButtonProfileTypeProps} from '../models/Button';

const ButtonProfile2 = ({onPress, title, icon}: ButtonProfileTypeProps) => {
  return (
    <View style={styles.button}>
      <TouchableOpacity onPress={onPress} style={styles.buttonAction}>
        <Image source={icon} style={styles.icon} />
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    backgroundColor: '#FFFFFF',
  },
  buttonText: {
    color: '#FF0A00',
    fontSize: 18,
  },
  icon: {
    width: 24,
    height: 24,
  },
  buttonAction: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ButtonProfile2;
