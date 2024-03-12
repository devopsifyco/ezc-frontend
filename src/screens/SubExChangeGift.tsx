import React from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { NavigateType } from '../models/Navigations';
import HeaderChallenge from '../components/HeaderChallenge';

export default function ListGift({ navigation }: NavigateType) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <HeaderChallenge navigation={navigation} title='' />
      </View>
      <View style={styles.contain}>
        <TouchableOpacity style={styles.list} onPress={() => {
          navigation.navigate("GiftDetail")
        }}>
          <View style={styles.image}>
            <Image source={require('../assets/images/bag.png')}
            />
          </View>
          <View style={styles.info}>
            <Text style={styles.name}>Fabric bag</Text>
            <View style={styles.pointGroup}>
              <Text style={styles.point}>Points:</Text>
              <Text style={styles.num}>60</Text>
            </View>
            <Text style={styles.des}>Mode of receipt: Receive gifts at the nearest station</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.list} onPress={() => {
          navigation.navigate("GiftDetail")
        }}>
          <View style={styles.image}>
            <Image source={require('../assets/images/note.png')}
            />
          </View>
          <View style={styles.info}>
            <Text style={styles.name}>Notebook</Text>
            <View style={styles.pointGroup}>
              <Text style={styles.point}>Points:</Text>
              <Text style={styles.num}>50</Text>
            </View>
            <Text style={styles.des}>Mode of receipt: Receive gifts at the nearest station</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.list} onPress={() => {
          navigation.navigate("GiftDetail")
        }}>
          <View style={styles.image}>
            <Image source={require('../assets/images/book.png')}
            />
          </View>
          <View style={styles.info}>
            <Text style={styles.name}>Book-The Power of Love</Text>
            <View style={styles.pointGroup}>
              <Text style={styles.point}>Points:</Text>
              <Text style={styles.num}>30</Text>
            </View>
            <Text style={styles.des}>Mode of receipt: Receive gifts at the nearest station</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.list} onPress={() => {
          navigation.navigate("GiftDetail")
        }}>
          <View style={styles.image}>
            <Image source={require('../assets/images/note.png')}
            />
          </View>
          <View style={styles.info}>
            <Text style={styles.name}>Notebook</Text>
            <View style={styles.pointGroup}>
              <Text style={styles.point}>Points:</Text>
              <Text style={styles.num}>30</Text>
            </View>
            <Text style={styles.des}>Mode of receipt: Receive gifts at the nearest station</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView >
  );
}
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginVertical:20
  },
  contain: {
    display: "flex",
    flexDirection: "column",
  },
  list: {
    display: "flex",
    flexDirection: "row",
    borderColor: "#ccc",
    alignItems: "center",
    borderRadius: 15,
    marginHorizontal: 10,
    shadowColor: "#000",
    marginTop: 10,
    borderWidth: 2,
  },
  image: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20
  },
  info: {
    marginLeft: 20,
  },
  name: {
    color: "#216C53"
  },
  pointGroup: {
    display: "flex",
    flexDirection: "row",
  },
  point: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginTop: 10,
  },
  num: {
    color: "#216C53",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  des: {
    marginTop: 10,
    display: "flex",
    flexWrap: "wrap",
    width: 250,
  }
});
