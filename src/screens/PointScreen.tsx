import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';

const DATA = {
  name: 'Cao Tuyen',
  points: 100,
  avatar: '',
};

export default function PointScreen() {
  const [text, onChangeText] = React.useState('');
  const pointValues = [5, 10, 15, 20, 25, 30];

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <View style={styles.profileInformation}>
          <Text style={[styles.textLarge, styles.textBold]}>Information</Text>
          <Text>{DATA.name}</Text>
          <Text>Your points</Text>
          <Text>{DATA.points}</Text>
        </View>
        <View style={styles.profileAvatar}>
          <Image />
        </View>
      </View>
      <Text style={[styles.textLarge, styles.textBold]}>Transfer to</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Name/ phone / Email"
      />
      <Text style={[styles.textLarge, styles.textBold]}>Set points</Text>
      <View style={styles.setPoints}>
        {pointValues.map((point, index) => (
          <Pressable key={index} style={styles.pointButton}>
            <Text style={styles.point}>{point}</Text>
          </Pressable>
        ))}
      </View>
      <TextInput style={styles.input} placeholder="Enter the point" />
      <Text style={[styles.textLarge, styles.textBold]}>Message</Text>
      <TextInput style={styles.input} placeholder="Message" />
      <TouchableOpacity style={styles.button}>
        <Text style={[styles.buttonText, styles.textLarge, styles.textBold]}>
          Donate Now
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    flexDirection: 'row',
  },
  profileInformation: {},
  profileAvatar: {},
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  textBold: {fontWeight: 'bold'},
  textSmall: {fontSize: 11.5},
  textMedium: {fontSize: 14},
  textLarge: {fontSize: 18},
  textWhite: {color: '#FFFFFF'},
  setPoints: {
    flexDirection: 'row',
  },
  point: {color: '#216C53'},
  pointButton: {
    backgroundColor: '#FFFFFF',
  },
  button: {},
  buttonText: {color: '#FFFFFF'},
});
