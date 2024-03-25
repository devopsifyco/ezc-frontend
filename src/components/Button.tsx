import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ButtonTypeProps } from '../models/Button';
import LinearGradient from 'react-native-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export const Button = ({ onPress, title }: ButtonTypeProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={['#FF0A00', '#FF890B']}
        start={{ x: 0.0, y: 0.5 }}
        end={{ x: 1.0, y: 0.5 }}
        style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export const ButtonIconText = ({ onPress, title, iconProps }: ButtonTypeProps & { iconProps: any }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={['#FF0A00', '#FF890B']}
        start={{ x: 0.0, y: 0.5 }}
        end={{ x: 1.0, y: 0.5 }}
        style={styles.button2}>
        <View style={styles.displayOneline}>
          {iconProps && <FontAwesomeIcon icon={iconProps} size={21} color='#FFFFFF' />}
          <Text style={styles.buttonTextSmall}>{title}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  button2: {
    padding: 10,
    borderRadius: 15,
    marginVertical: 10,
    paddingLeft: 14,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonTextSmall: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  displayOneline: {
    flexDirection: 'row',
    gap: 10,
  }
});

