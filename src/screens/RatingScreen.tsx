import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import HeaderChallenge from '../components/HeaderChallenge';
import { NavigateType } from '../models/Navigations';
import { useRatingChallenge } from '../hooks/useRatings';

interface userRating {
  username: string,
  highest_points: number,
  avatar: { name: string, downloadLink: string }
}

export default function RatingScreen({ navigation }: NavigateType) {
  const { data: dataRating } = useRatingChallenge();
  const [selectedOption, setSelectedOption] = useState('Monthly');
  const [rankings, setRankings] = useState([]);

  useEffect(() => {
    if (dataRating) {
      const top3 = dataRating.slice(0, 3);
      setRankings(top3);
    }
  }, [dataRating]);

  const handleOptionPress = (option: string) => {
    setSelectedOption(option);
  };

  const topRanking = (index: number) => {
    switch (index) {
      case 0:
        return require('../assets/icons/icon-ranking1.png');
      case 1:
        return require('../assets/icons/icon-ranking2.png');
      case 2:
        return require('../assets/icons/icon-ranking3.png');
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.contenContainer}>
          <HeaderChallenge navigation={navigation} title='Ratings' />
          <View style={styles.optionButton}>
            <TouchableOpacity
              style={[styles.button, selectedOption === 'Monthly' ? styles.selectedButton : null]}
              onPress={() => handleOptionPress('Monthly')}>
              <Text style={styles.buttonText}>Monthly</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, selectedOption === 'AllTime' ? styles.selectedButton : null]}
              onPress={() => handleOptionPress('AllTime')}>
              <Text style={styles.buttonText}>All Time</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView style={styles.itemContainer}>
        <View style={styles.containList}>
          {dataRating?.map((user: userRating, index: number) => (
            <View style={styles.listRating} key={index}>
              <View style={styles.itemRating}>
                <View style={styles.itemInfo}>
                  <View style={styles.circularContainer}>
                    <Text style={styles.index}>{index + 1}</Text>
                  </View>
                  <View style={styles.InfoDetail_wrapper}>
                    <View style={styles.infoDetail}>
                      <Image
                        source={user?.avatar.name ? { uri: user.avatar.name } : require('../assets/profile/defaultAvatar.jpg')}
                        style={styles.avatar}
                      />
                      <View>
                        <Text style={styles.name}>{user.username}</Text>
                        <Text style={styles.challengename}>{user.highest_points} points</Text>
                      </View>
                    </View>
                    <View style={styles.hexagonContainer}>
                      <Image source={topRanking(index)} style={styles.mouthIcon} />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: { paddingHorizontal: 20 },
  contenContainer: {
    paddingVertical: 20,
  },
  optionButton: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 5,
    backgroundColor: 'rgba(33, 108, 83, 0.1)',
    borderRadius: 20,
    borderWidth: 1,
  },
  itemContainer: {
    paddingHorizontal: 20,
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
    fontWeight: "bold",
    color: '#363636',
  },
  selectedButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: "bold"
  },
  containList: {
    marginTop: 20,
    paddingBottom: 20,
    backgroundColor: "#216C53",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
  InfoDetail_wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
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
  },
  mouthIcon: {
    width: 35,
    height: 35,
  },
  infoDetail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20
  },
});
