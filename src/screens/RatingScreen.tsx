import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';

export default function RatingScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.onptionButton}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Monthly</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>All Time</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listRating}>
        <View style={styles.itemRating}>
          <View style={styles.itemInfo}>
            <Text style={styles.index}>1</Text>
            <Image />
            <View style={styles.InfoDetail}>
              <Text>Ho Xuan Ty</Text>
              <Text>2,500 Challenges</Text>
            </View>
          </View>
          <Image />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  onptionButton: {flexDirection: 'row'},
  button: {},
  buttonText: {},
  listRating: {},
  itemRating: {
    flexDirection: 'row',
  },
  itemInfo: {},
  index: {},
  InfoDetail: {},
});
