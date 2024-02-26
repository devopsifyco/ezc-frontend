import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

export default function ReviewScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <View style={styles.item}>
          <Image
            style={styles.itemAvatar}
            source={require('../../assets/profile/atien.jpg')}
          />
          <View style={styles.itemDetail}>
            <Text style={styles.name}>Tien PM</Text>
            <View style={styles.rateStar}>
              <Image source={require('../../assets/profile/star.png')} />
              <Image source={require('../../assets/profile/star.png')} />
              <Image source={require('../../assets/profile/star.png')} />
              <Image source={require('../../assets/profile/star.png')} />
            </View>
            <Text style={styles.title}>
              Cinemas is the ultimate experience to see new movies in Gold Class
              or Vmax. Find a cinema near you.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, top: 10},
  list: {},
  item: {
    gap: 10,
    flexDirection: 'row',
  },
  name: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemAvatar: {
    width: 30,
    height: 30,
    borderRadius: 100,
  },
  itemDetail: {
    gap: 5,
  },
  rateStar: {
    flexDirection: 'row',
  },
  title: {
    //backgroundColor: 'red',
    width: '45%',
    color: '#000000',
  },
});
