import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

const DATA = {
  name: 'A Tien',
  image: require('../../assets/profile/atien.jpg'),
  flowing: 345,
  flower: 55,
  des: 'Em sống vì cộng đồng nên là thằng nào có tiền thì donate cho tao. Ít thì 5 quả trứng nhiều thì 1 quả tên lửa. Chúng mày nhớ chưa',
  interest: ['Game Online', 'Music', 'Reading Book', 'Foot ball'],
};

export default function ProfileScreen() {
  const {name, image, flower, flowing, des, interest} = DATA;

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image source={image} style={styles.profileImage} />
        <Text style={styles.profileName}>{name}</Text>
        <View style={styles.numberStatus}>
          <View style={styles.itemFlowing}>
            <Text style={styles.itemNumber}>{flowing}</Text>
            <Text style={styles.titleMedium}>Flowing</Text>
          </View>
          <View style={styles.arrowMiddle} />
          <View style={styles.itemFlower}>
            <Text style={styles.itemNumber}>{flower}</Text>
            <Text style={styles.titleMedium}>Flower</Text>
          </View>
        </View>
      </View>
      <Text style={styles.titleLarge}>About me</Text>
      <Text style={styles.description}>{des}</Text>
      <View>
        <Text style={styles.titleLarge}>Interests</Text>
        {interest.map((item, index) => (
          <Text key={index} style={styles.interestItem}>
            {item}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  profile: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#120D26',
  },
  numberStatus: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '50%',
  },
  itemFlowing: {
    alignItems: 'center',
  },
  itemFlower: {
    alignItems: 'center',
  },
  itemNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#120D26',
  },
  description: {
    marginBottom: 16,
    color: '#120D26',
  },
  titleLarge: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#120D26',
  },
  interestItem: {
    fontSize: 14,
    marginBottom: 4,
    color: '#120D26',
  },
  titleMedium: {
    fontSize: 14,
    marginBottom: 4,
    color: '#120D26',
    opacity: 0.5,
  },
  arrowMiddle: {
    width: 1,
    height: 45,
    backgroundColor: '#120D26',
  },
});
