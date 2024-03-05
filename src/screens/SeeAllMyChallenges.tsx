import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Approve from './Status/ApproveScreen';

const SeeAllMyChallenges = () => {
  const [selectedTab, setSelectedTab] = useState('Pending');
  const [showIndexedList, setShowIndexedList] = useState(false);

  const handleTabPress = (tabName: string) => {
    console.log('Selected Tab:', tabName);
    setSelectedTab(tabName);
    setShowIndexedList(tabName === 'Pending');
  };

  const challenges = [
    {
      id: 1,
      title: 'Challenge: Clean the city',
      date: 'Wed, Apr 10',
      time: '8:30AM - 17:30 PM',
      location: 'Phuoc My • Son Tra • Da Nang',
      status: 'Pending',
      image: require('../assets/images/Green.png'),
    },
    {
      id: 2,
      title: 'Challenge: Clean the beach',
      date: 'Wed, Apr 11',
      time: '9:00AM - 18:00 PM',
      location: 'Phuoc My • Son Tra • Da Nang',
      status: 'Pending',
      image: require('../assets/images/Green.png'),
    },
  ];

  const renderChallengeItem = (challenge) => {
    return (
      <View key={challenge.id} style={styles.item}>
        <Image style={styles.image} source={challenge.image} />
        <View style={styles.detailItems}>
          <Text style={styles.time}>
            {challenge.date} • {challenge.time}
          </Text>
          <View style={styles.times_group}>
            <View style={styles.listItemDetail}>
              <Text style={styles.detail}>{challenge.title}</Text>
              <View style={styles.times_group}>
                <Image
                  source={require('../assets/icons/locationdetail.png')}
                />
                <Text style={{ fontSize: 12, color: '#363636' }}>
                  {challenge.location}
                </Text>
              </View>
            </View>
            <View style={styles.displayCenter}>
              <Image
                source={require('../assets/icons/Shape.png')}
                style={styles.editGroup}
              />
              <Image
                source={require('../assets/icons/delete.png')}
                style={styles.deleteGroup}
              />
            </View>
          </View>
          <Text style={styles.hour}>3m ago.</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/background-noti.png')}
        style={styles.backgroundImage}
      />
      <View style={styles.contentContainer}>
        <View style={styles.notiGroup}>
          <Image source={require('../assets/icons/arrow-left.png')} />
          <Text style={styles.titleNoti}>Challenges</Text>
        </View>

        <View style={styles.tabBar}>
          {['Pending', 'Approve', 'Reject'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabButton,
                selectedTab === tab && styles.selectedTab,
              ]}
              onPress={() => handleTabPress(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  styles.selectedText,
                ]}
              >
                {tab}
              </Text>
              {selectedTab === tab && <View style={styles.tabLine} />}
            </TouchableOpacity>
          ))}
        </View><></>

        <ScrollView style={{ flex: 1 }}>
          {challenges.map((challenge) => renderChallengeItem(challenge))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  notiGroup: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 50,
    marginLeft: 20,
    gap: 10,
  },
  titleNoti: {
    color: '#000',
    fontSize: 24,
    fontWeight: '700',
  },
  tabBar: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  selectedText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: 'relative',
  },
  tabLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#104A51',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    height: 110,
    borderRadius: 15,
    margin: 10,
  },
  listItemDetail: {
    width: '80%',
  },
  detailItems: {
    backgroundColor: '#FFFFFF',
    width: 260,
    paddingLeft: 20,
  },
  image: {
    width: 60,
    height: 79,
    borderRadius: 10,
  },
  time: {
    color: '#216C53',
    fontSize: 12,
    fontWeight: 'bold',
  },
  hour: {
    color: '#6C6C6C',
    fontSize: 12,
    fontWeight: 'bold',
  },
  detail: {
    color: '#120D26',
    fontSize: 15.5,
    fontWeight: 'bold',
    width: '90%',
  },
  address: {
    fontSize: 13,
    marginLeft: 4,
    fontWeight: 'bold',
    color: '#747688',
  },
  editGroup: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    paddingVertical: 5,
  },
  deleteGroup: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    paddingVertical: 5,
  },
  times_group: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    gap: 12,
  },
  displayCenter: {
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  foregroundImage: {
    position: 'absolute',
    resizeMode: 'cover',
    left:250
  },
  numCount:{
    width:30,
    height:30,
    backgroundColor:"#216C53",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:10
  },
  num:{
    color:"#FFF",
    fontSize:18,
    fontWeight:"700"
  },
  markAllButton:{
    borderWidth:1,
    borderColor:"#216C53",
    borderRadius:10,
    marginLeft:50
  },
  markAllText:{
    fontSize:16,
    fontWeight:"700",
    padding:5
  },
  selectedTab:{
    
  },
  bottomLine: {
    marginTop:2,
    height: 1, 
    backgroundColor: '#000',
  },
  listNoti: {
    marginTop:15,
  },
  itemNoti: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  circularContainer: {
    width: 25,
    height: 25,
    borderRadius: 20,
    display:"flex",
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:1,
    backgroundColor:"#216C53",
    marginRight: 10,
  },
  index: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  name: {
    fontWeight: 'bold',
    color:"#000",
    fontSize:18
  },
  InfoDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:20
  },
  titleContent: {
    flex: 1,
  },
  title: {
    paddingBottom: 16,
  },
  notiContent: {
    color:"#000",
    fontSize:14,
    fontWeight:"600",
    width:250
  },
});

export default SeeAllMyChallenges;
