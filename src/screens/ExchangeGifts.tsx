import React from 'react';
import { NavigateType } from '../models/Navigations';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

export default function ExchangeGifts({ navigation }: NavigateType) {
  return (
    <View style={styles.container}>
      <View style={styles.contain}>
        <TouchableOpacity style={styles.object} onPress={() => {
          navigation.navigate("ListGift")
        }}>
          <Image source={require('../assets/images/icon-gift.png')} style={styles.icon} />
          <View>
            <Text style={styles.name}>Gifts</Text>
            <Text style={styles.des}>Receive sustainable green gifts with GP</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.object}>
          <Image source={require('../assets/images/icon-donate.png')}
            style={styles.icon}
          />
          <View>
            <Text style={styles.name}>Donations</Text>
            <Text style={styles.des}>Share green joy with friends by giving away GP green points</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100
  },
  contain: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  object: {
    width: 192,
    height: 192,
    borderColor: "#ccc",
    alignItems: "center",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    elevation: 3,
  },
  icon: {
    marginTop: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginTop: 10,
    display: "flex",
    textAlign: "center"
  },
  des: {
    display: "flex",
    textAlign: "center",
    marginHorizontal: 10,
  }
});
