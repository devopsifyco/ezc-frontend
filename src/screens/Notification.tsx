import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const NotificationScreen = () => {
  const [selectedTab, setSelectedTab] = useState('All');
  const [showIndexedList, setShowIndexedList] = useState(true);

  const [data, setData] = useState([
    { id: 1, avatar: require('../assets/profile/noti-avatar2.png'), content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', time: '1m ago', index: 2 },
    { id: 2, avatar: require('../assets/profile/noti-avatar1.png'), content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', time: '1m ago', index: 5 },
    { id: 3, avatar: require('../assets/profile/noti-avatar3.png'), content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', time: '1m ago', index: 1 },
    { id: 4, avatar: require('../assets/profile/noti-avatar4.png'), content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', time: '1m ago', index: null },
    { id: 5, avatar: require('../assets/profile/noti-avatar2.png'), content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', time: '1m ago', index: 3 },
    { id: 6, avatar: require('../assets/profile/noti-avatar1.png'), content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', time: '1m ago', index: null },
    { id: 7, avatar: require('../assets/profile/noti-avatar3.png'), content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', time: '1m ago', index: null },
  ]);

  const dataOrDefault = data || [];
  const filteredData = showIndexedList
    ? dataOrDefault.filter(item => item.index !== null)
    : (selectedTab === 'Read' ? dataOrDefault.filter(item => item.index === null) : dataOrDefault);
  const totalIndex = data.reduce((sum, item) => (item.index !== null ? sum + item.index : sum), 0);

  const handleTabPress = (tabName:any) => {
    setSelectedTab(tabName);

    if (tabName === 'UnRead') {
      setShowIndexedList(true);
    } else if (tabName === 'Read') {
      setShowIndexedList(false);
    }
  };
  const markAllAsRead = () => {
    const updatedData = data.map(item => ({ ...item, index: null }));
    setData(updatedData);
  };
  
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/background-noti.png')}
        style={styles.backgroundImage}
      />
      <Image
        source={require('../assets/images/ellipse-noti.png')}
        style={styles.foregroundImage}
      />
      <View style={styles.contentContainer}>
        <View style={styles.notiGroup}>
          <Text style={styles.titleNoti}>Notifications</Text>
          <View style={styles.numCount}>
            <Text style={styles.num}>{totalIndex}</Text>
          </View>
          <TouchableOpacity
            style={styles.markAllButton}
            onPress={markAllAsRead}
          >
            <Text style={styles.markAllText}>Mark all as read</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tabButton, selectedTab === 'All' && styles.selectedTab]}
            onPress={() => handleTabPress('All')}
          >
            <Text style={[styles.tabText, selectedTab === 'All' && styles.selectedText]}>All</Text>
            {selectedTab === 'All' && <View style={styles.tabLine} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, selectedTab === 'UnRead' && styles.selectedTab]}
            onPress={() => handleTabPress('UnRead')}
          >
            <Text style={[styles.tabText, selectedTab === 'UnRead' && styles.selectedText]}>Unread</Text>
            {selectedTab === 'UnRead' && <View style={styles.tabLine} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, selectedTab === 'Read' && styles.selectedTab]}
            onPress={() => handleTabPress('Read')}
          >
            <Text style={[styles.tabText, selectedTab === 'Read' && styles.selectedText]}>Read</Text>
            {selectedTab === 'Read' && <View style={styles.tabLine} />}
          </TouchableOpacity>
        </View>

        <View style={styles.bottomLine} />
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.listNoti}>
              <View style={styles.itemNoti}>
                <View style={styles.InfoDetail}>
                  <Image
                    source={item.avatar}
                    style={styles.avatar}
                  />
                  <View>
                    <Text style={styles.notiContent}>{item.content}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                  </View>
                </View>
                {item.index !== null && (
                  <View style={styles.circularContainer}>
                    <Text style={styles.index}>{item.index}</Text>
                  </View>
                )}
              </View>
            </View>
          )}
        />
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
  foregroundImage: {
    position: 'absolute',
    resizeMode: 'cover',
    left:250
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  notiGroup:{
    display:"flex",
    flexDirection:"row",
    marginTop:50,
    marginLeft:20,
    gap:10
  },
  titleNoti:{
    color:"#000",
    fontSize:24,
    fontWeight:"700",
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
  tabBar:{
    marginTop:30,
    display:"flex",
    flexDirection:"row",
    justifyContent: 'space-around',
  },
  selectedTab:{
    
  },
  selectedText:{
    color:"#000",
    fontSize:16,
    fontWeight:"bold"
  },
  tabText: {
    fontSize:16,
    fontWeight:"bold"
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
  time: {
    fontSize:14,
  },
  message: {

  },
  accounts: {
  },
  notificationItem: {

  },
  unread: {

  },
  avatar: {

  },
  avatarImage: {
 
  },
});

export default NotificationScreen;
