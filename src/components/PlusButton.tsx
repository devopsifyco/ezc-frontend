// PlusButton.tsx
import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Animated,
  Text,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faGift,
  faPen,
  faMedal,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

export default function PlusButton() {
  const [isExpanded, setIsExpanded] = useState(false);
  const mode = useRef(new Animated.Value(0)).current;
  const buttonSize = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    setIsExpanded(!isExpanded);

    const openingDuration = 500; // Adjust this duration for slower opening
    const closingDuration = 200; // Adjust this duration for faster closing

    if (isExpanded) {
      // Closing animation
      Animated.sequence([
        Animated.timing(mode, {
          toValue: 0,
          duration: closingDuration,
          useNativeDriver: false,
        }),
        Animated.timing(buttonSize, {
          toValue: 1,
          duration: closingDuration,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      // Opening animation
      Animated.parallel([
        Animated.timing(mode, {
          toValue: 1,
          duration: openingDuration,
          useNativeDriver: false,
        }),
        Animated.timing(buttonSize, {
          toValue: 0.95,
          duration: openingDuration,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  const renderSecondaryButton = (icon, offsetX, offsetY, text) => (
    <Animated.View style={{position: 'absolute', left: offsetX, top: offsetY}}>
      <View style={styles.secondaryButton}>
        <FontAwesomeIcon icon={icon} color="#FFFFFF" />
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    </Animated.View>
  );

  const thermometerX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-24, -100],
  });

  const thermometerY = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, -100],
  });

  const timeX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-24, -24],
  });

  const timeY = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, -150],
  });

  const pulseX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-24, 50],
  });

  const pulseY = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, -100],
  });

  const rotation = mode.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  const sizeStyle = {
    transform: [{scale: buttonSize}],
  };

  return (
    <View style={{position: 'absolute', alignItems: 'center'}}>
      {isExpanded &&
        renderSecondaryButton(faMedal, thermometerX, thermometerY, 'Ratings')}
      {isExpanded && renderSecondaryButton(faPen, timeX, timeY, 'Create')}
      {isExpanded && renderSecondaryButton(faGift, pulseX, pulseY, 'Gilf')}

      <Animated.View style={[styles.button, sizeStyle]}>
        <TouchableHighlight onPress={handlePress} underlayColor="#FF890B">
          <Animated.View style={{transform: [{rotate: rotation}]}}>
            <FontAwesomeIcon icon={faPlus} size={24} color="#FFF" />
          </Animated.View>
        </TouchableHighlight>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FF890B',
    position: 'absolute',
    marginTop: -60,
    shadowColor: '#FF890B',
    shadowRadius: 5,
    shadowOffset: {height: 10},
    shadowOpacity: 0.3,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  secondaryButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 65,
    height: 65,
    borderRadius: 28,
    backgroundColor: '#FF890B',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
