import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import HeaderChallenge from '../components/HeaderChallenge';
import { NavigateType } from '../models/Navigations';

export default function RatingScreen({ navigation }: NavigateType) {
  const [selectedOption, setSelectedOption] = useState('Monthly');

  const handleOptionPress = ({ option }: any) => {
    setSelectedOption(option);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeaderChallenge navigation={navigation} title='Ratings' />
      </View>
      <View style={styles.optionButton}>
        <TouchableOpacity
          style={[styles.button, selectedOption === 'Monthly' && styles.selectedButton]}
          onPress={() => handleOptionPress('Monthly')}>
          <Text style={[styles.buttonText, selectedOption === 'Monthly' && styles.selectedButtonText]}>Monthly</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, selectedOption === 'AllTime' && styles.selectedButton]}
          onPress={() => handleOptionPress('AllTime')}>
          <Text style={[styles.buttonText, selectedOption === 'AllTime' && styles.selectedButtonText]}>All Time</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containList}>
        <View style={styles.listRating}>
          <View style={styles.itemRating}>
            <View style={styles.itemInfo}>
              <View style={styles.circularContainer}>
                <Text style={styles.index}>1</Text>
              </View>
              <View style={styles.InfoDetail}>
                <Image source={require('../assets/profile/ty.png')}
                  style={styles.avatar}
                />
                <View>
                  <Text style={styles.name}>Ho Xuan Ty</Text>
                  <Text style={styles.challengename}>2,500 Challenges</Text>
                </View>
                <View style={styles.hexagonContainer}>
                  <Image
                    source={require('../assets/icons/icon-ranking1.png')}
                    style={styles.mouthIcon}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.listRating}>
          <View style={styles.itemRating}>
            <View style={styles.itemInfo}>
              <View style={styles.circularContainer}>
                <Text style={styles.index}>2</Text>
              </View>
              <View style={styles.InfoDetail}>
                <Image source={require('../assets/profile/avatar2.jpg')}
                  style={styles.avatar}
                />
                <View>
                  <Text style={styles.name}>Cao Tuyen</Text>
                  <Text style={styles.challengename}>2,500 Challenges</Text>
                </View>
                <View style={styles.hexagonContainer}>
                  <Image
                    source={require('../assets/icons/icon-ranking2.png')}
                    style={styles.mouthIcon}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.listRating}>
          <View style={styles.itemRating}>
            <View style={styles.itemInfo}>
              <View style={styles.circularContainer}>
                <Text style={styles.index}>3</Text>
              </View>
              <View style={styles.InfoDetail}>
                <Image source={require('../assets/profile/ranking.png')}
                  style={styles.avatar}
                />
                <View>
                  <Text style={styles.name}>Minh Quan</Text>
                  <Text style={styles.challengename}>2,500 Challenges</Text>
                </View>
                <View style={styles.hexagonContainer}>
                  <Image
                    source={require('../assets/icons/icon-ranking3.png')}
                    style={styles.mouthIcon}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.listRating}>
          <View style={styles.itemRating}>
            <View style={styles.itemInfo}>
              <View style={styles.circularContainer}>
                <Text style={styles.index}>4</Text>
              </View>
              <View style={styles.InfoDetail}>
                <Image source={require('../assets/profile/atien.jpg')}
                  style={styles.avatar}
                />
                <View>
                  <Text style={styles.name}>Tien</Text>
                  <Text style={styles.challengename}>2,500 Challenges</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.listRating}>
          <View style={styles.itemRating}>
            <View style={styles.itemInfo}>
              <View style={styles.circularContainer}>
                <Text style={styles.index}>5</Text>
              </View>
              <View style={styles.InfoDetail}>
                <Image source={require('../assets/profile/avatar2.jpg')}
                  style={styles.avatar}
                />
                <View>
                  <Text style={styles.name}>Thai Hoang</Text>
                  <Text style={styles.challengename}>2,500 Challenges</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop:20
  },
  optionButton: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 5,
    backgroundColor: 'rgba(33, 108, 83, 0.1)',
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 30,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: 'center'
  },
  selectedButton: {
    backgroundColor: '#fff',
    width: 120,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold"
  },
  selectedButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: "bold"
  },
  containList: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 15,
    backgroundColor: "#216C53",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 20,
  },
  listRating: {
    marginTop: 15,
    borderRadius: 15,
    marginHorizontal: 20,
    backgroundColor: "#fff"
  },
  itemRating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  circularContainer: {
    width: 25,
    height: 25,
    borderRadius: 20,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#363636",
    marginRight: 10,
  },
  index: {
    color: '#363636',
    fontWeight: 'bold',
    fontSize: 16,
  },
  name: {
    fontWeight: 'bold',
    color: "#000",
    fontSize: 18
  },
  challengename: {
    color: "#216C53"
  },
  InfoDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 10
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hexagonContainer: {
    marginLeft: 40,
    display: "flex",
  },
  mouthIcon: {
    width: 35,
    height: 35,
  },
  infoDetail: {},
});
