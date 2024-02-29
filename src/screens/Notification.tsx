import React, { useState } from 'react';
import NotificationPopup from './NotificationPopup';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';

const NotificationScreen = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [selectedTab, setSelectedTab] = useState('All');
  const [showIndexedList, setShowIndexedList] = useState(true);

  const [data, setData] = useState([
    { id: 1, avatar: require('../assets/profile/noti-avatar2.png'), content: 'Thu became an excellent member when participating in 50 challenges. Please continue to maintain your form!', time: '1m ago', read: false },
    { id: 2, avatar: require('../assets/profile/noti-avatar1.png'), content: 'Joe has joined your group', time: '1m ago', read: false },
    { id: 3, avatar: require('../assets/profile/noti-avatar3.png'), content: 'Jino donated to the app', time: '1m ago', read: false },
    { id: 4, avatar: require('../assets/profile/noti-avatar4.png'), content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', time: '1m ago', read: false },
    { id: 5, avatar: require('../assets/profile/noti-avatar2.png'), content: 'An went to see your challenge', time: '1m ago', read: false },
    { id: 6, avatar: require('../assets/profile/noti-avatar1.png'), content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', time: '1m ago', read: false },
    { id: 7, avatar: require('../assets/profile/noti-avatar3.png'), content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', time: '1m ago', read: false },
  ]);

  const [unreadCount, setUnreadCount] = useState(data.filter(item => !item.read).length);
  const dataOrDefault = data || [];
  const filteredData = showIndexedList
    ? dataOrDefault.filter(item => item.read === false)
    : selectedTab === 'Read'
    ? dataOrDefault.filter(item => item.read === true)
    : dataOrDefault;
  const totalIndex = data.length;

  const handleNotificationPress = (item) => {
    setSelectedNotification(item);
    setIsPopupVisible(true);

    if (!item.read) {
      setUnreadCount((prevCount) => prevCount - 1);
      const updatedData = data.map((notification) =>
        notification.id === item.id ? { ...notification, read: true } : notification
      );
      setData(updatedData);
    }
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
    setSelectedNotification(null);
  };

  const handleTabPress = (tabName) => {
    setSelectedTab(tabName);

    if (tabName === 'UnRead') {
      setShowIndexedList(true);
    } else if (tabName === 'Read') {
      setShowIndexedList(false);
    }
  };

  const markAllAsRead = () => {
    const updatedData = data.map((item) => ({ ...item, read: true }));
    setData(updatedData);
    setUnreadCount(0);
  };

  const truncateText = (text, limit) => {
    const words = text.split(' ');
    const truncated = words.slice(0, limit).join(' ');
    if (words.length > limit) {
      return `${truncated} ...`;
    }
    return truncated;
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/background-noti.png')} style={styles.backgroundImage} />
      <Image source={require('../assets/images/ellipse-noti.png')} style={styles.foregroundImage} />
      <View style={styles.contentContainer}>
        <View style={styles.notiGroup}>
          <Text style={styles.titleNoti}>Notifications</Text>
          <View style={styles.numCount}>
            <Text style={styles.num}>{unreadCount}</Text>
          </View>
          <TouchableOpacity style={styles.markAllButton} onPress={markAllAsRead}>
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
            <TouchableOpacity
              style={[
                styles.status,
                {
                  backgroundColor: item.read ? '#fff' : 'rgba(204, 204, 204, 0.5)',
                },
              ]}
              onPress={() => handleNotificationPress(item)}
            >
              <ScrollView style={styles.listNoti}>
                <View style={styles.itemNoti}>
                  <View style={styles.InfoDetail}>
                    <Image source={item.avatar} style={styles.avatar} />
                    <View>
                      <View style={styles.unreadGroup}>
                        <Text style={styles.notiContent}>
                          {truncateText(item.content, 10)}
                        </Text>
                        {!item.read && <View style={styles.pointUnread}></View>}
                      </View>
                      <Text style={styles.time}>{item.time}</Text>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </TouchableOpacity>
          )}
        />
        <NotificationPopup
          isVisible={isPopupVisible}
          onClose={handleClosePopup}
          content={selectedNotification?.content}
          time={selectedNotification?.time}
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
    display:"flex",
    alignSelf: 'flex-end',
  },
  markAllText:{
    fontSize:16,
    fontWeight:"700",
    padding:5,
    color:"#808080"
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
    fontWeight:"bold",
    color:"#808080"
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
  status:{
    marginTop:10,
    borderRadius:10,
    marginHorizontal:10
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
  name: {
    fontWeight: 'bold',
    color:"#000",
    fontSize:18
  },
  InfoDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap:10
  },
  titleContent: {
    flex: 1,
  },
  title: {
    paddingBottom: 16,
  },
  unreadGroup:{
    display:"flex",
    flexDirection:"row",
  },
  notiContent: {
    color:"#000",
    fontSize:14,
    fontWeight:"600",
    display:"flex",
    flexWrap: 'wrap',
    maxWidth:'85%',
  },
  time: {
    fontSize:14,
    color:"#808080"
  },
  pointUnread:{
    width:10,
    height:10,
    backgroundColor:"#FF0A00",
    borderRadius:20,
    marginTop:8,
    marginLeft:20
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
