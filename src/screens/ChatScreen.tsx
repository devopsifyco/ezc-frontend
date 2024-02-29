import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { NavigateType } from '../models/Navigations';

export default function ChatScreen({ navigation }: NavigateType) {
  const [selectedOption, setSelectedOption] = useState('Chats');

  const handleOptionPress = ({ option }: any) => {
    setSelectedOption(option);
  };

  const [data] = useState([
    { id: 1, avatar: require('../assets/images/group-img.jpg'), memberNames: ['Mua', 'Tra'], messsage: 'You: Hello everyone, how are you today?', time:'2:14 PM' },
    { id: 2, avatar: require('../assets/images/group-avatar.png'), memberNames: ['Tien', 'Ty','Tuyen','Hoang'], messsage: 'You: Hi guy!!!', time: '4:24 PM' },
    { id: 3, avatar: require('../assets/profile/noti-avatar1.png'), memberNames: 'Thu', messsage: 'You: I will go to the market...', time: 'Friday' },
    { id: 4, avatar: require('../assets/profile/noti-avatar2.png'), memberNames: 'Tuyen', messsage: 'You: I will go to the market...', time: 'Tuesday' },
    { id: 5, avatar: require('../assets/profile/noti-avatar3.png'), memberNames: 'Tu', messsage: 'You: I will go to the market...', time: 'Monday' },
    { id: 6, avatar: require('../assets/profile/noti-avatar4.png'), memberNames: 'Ty', messsage: 'You: I will go to the market...', time: 'Monday' },
  ]);

  return (
    <View style={styles.container}>
      <View>
        <Image source={require('../assets/icons/icon-edit-group.png')} style={styles.editGroup} />
      </View>
      <View style={styles.optionButton}>
        <TouchableOpacity
          style={[styles.button, selectedOption === 'Chats' && styles.selectedButton]}
          onPress={() => {
            handleOptionPress('Chats');
            navigation.navigate('ChatScreen'); 
          }}>
          <Text style={[styles.buttonText, selectedOption === 'Chats' && styles.selectedButtonText]}>Chats</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, selectedOption === 'Group' && styles.selectedButton]}
          onPress={() => {
            handleOptionPress('Group');
            navigation.navigate('GroupScreen'); 
          }}>
          <Text style={[styles.buttonText, selectedOption === 'Group' && styles.selectedButtonText]}>Group</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listChat}>
            <View style={styles.itemChat}>
              <View style={styles.InfoDetail}>
                <Image source={item.avatar} style={styles.avatar} />
                <View>
                  <Text style={styles.memberName}>{item.memberNames}</Text>
                    <Text style={styles.message}>{item.messsage}</Text>                   
                </View>
                <Text style={styles.time}>{item.time}</Text>
              </View>
            </View>
          </View>
        )}
      />
       <View style={styles.bottomLine} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  editGroup:{
    marginTop:20,
    top: 0,
    right: 0,
    alignSelf: 'flex-end',
  },
  optionButton: {
    marginTop:30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 5,
    backgroundColor: 'rgba(33, 108, 83, 0.1)',
    borderRadius: 20,
    borderWidth:1,
    marginHorizontal: 30,
  },
  button: {
    padding: 10,
    borderRadius: 10,
    display:"flex",
    justifyContent:"center",
    alignItems:'center'
  },
  selectedButton: {
    backgroundColor: '#fff',
    width:120,
  },
  buttonText: {
    fontSize:16, 
    fontWeight:"bold"
  },
  selectedButtonText: {
    color: 'black',
    fontSize:16, 
    fontWeight:"bold"
  },
  listChat: {
    marginTop:15,
  },
  itemChat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  InfoDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap:20
  },
  titleContent: {
    flex: 1,
  },
  memberName: {
    color:"#000",
    fontSize:14,
    fontWeight:"800",
    width:250
  },
  avatar:{
      width:50,
      height:50,
      borderRadius:50
  },
  message:{
    color:"#808080",
    fontSize:13
  },
  timeGroup:{
    display:"flex",
    flexDirection:"row",
  },
  time:{
    top: 0,
    right: 0,
    alignSelf: 'flex-end',
  },
  bottomLine:{
    height:1,
    color:"pink",
    backgroundColor:"#808080"
  }
});
