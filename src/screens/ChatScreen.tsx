import React, { useState } from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';

export default function ChatScreen() {
  const [selectedOption, setSelectedOption] = useState('Group');

  const handleOptionPress = ({option}: any) => {
    setSelectedOption(option);
  };

  return (
    <View style={styles.container}>
      <View>
        <Image source={require('../assets/icons/icon-edit-group.png')} style={styles.editGroup} />
      </View>
      <View style={styles.optionButton}>
        <TouchableOpacity
          style={[styles.button, selectedOption === 'Chats' && styles.selectedButton]}
          onPress={() => handleOptionPress('Chats')}>
          <Text style={[styles.buttonText, selectedOption === 'Chats' && styles.selectedButtonText]}>Chats</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, selectedOption === 'Group' && styles.selectedButton]}
          onPress={() => handleOptionPress('Group')}>
          <Text style={[styles.buttonText, selectedOption === 'Group' && styles.selectedButtonText]}>Group</Text>
        </TouchableOpacity>
      </View>
      
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
  
});
