import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {CustomButtonProps} from '../models/Button';
import LinearGradient from 'react-native-linear-gradient';

const ButtonChallenge = ({
    onPress,
    title,
    colors = ['#FF0A00', '#FF890B'],
    start = { x: 0.5, y: 0.0 },
    end = { x: 0.5, y: 1.0 },
    buttonStyle = {},
    textStyle = {},
  }: CustomButtonProps) => {
    
    return (
      <LinearGradient
        colors={colors}
        start={start}
        end={end}
        style={[styles.button, buttonStyle]}>
        <TouchableOpacity onPress={onPress}>
          <Text style={[styles.buttonText, textStyle]}>{title}</Text>
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

export default ButtonChallenge;
