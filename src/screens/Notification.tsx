import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import NotificationType from '../models/notification';
import useGetAllNotificationOfUser from '../hooks/useGetAllNotificationOfUser';
import useReadOneNotification from '../hooks/useReadOneNotification';
import { useQueryClient } from '@tanstack/react-query';
import useReadAllNotifications from '../hooks/useReadAllNotifications';
import NotificationModal from './NotificationPopup';
import HeaderChallenge from '../components/HeaderChallenge';
import { NavigateType } from '../models/Navigations';

const NotificationScreen = ({navigation}: NavigateType) => {
  const queryClient = useQueryClient();

  const [selectedTab, setSelectedTab] = useState('All');
  const [showIndexedList, setShowIndexedList] = useState(true);
  const { data: DATANOTIFICATIONS, isPending } = useGetAllNotificationOfUser();
  const { mutate: handleReadOne } = useReadOneNotification();
  const { mutate: handReadAll } = useReadAllNotifications();
  const [unreadCount, setUnreadCount] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<NotificationType | null>(null);

  useEffect(() => {
    if (DATANOTIFICATIONS) {
      const count = DATANOTIFICATIONS.filter((item: { read: any; }) => !item.read).length;
      setUnreadCount(count);
    }
  }, [DATANOTIFICATIONS]);

  useEffect(() => {
    if (DATANOTIFICATIONS) {
      let filteredNotifications = DATANOTIFICATIONS;

      if (!showIndexedList && selectedTab !== 'All') {
        filteredNotifications = DATANOTIFICATIONS.filter((item: { read: boolean; }) =>
          selectedTab === 'Read' ? item.read : !item.read
        );
      } else if (selectedTab === 'UnRead') {
        filteredNotifications = DATANOTIFICATIONS.filter((item: { read: boolean; }) => !item.read);
      }

      setFilteredData(filteredNotifications.reverse());
    }
  }, [DATANOTIFICATIONS, showIndexedList, selectedTab]);

  const handleNotificationPress = (item: NotificationType) => {
    if (!item.read) {
      setUnreadCount((prevCount: any) => Math.max(prevCount - 1, 0));
      handleReadOne(item._id);
      openModal(item);
      queryClient.invalidateQueries({ queryKey: ['getAllNotificationOfUser'] });
    } else {
      openModal(item);
    }
  };

  const handleTabPress = (tabName: string) => {
    setSelectedTab(tabName);
    setShowIndexedList(tabName === 'UnRead');
  };

  const markAllAsRead = () => {
    setUnreadCount(0);
    handReadAll();
    queryClient.invalidateQueries({ queryKey: ['getAllNotificationOfUser'] });
  };

  const openModal = (notification: NotificationType) => {
    setSelectedNotification(notification);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
    <View style={styles.container}>
      <TouchableOpacity style={styles.header}>
        <HeaderChallenge navigation={navigation} title='' />
      </TouchableOpacity>
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
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({ item }: { item: NotificationType }) => (
            <TouchableOpacity
              style={[
                styles.status,
                {
                  backgroundColor: item.read ? '#fff' : 'rgba(204, 204, 204, 0.5)',
                },
              ]}
              onPress={() => handleNotificationPress(item)}
            >
              <View style={styles.InforDetail}>
                <FontAwesomeIcon icon={faCheck} size={28} color='#216C53' />
                <Text style={styles.textMessage}>{item.message}</Text>
                {!item.read && <View style={styles.dot} />}
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <NotificationModal
        isVisible={modalVisible}
        onClose={closeModal}
        message={selectedNotification?.message || ''}
      />
    </View>
    </>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginVertical: 20,
    zIndex:999
  },
  foregroundImage: {
    position: 'absolute',
    resizeMode: 'cover',
    left: 250
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  notiGroup: {
    flexDirection: "row",
    marginTop: 50,
    justifyContent: 'space-between',
  },
  titleNoti: {
    color: "#000",
    fontSize: 24,
    fontWeight: "700",
  },
  numCount: {
    width: 30,
    height: 30,
    backgroundColor: "#216C53",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  num: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700"
  },
  markAllButton: {
    borderWidth: 1,
    borderColor: "#216C53",
    borderRadius: 10,
    display: "flex",
    alignSelf: 'flex-end',
  },
  markAllText: {
    fontSize: 16,
    fontWeight: "700",
    padding: 5,
    color: "#808080"
  },
  tabBar: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selectedTab: {},
  selectedText: {
    color: "#216C53",
    fontSize: 16,
    fontWeight: "bold",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#808080",
    textAlign: 'center',
  },
  tabButton: {
    width: '33.3%',
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
    borderWidth: 0.5,
    color: '#000000',
  },
  status: {
    marginTop: 10,
    borderRadius: 10,
  },
  InforDetail: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 10,
    alignItems: 'center',
  },
  textMessage: {
    fontSize: 14,
    color: "#808080",
    width: '85%',
  },
  pointUnread: {
    width: 10,
    height: 10,
    backgroundColor: "#FF0A00",
    borderRadius: 20,
    marginTop: 8,
    marginLeft: 20
  },
  dot: {
    position: 'absolute',
    borderWidth: 5,
    width: 5,
    borderRadius: 20,
    borderColor: 'red',
    right: '5%',
  }
});

export default NotificationScreen;

