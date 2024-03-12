import React from 'react';
import { NavigateType } from '../models/Navigations';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import HeaderChallenge from '../components/HeaderChallenge';

export default function GiftDetail({ navigation }: NavigateType) {
  const handleExchangeGift = () => {
    console.log('Exchange Gift button pressed');
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <HeaderChallenge navigation={navigation} title='' />
      </View>
      <View style={styles.contain}>
        <View style={styles.image}>
          <Image source={require('../assets/images/book-detail.png')} />
        </View>
        <View style={styles.list}>
          <View style={styles.info}>
            <Text style={styles.name}>Book-The Power of Love</Text>
            <View style={styles.detailGroup} >
              <View style={styles.textGroup}>
                <Text style={styles.point}>Points:</Text>
                <Text style={styles.num}>30</Text>
              </View>
              <Image source={require('../assets/images/line-detail.png')}
                style={styles.line} />
              <View style={styles.textGroup}>
                <Text style={styles.title}>Mode of receipt:</Text>
                <Text style={styles.textMode}>Receive gifts at the nearest station</Text>
              </View>
            </View>
            <View>
              <Text style={styles.des}>The Power of Love is a potent remedy for all that blocks our deepest yearnings both to love and receive love. Filled with grounded truth, sage wisdom, and profoundly healing energy—if you are ready to experience a transformational shift and find freedom of fear and old habits, this book is for you.</Text>
              <Text style={styles.readMore}>Read more</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.exchangeButton} onPress={handleExchangeGift}>
          <Text style={styles.exchangeButtonText}>Exchange Gift</Text>
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
    alignItems: "center",
  },
  image: {
    marginBottom: 10,
    alignItems: "center"
  },
  info: {
    marginLeft: 20,
  },
  name: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold"
  },
  detailGroup: {
    display: "flex",
    flexDirection: "row"
  },
  textGroup: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 50
  },
  point: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginTop: 10
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginTop: 10
  },
  num: {
    color: "#216C53",
    fontSize: 16,
    fontWeight: "bold",
  },
  line: {
    marginLeft: 50,
    marginTop: 10
  },
  textMode: {
    display: "flex",
    flexWrap: "wrap",
    width: 200,
  },
  des: {
    fontSize: 16,
    marginRight: 20,
    color: "#000"
  },
  readMore: {
    fontSize: 16,
    color: "#216C53"
  },
  exchangeButton: {
    backgroundColor: "#FF0A00",
    padding: 18,
    borderRadius: 30,
    marginTop: 140,
    width: 200,
    marginLeft: "auto",
    marginRight: "auto"
  },
  exchangeButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  },
});
